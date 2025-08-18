const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [100, 'Name must be less than 100 characters']
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [500, 'Description must be less than 500 characters']
  },
  price:{
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],
    max: [10000, 'Price must be less than 10000']
  },
  author:{
    type: String,
    required: true,
    minlength: [3, 'Author name must be at least 3 characters'],
    maxlength: [50, 'Author name must be less than 50 characters']
  },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);