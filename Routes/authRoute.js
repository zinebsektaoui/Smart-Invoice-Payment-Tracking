const express = require("express")
const { registerController, loginController, myProfileController } = require("../Controllers/authController");
const validateMiddleware = require("../Middlewares/validateMiddleware")
const userValidator = require("../Validators/userValidator")
const {authMiddleware} = require("../Middlewares/authMiddleware")

const userRoute=express.Router();

userRoute.post("/register", validateMiddleware(userValidator),registerController)
userRoute.post("/login", loginController)
userRoute.get("/me", authMiddleware, myProfileController)

module.exports = {userRoute}