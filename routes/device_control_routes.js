const express = require('express');
const router = express.Router();
const controlController = require('../controller/device_control_controller');

router.post('/create', controlController.createControl);
router.get('/', controlController.getControlHistory);
router.put('/device/:id/state', controlController.updateDeviceState);
router.get('/filter', controlController.getControlsByDeviceId);
router.put('/update/:device_id', controlController.updateDeviceControl);

module.exports = router;
