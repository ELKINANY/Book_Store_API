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
const uploadImage = require('../middlewares/uploadImage');

// Author routes
router.post('/', protect, allowedTo('admin', 'author'), createAuthorValidator, createAuthor);
router.get('/', getAllAuthors);

router.get('/:id', getAuthorValidator, getSingleAuthor);

router.put('/:id', protect, allowedTo('admin', 'author'), updateAuthorValidator, updateAuthor);
router.delete('/:id', protect, allowedTo('admin', 'author'), deleteAuthorValidator, deleteAuthor);

// Author image upload
router.put('/:id/upload-photo', protect, allowedTo('admin', 'author'), uploadImage, async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  const User = require('../models/user.model');
  const updatedAuthor = await User.findByIdAndUpdate(
    req.params.id,
    { photo: req.file.filename },
    { new: true }
  );
  res.status(200).json({ data: updatedAuthor });
});

module.exports = router;