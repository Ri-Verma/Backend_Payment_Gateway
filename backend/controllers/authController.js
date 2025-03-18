// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const { getDB } = require('../db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = getDB();

    const existingUser = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM user WHERE username = ?', [username], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      });
    });

    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await new Promise((resolve, reject) => {
      db.run('INSERT INTO user (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

dotenv.config();

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = getDB();

    const existingUser = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM user WHERE username = ?', [username], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      });
    });

    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await new Promise((resolve, reject) => {
      db.run('INSERT INTO user (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = getDB();

    let user;
    if (username) {
      user = await new Promise((resolve, reject) => {
        db.get('SELECT id, password FROM user WHERE username = ?', [username], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row);
        });
      });
    }

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ msg: 'Login successful', token }); 
    } else {
      return res.status(400).json({ msg: 'Invalid credentials' }); 
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};