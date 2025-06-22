const express = require('express');
const router = express.Router();
const heartbeatController = require('../controllers/heartbeatController');

router.get('/', heartbeatController.getHeartbeat);

module.exports = router;