const { body } = require('express-validator');

const updateProfileValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage('Name must be 2-80 characters long'),
  body('email').optional().trim().isEmail().withMessage('A valid email is required')
];

module.exports = {
  updateProfileValidator
};
