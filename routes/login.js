const path = require('path');
const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();



router.get('/login',loginController.login);
router.post('/login',loginController.validateLogin);
router.get('/register',loginController.register);
router.post('/register',loginController.validateRegister);
router.get('/logout',loginController.logout);

module.exports = router;
