const Alert = require('../model/alert_model');

// Tạo alert từ reading
exports.createAlert = async (req, res) => {
  try {
    const { device_id, alert_type, value } = req.body;
    const alert = await Alert.create({ device_id, alert_type, value });
    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ error: 'Không thể tạo alert', details: err.message });
  }
};

// Đánh dấu alert đã xử lý
exports.resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert không tồn tại' });

    await alert.update({ is_resolved: true });
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: 'Không thể cập nhật alert', details: err.message });
  }
};

// Lọc alert theo trạng thái hoặc loại
exports.getAlerts = async (req, res) => {
  try {
    const { is_resolved, alert_type } = req.query;
    const where = {};
    if (is_resolved !== undefined) where.is_resolved = is_resolved === 'true';
    if (alert_type) where.alert_type = alert_type;

    const alerts = await Alert.findAll({ where });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi lấy danh sách alert', details: err.message });
  }
};
