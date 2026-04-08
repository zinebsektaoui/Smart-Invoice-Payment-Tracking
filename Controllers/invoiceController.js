const Invoice = require("../Models/Invoice")
const Supplier = require("../Models/Supplier")

const createInvoice = async(req, res) => {
    try {
        const {supplierId, amount, dueDate, description} = req.body
        if(!supplierId || !amount || !dueDate){
            return res.status(400).json({message : "supplierId, amount and the due date are required !"})
        }
        const supplier = await Supplier.findById(supplierId)
        if(!supplier){
            return res.status(404).json({message : "Supplier ID not found"})
        }
        if(supplier.clientId != req.user.userId){
            return res.status(403).json({error : "The supplier id you gived is not correspending to the connected client !"})
        }
        const invoice = {
            supplierId,
            amount,
            dueDate,
            description,
            clientId : req.user.userId
        }
        await Invoice.create(invoice)
        return res.status(200).json({success : "Invoice created"})
    } catch (error) {
        return res.status(400).json({error : error.message})
    }
}

const getAll = async(req, res) => {
    try {
        const invoices = await Invoice.find({clientId : req.user.userId})
        if(!invoices){
            return res.status(404).json({message : "No invoices available !"})
        }
        if(invoices.length === 0){
            return res.status(404).json({message : "No invoices available !"})
        }
        return res.status(200).json({"Invoices found " : invoices})        
    } catch (error) {
        return res.status(400).json({error : error.message})
    }
}

const getById = async(req, res) => {
    const {id} = req.params
    const invoice = await Invoice.findById(id)
    if(!invoice){
        return res.status(404).json({message : "Invoice not found"})
    }
    return res.status(200).json({message : invoice})
}

const update = async(req, res) => {
    const {id} = req.params
    const invoice = await Invoice.findOne({})
}
module.exports = {createInvoice, getAll, getById}