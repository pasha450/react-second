const { body, validationResult } = require('express-validator');
const ContactUs = require('../models/ContactUs');

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
    .bail(),

  body('message')
  .trim()
  .not()
  .isEmpty()
  .withMessage('Message can not be empty!')
  .bail()
  .isString()
  .withMessage('Message should be a valid string!')
  .bail()
  .isLength({ min: 1, max: 3000 })
  .withMessage('Message length is should be in a valid range!')
  .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

module.exports = validateUser();