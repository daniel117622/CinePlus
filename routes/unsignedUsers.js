const path = require('path');
const express = require('express');
const unsignedUsers = require('../controllers/unsignedUsers');
const router = express.Router();

router.get('/',unsignedUsers.loadMainPage);
router.get('/catalogo',unsignedUsers.catalogo);

module.exports = router;
