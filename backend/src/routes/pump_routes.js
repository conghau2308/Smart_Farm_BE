const express = require('express');
const router = express.Router();
const pumpController = require("../controller/pump_cotroller");  // Import pump controller

// Định nghĩa các route cho máy bơm
router.post('/control', pumpController.togglePump);  // Route để bật/tắt máy bơm
router.get('/status', pumpController.getPumpStatus);  // Route để lấy trạng thái máy bơm

module.exports = router;
