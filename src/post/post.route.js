const express = require('express');
const postRouter = express.Router();
const tokenVerification = require('../middleware/token.verification');
const postController = require("./post.controller");
const { checkSchema } = require("express-validator");
const { getPostsValidation, getOnePostValidation } = require("../middleware/post.validation")
const { validate } = require("../middleware/validation");

postRouter.use(express.json());

// API CREATE POST

postRouter.post("/posts", tokenVerification, (postController.createPost))

/**
 * @swagger
 * /posts:
 *  post:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - post
 *    summary: API Create Post (PRIVATE & VALIDATION)
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: Update Pantai Gatra 10
 *              image:
 *                image: string
 *                example: https://salsawisata.b-cdn.net/wp-content/uploads/2021/11/Pantai-Gatra.jpg
 *              body:
 *                type: string
 *                example: Pantai Gatra merupakan salah satu pantai terindah di Indonesia
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                title:
 *                  type: string
 *                image:
 *                  type: string
 *                body:
 *                  type: string
 *                userId:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                createdAt:
 *                  type: string
 *     
 */



// -------------------------------------------------------------#

// API GET ALL POST / By Writer

postRouter.get("/posts", getPostsValidation, validate, (postController.getAllPost));

/**
 * @swagger
 * /posts:
 *  get:
 *    tags:
 *      - post
 *    summary: API Get All Post / By Writer (Fitur Sort, Search, Paginate) User Bisa Memilih Pilihan Sesuai Keinginannya (PUBLIC & VALIDATION) 
 *    parameters:
 *      - in: query
 *        name: writerId
 *        allowEmptyValue: true
 *        example : 1
 *      - in: query
 *        name: sortOption
 *        allowEmptyValue: true
 *        example : ASC/DESC
 *      - in: query
 *        name: searchPostTitle
 *        allowEmptyValue: true
 *        example : Pantai Gatra
 *      - in: query
 *        name: pageNumber
 *        allowEmptyValue: true
 *        example : 1
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                title:
 *                  type: string
 *                image:
 *                  type: string
 *                body:
 *                  type: string
 *                userId:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                createdAt:
 *                  type: string
 */
  

//---------------------------------------------------------------------#



// ------------------------------------------------------------#

// API GET DETAIL/ONE POST

postRouter.get("/posts/:postId", getOnePostValidation, validate, (postController.getDetailPost))

/**
 * @swagger
 * /posts/{postId}:
 *  get:
 *    tags:
 *      - post
 *    summary: API Get Detail / One Post (PUBLIC & VALIDATION)
 *    parameters:
 *      - in: path
 *        name: postId
 *        allowEmptyValue: true
 *        example : 1
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                title:
 *                  type: string
 *                image:
 *                  type: string
 *                body:
 *                  type: string
 *                userId:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                createdAt:
 *                  type: string
 */
  

//---------------------------------------------------------------------#

postRouter.put("/posts/:postId", tokenVerification, (postController.editPost))

module.exports = postRouter;
