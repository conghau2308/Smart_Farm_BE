const DeviceThreshold = require('../model/device_threshold_model');

// Tạo mới ngưỡng
exports.createThreshold = async (req, res) => {
  try {
    const threshold = await DeviceThreshold.create(req.body);
    res.status(201).json(threshold);
  } catch (err) {
    res.status(500).json({ error: 'Không thể tạo threshold', details: err.message });
  }
};

// Lấy tất cả ngưỡng
exports.getThresholds = async (req, res) => {
  try {
    const thresholds = await DeviceThreshold.findAll();
    res.json(thresholds);
  } catch (err) {
    res.status(500).json({ error: 'Không thể lấy ngưỡng', details: err.message });
  }
};

// Lấy theo thiết bị và thông số
exports.getThresholdByDeviceAndParam = async (req, res) => {
  try {
    const { device_id, parameter } = req.query;
    const where = {};
    if (device_id) where.device_id = device_id;
    if (parameter) where.parameter = parameter;

    const thresholds = await DeviceThreshold.findAll({ where });
    res.json(thresholds);
  } catch (err) {
    res.status(500).json({ error: 'Không thể tìm ngưỡng', details: err.message });
  }
};

// Cập nhật ngưỡng
exports.updateThreshold = async (req, res) => {
  try {
    const threshold = await DeviceThreshold.findByPk(req.params.id);
    if (!threshold) return res.status(404).json({ error: 'Ngưỡng không tồn tại' });

    await threshold.update(req.body);
    res.json(threshold);
  } catch (err) {
    res.status(500).json({ error: 'Không thể cập nhật ngưỡng', details: err.message });
  }
};

// Xoá ngưỡng
exports.deleteThreshold = async (req, res) => {
  try {
    const threshold = await DeviceThreshold.findByPk(req.params.id);
    if (!threshold) return res.status(404).json({ error: 'Ngưỡng không tồn tại' });

    await threshold.destroy();
    res.json({ message: 'Đã xoá ngưỡng thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Không thể xoá ngưỡng', details: err.message });
  }
};
