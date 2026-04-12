const express = require("express")
const {createSupplier, getSuppliers, dropSupplier, getOneSupplier, update, getStats} = require("../Controllers/supplierController")
const {authMiddleware} = require("../Middlewares/authMiddleware")
const {roleMiddleware} = require("../Middlewares/roleMiddleware")
const validateMiddleware = require("../Middlewares/validateMiddleware")
const supplierValidator = require("../Validators/supplierValidator")

const supplierRoute = express.Router()

supplierRoute.post("/", authMiddleware, roleMiddleware("Client"), validateMiddleware(supplierValidator), createSupplier)
supplierRoute.get("/", authMiddleware, roleMiddleware("Client"), getSuppliers)
supplierRoute.delete("/:id", authMiddleware, roleMiddleware("Client"), dropSupplier)
supplierRoute.get("/:id", authMiddleware, roleMiddleware("Client"), getOneSupplier)
supplierRoute.put("/:id", authMiddleware, roleMiddleware("Client"), update)
supplierRoute.get("/:id/stats", authMiddleware, roleMiddleware("Client"), getStats)


module.exports = supplierRoute