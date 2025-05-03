const express = require('express');
const router = express.Router();
const ledController = require("../controller/led_controller")

// Định nghĩa các route cho LED
router.post('/control', ledController.toggleLight);
router.get('/status', ledController.getLightStatus);

module.exports = router;
