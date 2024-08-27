const { body, validationResult } = require('express-validator');
const User = require('../models/User');

var validateUser = () => [
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
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({ errors: errors.array() });
        next();
    },
];

module.exports = validateUser();