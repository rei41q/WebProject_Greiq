const express = require("express");
const { checkSchema } = require("express-validator");
const tokenVerification = require("../middleware/token.verification");
const { registrationValidationObject } = require("../middleware/user.validation");
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
 *    summary: API untuk get user
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

/**
 * @swagger
 * /user/registration:
 *  post:
 *    tags:
 *      - user
 *    summary: API untuk registrasi user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullname:
 *                type: string
 *                example: Full Name
 *              email:
 *                type: string
 *                example: yourname@gmail.com
 *              password:
 *                type: string
 *                example: the password must be at least 8 characters with one uppercase one lowercase and one number
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

userRouter.post("/user/registration",checkSchema(registrationValidationObject),
validate, userController.createUser);

/**
 * @swagger
 * /user/{userId}:
 *  put:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - user
 *    summary: API untuk edit user
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
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

// API EDIT USER

userRouter.put("/user", tokenVerification, userController.editUser)

//---------------------------------------------------------------------#

// contoh penggunaan jwt data yang sudah tervalidasi
// adlaah api untuk create post
// userRouter.post("/posts", tokenVerification, (req, res) => {
//   const { title, image, body } = req.body;
//   const authUser = req.auth;

//   const newPost = {
//     title,
//     image,
//     body,
//     user_id: authUser.id,
//   };

//   return res.json(newPost);
// });


module.exports = userRouter;
