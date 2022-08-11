const { body } = require("express-validator");

const loginValidation = [
  body("email").isEmail(),
  body("password").isString().notEmpty(),
];

module.exports = {
  loginValidation,
};
