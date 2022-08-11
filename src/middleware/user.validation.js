const { body } = require("express-validator");

const registrationValidationObject = {
  fullname: {
    in: ["body"],
    isString: true,
  },
  email: {
    in: ["body"],
    isEmail: true,
  },
  password: {
    in: ["body"],
    isStrongPassword: true,
  },
};

module.exports = {
  registrationValidationObject,
};
