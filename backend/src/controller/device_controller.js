const Device = require('../model/devices_model');

// Tạo thiết bị mới
exports.createDevice = async (req, res) => {
  try {
    const { zone_id, name, data_type, device_type, status } = req.body;
    const device = await Device.create({ zone_id, name, data_type, device_type, status });
    res.status(201).json(device);
  } catch (err) {
    res.status(500).json({ error: 'Không thể tạo thiết bị', details: err.message });
  }
};

// Lấy tất cả thiết bị (hỗ trợ lọc theo zone, type, status)
exports.getDevices = async (req, res) => {
  try {
    const { zone_id, device_type, status } = req.query;
    const where = {};
    if (zone_id) where.zone_id = zone_id;
   else if (device_type) where.device_type = device_type;
   else if (status) where.status = status;

    const devices = await Device.findAll({ where });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi lấy thiết bị', details: err.message });
  }
};

// Lấy thiết bị theo tên
exports.getDeviceByName = async (req, res) => {
  try {
    const device = await Device.findOne({ where: { name: req.params.name } });
    if (!device) return res.status(404).json({ error: 'Thiết bị không tồn tại' });
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi lấy thiết bị', details: err.message });
  }
};

// Cập nhật thiết bị theo tên
exports.updateDeviceByName = async (req, res) => {
  try {
    const device = await Device.findOne({ where: { name: req.params.name } });
    if (!device) return res.status(404).json({ error: 'Thiết bị không tồn tại' });

    await device.update(req.body);
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: 'Không thể cập nhật thiết bị', details: err.message });
  }
};

// Cập nhật thiết bị theo device_id
exports.updateDeviceByDeviceId = async (req, res) => {
  try {
    console.log("device nhan duoc laf: ", req.params.device_id);
    const device = await Device.findByPk(req.params.device_id);
    if (!device) return res.status(404).json({ error: 'Thiết bị không tồn tại' });

    await device.update(req.body);
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: 'Không thể cập nhật thiết bị', details: err.message });
  }
};


// Xoá thiết bị theo tên
exports.deleteDeviceByName = async (req, res) => {
  try {
    const device = await Device.findOne({ where: { name: req.params.name } });
    if (!device) return res.status(404).json({ error: 'Thiết bị không tồn tại' });

    await device.destroy();
    res.json({ message: 'Đã xoá thiết bị thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Không thể xoá thiết bị', details: err.message });
  }
};
