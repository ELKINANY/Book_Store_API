const router = require('express').Router();

// Validators & Middleware
const {
  createBookValidator,
  updateBookValidator,
  getBookValidator,
  deleteBookValidator
} = require('../utils/validation/booksValidation');
const { protect, allowedTo } = require('../middlewares/auth.middleware');

// Controllers
const {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook
} = require('../controllers/book.controller');

// Books routes
router.route('/')
  .post(protect, allowedTo('admin', 'author'), createBookValidator, createBook)
  .get(getAllBooks);

router.route('/:id')
  .get(getBookValidator, getSingleBook)
  .put(protect, allowedTo('admin', 'author'), updateBookValidator, updateBook)
  .delete(protect, allowedTo('admin', 'author'), deleteBookValidator, deleteBook);

module.exports = router;