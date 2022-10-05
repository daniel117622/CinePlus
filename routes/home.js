const path = require('path');
const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();

router.get('/',homeController.loadMainPage);
router.get('/catalogo',homeController.catalogo);

module.exports = router;
