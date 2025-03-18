// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.db');

let db;

const connectDB = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error connecting to SQLite database:', err.message);
        reject(err);
      } else {
        console.log('Connected to SQLite database.');
        resolve(db);
      }
    });
  });
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return db;
};

// Function to run migrations or create tables if they don't exist
const initializeDatabase = async () => {
  const dbInstance = getDB();
  return new Promise((resolve, reject) => {
    dbInstance.serialize(() => {
      // Example: Create a users table if it doesn't exist
      dbInstance.run(`
        CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
        )
      `, (err) => {
        if (err) {
          console.error('Error creating users table:', err.message);
          reject(err);
          return;
        }
        console.log('Users table created or already exists.');

        // Example: Create a payments table
        dbInstance.run(`
          CREATE TABLE IF NOT EXISTS payment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            transaction_id TEXT UNIQUE NOT NULL,
            amount REAL NOT NULL,
            payment_method TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES user(id)
          )
        `, (err) => {
          if (err) {
            console.error('Error creating payments table:', err.message);
            reject(err);
            return;
          }
          console.log('Payments table created or already exists.');
          resolve();
        });
      });
    });
  });
};

module.exports = { connectDB, getDB, initializeDatabase };