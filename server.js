const express = require('express');
const app = express();
require('dotenv').config();
const DB = require('./config/connectToDB');
const apiError = require('./utils/apiError');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 7000;

//connect to MongoDB
DB();

// Middlewares
app.use(express.json());
//static files
app.use(express.static(path.join(__dirname, 'uploads')))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

//helmet
app.use(helmet());

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
})
);

app.use(cors('*'));

// Import routes
app.use('/api/v1/authors', require('./routes/author.route'));
app.use('/api/v1/books', require('./routes/books.route'));
app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/upload', require('./routes/upload.route'));

app.use((req, res, next) => {
  next(new apiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});