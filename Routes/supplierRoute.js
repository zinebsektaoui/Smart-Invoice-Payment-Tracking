const express = require("express")
const {createSupplier, getSuppliers} = require("../Controllers/supplierController")
const {authMiddleware} = require("../Middlewares/authMiddleware")
const {roleMiddleware} = require("../Middlewares/roleMiddleware")
const validateMiddleware = require("../Middlewares/validateMiddleware")
const supplierValidator = require("../Validators/supplierValidator")

const supplierRoute = express.Router()

supplierRoute.post("/", authMiddleware, roleMiddleware("Client"), validateMiddleware(supplierValidator), createSupplier)
supplierRoute.get("/", authMiddleware, roleMiddleware("Client"), getSuppliers)

module.exports = supplierRoute