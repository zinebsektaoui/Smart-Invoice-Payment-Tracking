const express = require("express")
const { authMiddleware } = require("../Middlewares/authMiddleware")
const { roleMiddleware } = require("../Middlewares/roleMiddleware")
const {dashboard} = require("../Controllers/dashboardController")

const dashboardRoute = express.Router()


dashboardRoute.get("/",authMiddleware, roleMiddleware("Client"),dashboard)

module.exports = {dashboardRoute}