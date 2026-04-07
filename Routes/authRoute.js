const express = require("express")
const { registerController, loginController } = require("../Controllers/authController");
const { validateMiddleware } = require("../Middlewares/validateMiddleware")

const userRoute=express.Router();

userRoute.post("/register",validateMiddleware,registerController)
userRoute.post("/login", loginController)

module.exports = {userRoute}