const SensorReading = require('../model/sensor_reading_model');
const TempSensorReading = require("../model/temp_sensor_reading_model");
const { Op } = require('sequelize');
 // vấn đề logic???
// Tạo sensor reading
exports.createReading = async (req, res) => {
  try {
    const { device_id, data_type, value } = req.body;
    const reading = await SensorReading.create({ device_id, data_type, value });
    res.status(201).json(reading);
  } catch (err) {
    res.status(500).json({ error: 'Không thể tạo reading', details: err.message });
  }
};

// Lấy reading theo device, type, thời gian
// exports.getReadings = async (req, res) => {
//   try {
//     const { device_id, data_type, value_min, value_max , from, to } = req.query;
//     const where = {};
//     if (device_id) where.device_id = device_id;
//     if (data_type) where.data_type = data_type;
//     if (value_min || value_max) {
//         where.value = {};
//         if (value_min) where.value[Op.gte] = parseFloat(value_min);
//         if (value_max) where.value[Op.lte] = parseFloat(value_max);
//       }
//     if (from || to) {
//       where.createdAt = {};
//       if (from) where.createdAt['$gte'] = new Date(from);
//       if (to) where.createdAt['$lte'] = new Date(to);
//     }

//     const readings = await SensorReading.findAll({ where });
//     res.json(readings);
//   } catch (err) {
//     res.status(500).json({ error: 'Không thể lấy dữ liệu', details: err.message });
//   }
// };


// Lấy reading theo nhóm device_id, data_type, thời gian từ bảng tạm
exports.getReadings = async (req, res) => {
  try {
    let { device_ids, data_type, value_min, value_max, from, to } = req.query;

    // Kiểm tra và tách device_ids thành mảng nếu cần thiết
    let parsedDeviceIds = [];
    if (device_ids) {
      parsedDeviceIds = device_ids.split(',').map(id => id.trim());  // Tách chuỗi và chuyển thành mảng
    }

    const where = {};

    if (parsedDeviceIds.length > 0) {
      where.device_id = { [Op.in]: parsedDeviceIds }; // Truy vấn cho nhóm device_id
    }

    console.log("parsedDeviceIds:", parsedDeviceIds);  // Kiểm tra mảng device_ids

    if (data_type) where.data_type = data_type;
    if (value_min || value_max) {
      where.value = {};
      if (value_min) where.value[Op.gte] = parseFloat(value_min);
      if (value_max) where.value[Op.lte] = parseFloat(value_max);
    }
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt[Op.gte] = new Date(from);
      if (to) where.createdAt[Op.lte] = new Date(to);
    }

    const readings = await TempSensorReading.findAll({ where });
    res.json(readings);
  } catch (err) {
    // Log lỗi chi tiết
    console.error("Error fetching data:", err);
    res.status(500).json({ error: 'Không thể lấy dữ liệu từ bảng tạm', details: err.message });
  }
};
