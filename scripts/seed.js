// scripts/seed.js
require("dotenv").config();
const sequelize = require("../config/db");
const {
  faker
} = require("@faker-js/faker");

// Import model
const User = require("../model/user_model");
const Zone = require("../model/zones_model");
const Device = require("../model/devices_model");
const DeviceThreshold = require("../model/device_threshold_model");
const SensorReading = require("../model/sensor_reading_model");
const DeviceControl = require("../model/device_control_model");
const Alert = require("../model/alert_model");

const Seeder = async function seed() {
  try {
    // // Xoá và tạo lại bảng
    await sequelize.sync({
      force: true
    });

    // 1. Users
    const users = Array.from({
      length: 20
    }).map(() => ({
      username: faker.internet.username().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password(),
      phone: faker.helpers.fromRegExp("09[0-9]{8}"),
      created_at: faker.date.past(),
    }));
    await User.bulkCreate(users);

    // 2. Zones
    const zones = Array.from({
      length: 5
    }).map((_, i) => ({
      name: `Zone ${i + 1}`,
      description: faker.lorem.sentence(),
      created_at: faker.date.recent(30),
    }));
    await Zone.bulkCreate(zones);

    // 3. Devices
    const devices = [{
        zone_id: 1, // Zone ID = 1
        device_id: 1, // device_id = 1
        name: "Temperature Sensor",
        device_type: "sensor", // Loại thiết bị là sensor
        status: "on",
        data_type: "temperature", // data_type = "temperature"
        created_at: faker.date.recent(10),
      },
      {
        zone_id: 1,
        device_id: 2,
        name: "Light Sensor",
        device_type: "sensor",
        status: "on",
        data_type: "luminosity",
        created_at: faker.date.recent(10),
      },
      {
        zone_id: 1,
        device_id: 3,
        name: "Soil Moisture Sensor",
        device_type: "sensor",
        status: "on",
        data_type: "soil_moisture",
        created_at: faker.date.recent(10),
      },
      {
        zone_id: 1,
        device_id: 4, // device_id = 4
        name: "Pump",
        device_type: "device", // Loại thiết bị là device
        status: "on",
        data_type: "pump_status",
        created_at: faker.date.recent(10),
      },
      {
        zone_id: 1,
        device_id: 5, // device_id = 5
        name: "Led Light",
        device_type: "device",
        status: "on",
        data_type: "led_status",
        created_at: faker.date.recent(10),
      },
      {
        zone_id: 1,
        device_id: 6,
        name: "Humidity Sensor",
        device_type: "sensor",
        status: "on",
        data_type: "humidity",
        created_at: faker.date.recent(10),
      }
    ];

    await Device.bulkCreate(devices);


    // 4. Thresholds
    const allDevices = await Device.findAll({
      attributes: ["device_id"]
    });

    // Giới hạn chỉ lấy device_id = 4 và 5
    const selectedDeviceIds = [4, 5];
    const params = ["temperature", "humidity", "pH", "luminosity"];
    const thresholds = selectedDeviceIds.map((device_id) => {
      // Tạo giá trị min và max với 2 chữ số sau dấu thập phân
      const min = parseFloat(faker.number.float({
        min: 0,
        max: 50,
        precision: 0.1
      }).toFixed(2)); // Làm tròn đến 2 chữ số sau dấu thập phân

      const max = parseFloat((min + faker.number.float({
        min: 1,
        max: 50,
        precision: 0.1
      })).toFixed(2)); // Làm tròn đến 2 chữ số sau dấu thập phân

      return {
        device_id: device_id,
        parameter: faker.helpers.arrayElement(params),
        min_value: min,
        max_value: max,
        created_by: faker.number.int({
          min: 1,
          max: users.length
        }),
        created_at: faker.date.recent(5),
      };
    });

    await DeviceThreshold.bulkCreate(thresholds);



    // 5. Sensor Readings
    const readings = Array.from({
      length: 200
    }).map(() => ({
      device_id: faker.helpers.arrayElement(allDevices).device_id,
      data_type: faker.helpers.arrayElement(params),
      value: faker.number.float({
        min: 0,
        max: 100,
        precision: 0.01
      }),
      recorded_at: faker.date.recent(1),
    }));
    await SensorReading.bulkCreate(readings);

    // 6. Device Controls
    // const selectedDeviceIds = [4, 5]; // Chỉ lấy device_id là 4 và 5
    const controls = selectedDeviceIds.map((device_id) => ({
      device_id: device_id,
      mode: faker.helpers.arrayElement(["manual"]), // thêm manual
      status: faker.datatype.boolean() ? "on" : "off",
      updated_by: faker.number.int({
        min: 1,
        max: users.length
      }),
      updated_at: faker.date.recent(1),
    }));

    await DeviceControl.bulkCreate(controls);


    // 7. Alerts
    const alerts = readings.slice(0, 50).map((r) => ({
      device_id: r.device_id,
      alert_type: r.value > 75 ? "OVER_THRESHOLD" : "UNDER_THRESHOLD",
      value: r.value,
      alert_time: r.recorded_at,
      is_resolved: faker.datatype.boolean(),
    }));
    await Alert.bulkCreate(alerts);

    console.log("Seeding random data thành công!");
  } catch (err) {
    console.error("Lỗi khi seeding:", err);
  } finally {
    // await sequelize.close();
  }
}

module.exports = Seeder;