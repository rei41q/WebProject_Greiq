
const { body } = require("express-validator");
const { param } = require('express-validator');


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

const updateUserValidation = [

  body("fullname").isString(),

  body("email").isEmail(),
  
  body("password").isStrongPassword().notEmpty(),


];

module.exports = {
  registrationValidationObject,
  updateUserValidation
};
