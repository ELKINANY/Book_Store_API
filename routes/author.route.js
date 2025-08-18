const router = require('express').Router();

// Controllers
const {
  createAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/author.controller');

// Validators & Middleware
const {
  createAuthorValidator,
  getAuthorValidator,
  updateAuthorValidator,
  deleteAuthorValidator
} = require('../utils/validation/authorValidation');
const { protect, allowedTo } = require('../middlewares/auth.middleware');

// Author routes
router.post('/', protect, allowedTo('admin', 'author'), createAuthorValidator, createAuthor);
router.get('/', getAllAuthors);

router.get('/:id', getAuthorValidator, getSingleAuthor);
router.put('/:id', protect, allowedTo('admin', 'author'), updateAuthorValidator, updateAuthor);
router.delete('/:id', protect, allowedTo('admin', 'author'), deleteAuthorValidator, deleteAuthor);

module.exports = router;