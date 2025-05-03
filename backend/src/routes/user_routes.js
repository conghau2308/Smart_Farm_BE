const express = require('express');
const router = express.Router();
const User = require('../controller/user_controller');

router.post('/register', User.register);
router.post('/login', User.login);
router.post('/logout', User.logout);

module.exports = router;
