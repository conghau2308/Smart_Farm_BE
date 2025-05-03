const DeviceControl = require('../model/device_control_model');
const Device = require('../model/devices_model');

// Tạo lệnh điều khiển mới
exports.createControl = async (req, res) => {
  try {
    const control = await DeviceControl.create(req.body);
    res.status(201).json(control);
  } catch (err) {
    res.status(500).json({ error: 'Không thể tạo điều khiển', details: err.message });
  }
};

// Lấy lịch sử điều khiển theo device_id
exports.getControlHistory = async (req, res) => {
  try {
    const { device_id } = req.query;
    const controls = await DeviceControl.findAll({
      where: device_id ? { device_id } : {}
    });
    res.json(controls);
  } catch (err) {
    res.status(500).json({ error: 'Không thể lấy lịch sử điều khiển', details: err.message });
  }
};

// Cập nhật trạng thái thiết bị
/* ở test case chỉ cập nhật status: on , off ở device_models ko cập nhật ở device_contronl_models...
exports.updateDeviceState = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Device.findByPk(id);
    if (!device) return res.status(404).json({ error: 'Thiết bị không tồn tại' });

    await device.update({ status: req.body.status });
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: 'Không thể cập nhật trạng thái thiết bị', details: err.message });
  }
};
 */
exports.updateDeviceState = async (req, res) => {
    try {
      const { id } = req.params;
      const { status, mode = 'manual', updated_by = null } = req.body;
      const device = await Device.findByPk(id);
      if (!device) return res.status(404).json({ error: 'Thiết bị không tồn tại' });
      await device.update({ status });
      const control = await DeviceControl.create({
        device_id: id,
        mode,
        state: status,
        updated_by
      });
  
      res.json({
        message: 'Đã cập nhật trạng thái thiết bị và ghi nhận điều khiển',
        device,
        control
      });
    } catch (err) {
      res.status(500).json({ error: 'Không thể cập nhật trạng thái thiết bị', details: err.message });
    }
  };