const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const app = require('./app');

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

connectDB();

// Start the server and listen for incoming connections
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n${'━'.repeat(15)} 🔥 SERVER ${'━'.repeat(15)}`);
  console.log(`🟢 STATUS      → Running`);
  console.log(`🔗 LINK        → http://localhost:${PORT}`);
  console.log(`🌍 ENVIRONMENT → ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ STARTED AT  → ${new Date().toLocaleTimeString()}`);
  console.log(`${'━'.repeat(41)}`);
});
