const express = require('express');
const router = express.Router();
const deviceController = require('../controller/device_controller');

router.post('/create', deviceController.createDevice);
router.get('/', deviceController.getDevices);
router.get('/:name', deviceController.getDeviceByName);
router.put('/:name', deviceController.updateDeviceByName);
router.delete('/:name', deviceController.deleteDeviceByName);
router.put('/update/:device_id', deviceController.updateDeviceByDeviceId);

module.exports = router;
