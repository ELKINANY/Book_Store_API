const router = require('express').Router();

// Validators & Middleware
const {
  createBookValidator,
  updateBookValidator,
  getBookValidator,
  deleteBookValidator
} = require('../utils/validation/booksValidation');
const { protect, allowedTo } = require('../middlewares/auth.middleware');
const uploadImage = require('../middlewares/uploadImage');

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

// Book image upload
router.put('/:id/upload-photo', protect, allowedTo('admin', 'author'), uploadImage, async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  const Book = require('../models/books.model');
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    { photo: req.file.filename },
    { new: true }
  );
  res.status(200).json({ data: updatedBook });
});

module.exports = router;