require("dotenv").config();
const express = require("express");
const authRouter = express.Router();
const { User } = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../middleware/auth.validation");
const { validate } = require("../middleware/validation");

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags: 
 *      - authorization
 *    summary: API login
 *    description: Api ini digunakan untuk login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: contoh@gmail.com
 *              password:
 *                type: string
 *                example: Password@123!
 *    responses:
 *      '200':
 *        description: Login sukses
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  example: aiuwhrp2h3p48uy24184auewfpa8y34pr8ujrp8u2394p812ejuapwf823r89q23y[293u4[23u4ihr9283y4q02783ywfjaidhjfoaw]]
 *      '400':
 *        description: Login gagal
 */
authRouter.post("/auth/login", loginValidation, validate,async (req, res) => {
  const { email, password } = req.body;
  const existUser = await User.findOne({ where: { email }, raw: true });

  //   kalau gak ada email yang terdaftar response not found
  if (!existUser) return res.status(404).json({ message: "User not found" });

  //   kalau ada cek password
  const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
  if (isPasswordCorrect) {
    // generate jwt token
    const token = await jwt.sign(
      {
        id: existUser.id,
        fullname: existUser.fullname,
        email: existUser.email,
      },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "1d" }
    );

    return res.json({ accessToken: token });
  } else {
    return res.send("Login failed");
  }
});

module.exports = authRouter;
