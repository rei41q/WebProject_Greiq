const express = require('express');
const postRouter = express.Router();
const tokenVerification = require('../middleware/token.verification');
const postController = require("./post.controller");
const { getPostsValidation, getOnePostValidation, createPostsValidation } = require("../middleware/post.validation")
const { validate } = require("../middleware/validation");

postRouter.use(express.json());

// API CREATE POST

postRouter.post("/posts", tokenVerification, createPostsValidation, validate, (postController.createPost))

/**
 * @swagger
 * /posts:
 *  post:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - post
 *    summary: API Create Post (PRIVATE & VALIDATION)
 *    description: API untuk pendaftaran user, Jika email sudah terdaftarkan sebelumnya, maka pendaftaran gagal
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: pantai gatra 10
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

postRouter.get("/posts", getPostsValidation, validate, (postController.getAllPostOrByWriter));

/**
 * @swagger
 * /posts:
 *  get:
 *    tags:
 *      - post
 *    summary: API Get All Post / By Writer (PUBLIC & VALIDATION) 
 *    description: API untuk mendapatkan semua post / dari penulis tertentu, memilik 3 Fitur (Sort, Search, Paginate) User Bisa Memilih Pilihan Fitur Sesuai Keinginannya 
 *    parameters:
 *      - in: query
 *        name: writerId
 *        example : 1
 *      - in: query
 *        name: sortOption
 *        example : ASC/DESC
 *      - in: query
 *        name: searchPostTitle
 *        example : pantai gatra
 *      - in: query
 *        name: pageNumber
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

// API EDIT POST

postRouter.put("/posts/:postId", tokenVerification, createPostsValidation, validate, (postController.editPost))

/**
 * @swagger
 * /posts/{postId}:
 *  put:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - post
 *    summary: API Edit Post (PRIVATE & VALIDATION)
 *    description: API Edit Post
 *    parameters:
 *      - in: path
 *        name: postId
 *        value : 1
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: update pantai gatra
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


module.exports = postRouter;