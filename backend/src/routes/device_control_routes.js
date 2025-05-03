const express = require('express');
const router = express.Router();
const controlController = require('../controller/device_control_controller');

router.post('/creat', controlController.createControl);
router.get('/', controlController.getControlHistory);
router.put('/device/:id/state', controlController.updateDeviceState);

module.exports = router;
