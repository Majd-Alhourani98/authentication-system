const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/database');

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
