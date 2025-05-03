const Zone = require('../model/zones_model');
const Device = require('../model/devices_model');

// Tạo zone mới
exports.createZone = async (req, res) => {
  try {
    const { name, description } = req.body;
    const zone = await Zone.create({ name, description });
    res.status(201).json(zone);
  } catch (err) {
    res.status(500).json({ error: 'Không thể tạo zone', details: err.message });
  }
};

// Lấy danh sách tất cả zone
exports.getAllZones = async (req, res) => {
  try {
    const zones = await Zone.findAll();
    res.json(zones);
  } catch (err) {
    res.status(500).json({ error: 'Không thể lấy danh sách zone', details: err.message });
  }
};

//Lấy zone theo tên
exports.getZoneByName = async (req, res) => {
  try {
    const zone = await Zone.findOne({ where: { name: req.params.name } });
    if (!zone) return res.status(404).json({ error: 'Zone không tồn tại' });
    res.json(zone);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi truy xuất zone', details: err.message });
  }
};

// Cập nhật zone theo tên
exports.updateZoneByName = async (req, res) => {
  try {
    const zone = await Zone.findOne({ where: { name: req.params.name } });
    if (!zone) return res.status(404).json({ error: 'Zone không tồn tại' });

    const { name, description } = req.body;
    await zone.update({ name, description });
    res.json(zone);
  } catch (err) {
    res.status(500).json({ error: 'Không thể cập nhật zone', details: err.message });
  }
};

// Xoá zone theo tên
exports.deleteZoneByName = async (req, res) => {
  try {
    const zone = await Zone.findOne({ where: { name: req.params.name } });
    if (!zone) return res.status(404).json({ error: 'Zone không tồn tại' });

    await zone.destroy();
    res.json({ message: 'Đã xoá zone thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Không thể xoá zone', details: err.message });
  }
};

// Lấy danh sách thiết bị theo zone name
exports.getDevicesByZoneName = async (req, res) => {
  try {
    const zone = await Zone.findOne({ where: { name: req.params.name } });
    if (!zone) return res.status(404).json({ error: 'Zone không tồn tại' });

    const devices = await Device.findAll({ where: { zone_id: zone.zone_id } });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: 'Không thể lấy danh sách thiết bị', details: err.message });
  }
};
