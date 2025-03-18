// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const { authenticate } = require('./middleware/authMiddleware');
const { connectDB, initializeDatabase } = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

async function startServer() {
  try {
    await connectDB();
    await initializeDatabase();

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/payments', authenticate, paymentRoutes);
    app.use('/api/reports', authenticate, reportRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();