//CARPETA DE LAS RUTAS
const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');

// Rutas
router.post('/create-summary', summaryController.createSummary);

module.exports = router;
