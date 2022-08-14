const express = require("express");
const { checkSchema } = require("express-validator");
const tokenVerification = require("../middleware/token.verification");
const { registrationValidationObject, getOneUserValidation } = require("../middleware/user.validation")
const { validate } = require("../middleware/validation");
const userRouter = express.Router();

const userController = require("./user.controller");
// API GET ALL USER

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - user
 *    summary: API Get All User (PUBLIC)
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                fullname:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                createdAt:
 *                  type: string
 */
  

//---------------------------------------------------------------------#

userRouter.get("/users", userController.getAllUser)

// API USER REGISTRATION
/**
 * @swagger
 * /user/registration:
 *  post:
 *    tags:
 *      - user
 *    summary: API User Registration (PUBLIC & VALIDATION)
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullname:
 *                type: string
 *                example: Greiq Imapuly
 *              email:
 *                type: string
 *                example: greiq@gmail.com
 *              password:
 *                type: string
 *                example: 123456&Qz
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                fullname:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                createdAt:
 *                  type: string
 *     
 */
  

//---------------------------------------------------------------------#

userRouter.post("/user/registration",checkSchema(registrationValidationObject),
validate, userController.createUser);

// API EDIT USER 

/**
 * @swagger
 * /user/{userId}:
 *  put:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - user
 *    summary: API Edit User (PRIVATE & VALIDATION)
 *    parameters:
 *      - in: path
 *        name: userId
 *        value : 1
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullname:
 *                type: string
 *                example: Nama lengkap
 *              email:
 *                type: string
 *                example: contoh@gmail.com
 *              password:
 *                type: string
 *                example: Password@123!
 *    responses:
 *      '200':
 *        description: Edit data sukses
 */


userRouter.put("/user/:userId",checkSchema(registrationValidationObject),
validate, tokenVerification, userController.editUser)

//---------------------------------------------------------------------#



module.exports = userRouter;
