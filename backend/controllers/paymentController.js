const { getDB } = require('../db');
const { v4: uuidv4 } = require('uuid');

exports.processPayment = async (req, res) => {
  try {
    const { amount, paymentMethod, cardNumber, expiryDate, cvv } = req.body;
    const userId = req.user;
    const db = getDB();
    const transactionId = uuidv4();

    console.log('Processing payment for user:', userId, { amount, paymentMethod, cardNumber: '****-****-****-' + cardNumber.slice(-4) });

    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO payment (user_id, transaction_id, amount, payment_method) VALUES (?, ?, ?, ?)',
        [userId, transactionId, amount, paymentMethod],
        function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        }
      );
    });
    setTimeout(() => {
      res.json({ success: true, message: 'Payment successful', transactionId });
    }, 1000);

  } catch (err) {
    console.error('Error processing payment:', err.message);
    res.status(500).json({ success: false, message: 'Payment processing failed' });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user;
    const db = getDB();

    const paymentHistory = await new Promise((resolve, reject) => {
      db.all('SELECT transaction_id, amount, payment_method, created_at FROM payment WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });

    res.json(paymentHistory);
  } catch (err) {
    console.error('Error fetching payment history:', err.message);
    res.status(500).send('Server Error');
  }
};