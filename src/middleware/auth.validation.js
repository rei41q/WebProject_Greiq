const { body } = require("express-validator");

const loginValidation = [
  body("email").isEmail().notEmpty().withMessage('Please insert a valid email address'),
  body("password").isString().notEmpty().withMessage('assword cannot be empty '),
];

module.exports = {
  loginValidation,
};
