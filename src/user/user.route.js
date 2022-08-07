const express = require('express');
const tokenVerification = require("../middleware/token.verification");
const userRouter = express.Router();
const userController = require("./user.controller");
// API GET ALL USER

userRouter.get("/users", userController.getAllUser)

//---------------------------------------------------------------------#

userRouter.post("/user/registration", userController.createUser);

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
