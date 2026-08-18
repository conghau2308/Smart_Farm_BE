const express = require('express');
const router = express.Router();
const zoneController = require('../controller/zone_controller');

router.post('/create', zoneController.createZone);
router.get('/', zoneController.getAllZones);
router.get('/:name', zoneController.getZoneByName);
router.put('/:name', zoneController.updateZoneByName);
router.delete('/:name', zoneController.deleteZoneByName);
router.get('/:name/devices', zoneController.getDevicesByZoneName);

module.exports = router;
