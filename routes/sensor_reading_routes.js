const express = require('express');
const router = express.Router();
const readingController = require('../controller/sensor_reading_contronller');

router.post('/create', readingController.createReading);
router.get('/', readingController.getReadings);

module.exports = router;
