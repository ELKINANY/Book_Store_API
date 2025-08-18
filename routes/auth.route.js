const router = require('express').Router();

// Controllers
const {
  register,
  login,
  forgetPassword,
  verifyPassResetCode,
  resetPassword
} = require('../controllers/auth.controller');
const {
  updateLoggedUser,
  deleteLoggedUser,
  getLoggedUser,
  getAllUsers,
  getUser,
  deleteUser
} = require('../controllers/user.controller');

// Validators & Middleware
const {
  registerValidator,
  loginValidator,
  updateUserValidator,
  verifyPassResetCodeValidator,
  resetPasswordValidator,
  forgetPasswordValidator
} = require('../utils/validation/authValidation');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const { protect, allowedTo } = require('../middlewares/auth.middleware');
const uploadImage = require('../middlewares/uploadImage');

// Auth routes
router.post('/register', registerValidator, validatorMiddleware, register);
router.post('/login', loginValidator, validatorMiddleware, login);

// Password reset routes
router.post('/forgot-password', forgetPasswordValidator, validatorMiddleware, forgetPassword);
router.post('/verify-reset-code', verifyPassResetCodeValidator, validatorMiddleware, verifyPassResetCode);
router.post('/reset-password', resetPasswordValidator, validatorMiddleware, resetPassword);

// User profile routes
router.get('/my-profile', protect, getLoggedUser);
router.put('/update-me', protect, updateUserValidator, validatorMiddleware, updateLoggedUser);
router.delete('/delete-me', protect, deleteLoggedUser);

// User image upload
router.put('/upload-photo', protect, uploadImage, async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  const User = require('../models/user.model');
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { photo: req.file.filename },
    { new: true }
  );
  res.status(200).json({ data: updatedUser });
});

// Admin user management routes
router.get('/', protect, allowedTo('admin'), getAllUsers);
router.get('/:id', protect, getUser);
router.delete('/:id', protect, allowedTo('admin'), deleteUser);

module.exports = router;