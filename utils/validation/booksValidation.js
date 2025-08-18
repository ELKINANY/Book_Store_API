const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createBookValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({min: 3})
    .withMessage('Title must be at least 3 characters long'),
  body('author')
    .notEmpty()
    .withMessage('Author is required')
    .isLength({min: 3})
    .withMessage('Author must be at least 3 characters long'),
  validatorMiddleware
];

exports.updateBookValidator = [
  check('id').isMongoId().withMessage('Invalid book ID format'),
  body('title')
    .optional()
    .isLength({min: 3})
    .withMessage('Title must be at least 3 characters long'),
  body('author')
    .optional()
    .isLength({min: 3})
    .withMessage('Author must be at least 3 characters long'),
  validatorMiddleware
];

exports.getBookValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid book ID format'),
  validatorMiddleware
];

exports.deleteBookValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid book ID format'),
  validatorMiddleware
];