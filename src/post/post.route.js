const express = require('express');
const postRouter = express.Router();
const tokenVerification = require('../middleware/token.verification');
const postController = require("./post.controller");
postRouter.use(express.json());

// API CREATE POST

postRouter.post("/posts", tokenVerification, (postController.postUser))

// -------------------------------------------------------------#

// API GET ALL POST 
postRouter.get("/posts", (postController.getAllPost));

//------------------------------------------------------------#

// GET One Post

postRouter.get("/posts/:postID", (postController.getOnePost))

postRouter.put("/posts/:postID", tokenVerification, (postController.editPost))

module.exports = postRouter;
