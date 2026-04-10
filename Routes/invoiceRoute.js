const express = require("express")
const {createInvoice, getAll, getById, deleteInvoice, update} = require("../Controllers/invoiceController")
const {roleMiddleware} = require("../Middlewares/roleMiddleware")
const validateMiddleware = require("../Middlewares/validateMiddleware")
const {authMiddleware} = require("../Middlewares/authMiddleware")
const invoiceValidator = require("../Validators/invoiceValidator")
const {correspending} = require("../Middlewares/Correspondence")
const invoiceRoute = express.Router()

invoiceRoute.post("/", authMiddleware, roleMiddleware("Client"), validateMiddleware(invoiceValidator), createInvoice)
invoiceRoute.get("/", authMiddleware, roleMiddleware("Client"), getAll)
invoiceRoute.get("/:id", authMiddleware, roleMiddleware("Client"), correspending, getById)
invoiceRoute.delete("/:id", authMiddleware, roleMiddleware("Client"), correspending, deleteInvoice)
invoiceRoute.put("/:id", authMiddleware, roleMiddleware("Client"), correspending, update)

module.exports = invoiceRoute