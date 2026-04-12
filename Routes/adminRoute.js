const express = require("express")
const { authMiddleware } = require("../Middlewares/authMiddleware")
const { roleMiddleware } = require("../Middlewares/roleMiddleware")
const {getClients} = require("../Controllers/adminController")

const adminRoute = express.Router()


adminRoute.get("/",authMiddleware, roleMiddleware("Admin"), getClients)

module.exports = {adminRoute}