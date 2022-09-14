const path = require('path');
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/',userController.loadMainPage);
router.get('/catalogo',userController.catalogo)

module.exports = router;
