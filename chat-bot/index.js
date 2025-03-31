const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./src/config/database');
const chatRoutes = require('./src/routes/chat.routes');
const errorHandler = require('./src/middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors([
  {
    origin: [
      process.env.CORS_ORIGIN,
      "https://medi-sync-iota.vercel.app",
      "https://www.healthyapp.com",
      "https://healthyapp.com",
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
]));

app.use(morgan('dev'));

app.use(express.json());

// Routes
app.use('/api', chatRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});