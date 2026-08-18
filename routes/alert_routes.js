const express = require('express');
const router = express.Router();
const alertController = require('../controller/alert_contronller');

router.post('/create', alertController.createAlert);
router.get('/', alertController.getAlerts); // muốn lấy giá trị nào lấy ví dụ: is_resolver = flase
router.put('/:id/resolve', alertController.resolveAlert);

module.exports = router;
