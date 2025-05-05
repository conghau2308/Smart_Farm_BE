const express = require('express');
const router = express.Router();
const thresholdController = require('../controller/device_threshold_controller');

router.post('/create', thresholdController.createThreshold);
router.get('/', thresholdController.getThresholds);
router.get('/filter', thresholdController.getThresholdByDeviceAndParam);
router.put('/:id', thresholdController.updateThreshold);
router.delete('/:id', thresholdController.deleteThreshold);
router.put('/update/:device_id', thresholdController.updateThresholdByDeviceId);

module.exports = router;
