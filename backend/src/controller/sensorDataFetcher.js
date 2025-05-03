const axios = require('axios');
const { Op } = require('sequelize');
const SensorReading = require('../model/sensor_reading_model');  // Bảng chính
const TempSensorReading = require("../model/temp_sensor_reading_model");  // Bảng tạm
const DeviceControl = require('../model/device_control_model');  // Bảng điều khiển thiết bị
const DeviceThreshold = require('../model/device_threshold_model');  // Bảng ngưỡng
const { toggleLight } = require('./led_controller');
const { AIO_KEY } = process.env;

const endpoints = {
  temp: {
    url: "https://io.adafruit.com/api/v2/hoangvyne/feeds/rt/data",
    device_id: 1,
    data_type: "temperature"
  },
  light: {
    url: "https://io.adafruit.com/api/v2/hoangvyne/feeds/lux/data",
    device_id: 2,
    data_type: "luminosity"
  },
  soil: {
    url: "https://io.adafruit.com/api/v2/hoangvyne/feeds/sm/data",
    device_id: 3,
    data_type: "soil_moisture"
  },
  pump: {
    url: "https://io.adafruit.com/api/v2/hoangvyne/feeds/may-bom/data",
    device_id: 4,
    data_type: "pump_status"
  },
  led: {
    url: "https://io.adafruit.com/api/v2/hoangvyne/feeds/led/data",
    device_id: 5,
    data_type: "led_status"
  },
  humi: {
    url: "https://io.adafruit.com/api/v2/hoangvyne/feeds/rh/data",
    device_id: 6,
    data_type: "humidity"
  },
};

// Biến tạm lưu giá trị trước đó cho mỗi cảm biến
let previousSensorData = {
  temp: null,
  light: null,
  soil: null,
  pump: null,
  led: 0,
  humi: null
};

// Hàm lấy dữ liệu từ Adafruit và lưu vào DB
const fetchSensorData = async () => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-AIO-Key': AIO_KEY,  // Dùng AIO Key của bạn
    };

    // Gửi các yêu cầu fetch song song với header đã định nghĩa
    const responses = await Promise.all(
      Object.values(endpoints).map((sensor) =>
        axios.get(sensor.url, { headers }).then((res) => res.data)
      )
    );

    // Định dạng dữ liệu trả về từ API và lưu vào database
    await Promise.all(responses.map(async (data, index) => {
      const sensor = Object.values(endpoints)[index];
      const value = data[0]?.value || "N/A";

      // Truy vấn bảng device_controls để kiểm tra mode của LED
      if (sensor.device_id === 2) {  // Chỉ kiểm tra LED
        const deviceControl = await DeviceControl.findOne({
          where: { device_id: 5 }
        });

        if (deviceControl && deviceControl.mode === 'auto') {
          // Truy vấn ngưỡng từ bảng device_threshold để lấy max_value
          const threshold = await DeviceThreshold.findOne({
            where: { device_id: 5 }  // Lấy ngưỡng của LED
          });

          if (threshold) {
            const maxThreshold = threshold.dataValues.max_value;  // Lấy giá trị max_value
            console.log("Gia tri nguong: ", maxThreshold);

            // Kiểm tra giá trị cảm biến so với max_value và điều khiển LED
            if (sensor.data_type === "luminosity") {
              // Khi cảm biến ánh sáng nhỏ hơn threshold
              console.log("Gia tri cua lux:", value);
              if (value < maxThreshold) {
                // Nếu đèn LED đang tắt (giá trị trước là 0), bật đèn
                if (previousSensorData.led === 0) {
                  await toggleLight(true);  // Bật đèn
                  console.log("Dền LED đã được bật")
                  previousSensorData.led = 1;
                }
              }
              // Khi cảm biến ánh sáng lớn hơn hoặc bằng threshold
              else if (value >= maxThreshold) {
                // Nếu đèn LED đang bật (giá trị trước là 1), tắt đèn
                if (previousSensorData.led === 1) {
                  await toggleLight(false);  // Tắt đèn
                  console.log("Đèn LED đã được tắt");
                  previousSensorData.led = 0;
                }
              }
            }
          }
        }
      }

      // Cập nhật vào bảng chính
      await SensorReading.create({
        device_id: sensor.device_id,
        data_type: sensor.data_type,
        value,
      });

      // So sánh giá trị cũ với giá trị mới
      if (previousSensorData[sensor.data_type] !== value) {
        console.log(`Giá trị đã thay đổi cho ${sensor.data_type}: ${value}`);

        // Cập nhật bảng chính sensor_readings (luôn luôn lưu vào bảng chính)
        await SensorReading.create({
          device_id: sensor.device_id,
          data_type: sensor.data_type,
          value,
        });

        // Cập nhật bảng tạm nếu có thay đổi
        const existingTempData = await TempSensorReading.findOne({
          where: { device_id: sensor.device_id }
        });

        if (!existingTempData) {
          // Nếu không có dữ liệu trước đó trong bảng tạm, tạo mới
          await TempSensorReading.create({
            device_id: sensor.device_id,
            data_type: sensor.data_type,
            value,
          });
        } else {
          // Nếu có dữ liệu trước đó, cập nhật bảng tạm
          await existingTempData.update({
            value,
          });
        }

        // Cập nhật biến tạm với giá trị mới
        previousSensorData[sensor.data_type] = value;
      } else {
        console.log(`Giá trị không thay đổi cho ${sensor.data_type}`);
      }
    }));

  } catch (error) {
    console.error('Error fetching sensor data:', error);
  }
};

// Lặp lại mỗi 5 giây để lấy dữ liệu mới
setInterval(fetchSensorData, 5000);  // Lặp lại mỗi 5 giây
