const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/process', authenticate, paymentController.processPayment);
router.get('/history', authenticate, paymentController.getPaymentHistory);

module.exports = router;