require("dotenv").config();
const express = require('express');
const authRouter = require("./src/auth/auth.route");
const tokenVerification = require("./src/middleware/token.verification");
const userRouter = require("./src/user/user.route");
const postRouter = require("./src/post/post.route");
const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/",tokenVerification, (req, res) => {
  res.send("hello from simple server :)");
});

app.use(userRouter);
app.use(authRouter);
app.use(postRouter);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
