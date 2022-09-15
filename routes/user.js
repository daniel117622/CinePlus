const path = require('path');
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/',userController.loadMainPage);
router.get('/catalogo',userController.catalogo);
router.get('/login',userController.login);
router.post('/login',userController.validateLogin);
router.get('/register',userController.register)
router.post('/register',userController.validateRegister)
module.exports = router;
