const express = require('express');
const morgan = require('morgan');

const authRouter = require('./routes/auth.routes');
const notFound = require('./errors/notFound');
const globalError = require('./errors/globalError');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    startedAt: new Date(Date.now() - process.uptime() * 1000).toLocaleString(),
    message: 'API is healthy and running smoothly 🚀',
  });
});

app.use('/api/v1/auth', authRouter);

app.all('*', notFound);

app.use(globalError);

module.exports = app;
