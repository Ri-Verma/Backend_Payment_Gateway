// backend/controllers/reportController.js
const { getDB } = require('../db');

exports.generateSalesReport = async (req, res) => {
  try {
    const db = getDB();

    const salesData = await new Promise((resolve, reject) => {
      db.all(`
        SELECT DATE(created_at) AS sale_date, SUM(amount) AS total_sales
        FROM payments
        GROUP BY sale_date
        ORDER BY sale_date DESC
      `, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });

    res.json(salesData);
  } catch (err) {
    console.error('Error generating sales report:', err.message);
    res.status(500).send('Server Error');
  }
};