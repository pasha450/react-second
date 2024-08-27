const { body, validationResult } = require('express-validator');
const User = require('../models/User');

var validateUser = () => [
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name can not be empty!')
    .bail()
    .isString()
    .withMessage('Name should be a valid string!')
    .bail()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Name length is should be in a valid range!')
    .bail(),
  // body('country')
  //     .not()
  //     .isEmpty()
  //     .withMessage('Country can not be empty!')
  //     .isString()
  //     .withMessage('Country should be a valid string!')
  //     .trim()
  //     .bail(), 
  //   (req, res, next) => {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty())
  //       return res.status(422).json({ errors: errors.array() });
  //     next();
  //   },

  body('password')
    .optional({ checkFalsy: true })
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .bail()
    .custom((value) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[@$!%*?&]/.test(value);
      const hasNoWhitespace = /\s/.test(value);

      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || hasNoWhitespace) {
        throw new Error('Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and no whitespace.');
      }
      return true;
    })
    .withMessage('Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and no whitespace.')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateUser();