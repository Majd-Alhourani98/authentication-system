const mongoose = require('mongoose');
const buildDatabaseURL = require('../utils/buildDatabaseURL');

const { DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

const DB_URL = buildDatabaseURL(DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log(`\n${'━'.repeat(14)} 🔥 DATABASE ${'━'.repeat(14)}`);
    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`${'━'.repeat(41)}\n`);
  } catch (error) {
    console.error(`\n${'❌'.repeat(20)} DATABASE ERROR ${'❌'.repeat(20)}`);
    console.error('🚨 MongoDB connection failed');
    console.error(`📛 Error: ${error.message}`);
    console.error(`🔍 Error Code: ${error.code || 'N/A'}`);
    console.error(`📍 Connection String: ${DB_URL}`);
    console.error(`${'❌'.repeat(48)}\n`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
