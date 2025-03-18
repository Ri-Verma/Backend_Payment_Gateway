// backend/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate } = require('../middleware/authMiddleware');

// All report-related routes are protected by the authenticate middleware
router.get('/sales', authenticate, reportController.generateSalesReport);

module.exports = router;