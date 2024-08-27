const { body, validationResult } = require('express-validator');
const User = require('../models/User');
var validateUser = () => [
    body('password')
    .not()
    .isEmpty() 
    .withMessage('Password field is required.')
    .bail()
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
    .bail(),
    
    body('confirmPassword')
    .not()
    .isEmpty() 
    .withMessage('Confirm Password field is required.')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .bail()
    .custom((value, { req }) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[@$!%*?&]/.test(value);
      const hasNoWhitespace = /\s/.test(value);
      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || hasNoWhitespace) {
        throw new Error('Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and no whitespace.');
      }
      if (value !== req.body.password) {
        throw new Error('New Password and Confirm Password are not same.');
      }
      return true;
    })
    .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

module.exports = validateUser();