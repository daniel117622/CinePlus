const path = require('path');
const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/',adminController.adminDashboard);
router.get('/boletos',adminController.adminBoletos);

router.get('/usuarios',adminController.adminUsuarios);
router.post('/usuarios',adminController.saveUsuario);
router.delete('/usuarios/delete/:id',adminController.deleteUsuario);

router.get('/funciones',adminController.adminFunciones);
router.post('/funciones',adminController.adminPushFunction);

router.get('/cines',adminController.adminCines);
router.post('/cines',adminController.addNewCine);

module.exports = router;