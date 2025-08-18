const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

const DB = () => {
  mongoose.connect(url);
  console.log("Connected to MongoDB");
}

module.exports = DB;