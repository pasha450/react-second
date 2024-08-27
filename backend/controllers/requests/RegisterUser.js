const { body, validationResult } = require('express-validator');
const User = require('../models/User');

var validateUser = () => [
    body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name can not be empty!")
    .bail()
    .isString()
    .withMessage("Name should be a valid string!")
    .bail(),

    body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email can not be empty!")
    .bail()
    .isString()
    .withMessage("Email should be a valid string!")
    .bail()
    .isEmail()
    .withMessage("Input must be a valid email!")
    .bail()
    .custom((value, { req }) => {
      const regex = new RegExp("^" + value + "$", "i"); // Case-insensitive matching
      return User.find({ email: regex, isDeleted: false }).then((student) => {
        if (student.length) {
          return Promise.reject("Email is already in use!");
        }
      });
    })
    .bail(),

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
    .withMessage('Confirm Password must be at least 8 characters long.')
    .bail()
    .custom((value, { req }) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[@$!%*?&]/.test(value);
      const hasNoWhitespace = /\s/.test(value);
      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || hasNoWhitespace) {
        throw new Error('Confirm Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and no whitespace.');
      }
      console.log(value,"value",req.body.password);
      if (value !== req.body.password) {
        throw new Error('Password and Confirm Password are not same.');
      }
      return true;
    })
    .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors,'errors222')
        if (!errors.isEmpty())
          return res.status(422).json({ errors: errors.array() });
        next();
    },
];

module.exports = validateUser();