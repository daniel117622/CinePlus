const path = require('path');
const express = require('express');
const movieController = require('../controllers/movieController');
const router = express.Router();

router.get('/:movieId',movieController.loadMovie);

module.exports = router;
