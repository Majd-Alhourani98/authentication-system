const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/authentication';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log('✅ Successfully connected to the database');
  } catch (error) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
