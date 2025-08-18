const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const createAuthorValidator = [
  body('name')
  .notEmpty().withMessage('Name is required')
  .isLength({min: 3, max: 50}).withMessage('Name must be between 3 and 50 characters'),
  body('nationality')
  .notEmpty().withMessage("Nationality is required"),
  validatorMiddleware
]

const getAuthorValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  validatorMiddleware
]

const updateAuthorValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  body('name')
  .optional()
  .isLength({min: 3, max: 50}).withMessage('Name must be between 3 and 50 characters'),
  body('nationality')
  .optional()
  .isLength({min: 3, max: 50}).withMessage("Nationality must be between 3 and 50 characters"),
  validatorMiddleware
]

const deleteAuthorValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  validatorMiddleware
]

module.exports = {
  createAuthorValidator,
  getAuthorValidator,
  updateAuthorValidator,
  deleteAuthorValidator
}
