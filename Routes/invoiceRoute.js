const express = require("express")
const {createInvoice, getAll, getById} = require("../Controllers/invoiceController")
const {roleMiddleware} = require("../Middlewares/roleMiddleware")
const validateMiddleware = require("../Middlewares/validateMiddleware")
const {authMiddleware} = require("../Middlewares/authMiddleware")
const invoiceValidator = require("../Validators/invoiceValidator")

const invoiceRoute = express.Router()

invoiceRoute.post("/", authMiddleware, roleMiddleware("Client"), validateMiddleware(invoiceValidator), createInvoice)
invoiceRoute.get("/", authMiddleware, roleMiddleware("Client"), getAll)
invoiceRoute.get("/:id", authMiddleware, roleMiddleware("Client"), getById)

module.exports = invoiceRoute