const Supplier = require('../Models/Supplier')
const Invoice = require("../Models/Invoice")

const createSupplier = async(req, res) => {
    const { name, phone, email, address } = req.body;
    if(!name) {
        return res.status(422).json({message : "Name is required"})
    }
    const supplier = await Supplier.create({
        name,
        phone,
        email,
        address,
        clientId : req.user.userId
    });
    return res.status(201).json({message : "Supplier created successfully", supplier})
}

const getSuppliers = async(req, res) => {
    const suppliers = await Supplier.find({clientId : req.user.userId})
    if(suppliers.length === 0) {
        return res.status(404).json({message : "No suppliers found"})
    }
    return res.status(200).json({suppliers})
}

const getOneSupplier = async (req, res) => {
    const {id} = req.params
    const supplier = await Supplier.findById(id)
    if(!supplier){
        return res.status(404).json({message : "Supplier not found !"})
    }
    if(supplier.clientId != req.user.userId) {
        return res.status(403).json({message : "This supplier is not in your suppliers list !"})
    }
    return res.status(200).json({message : "Supplier found", Données : supplier})
}

const dropSupplier = async(req, res) => {
    const {id} = req.params
    const supplier = await Supplier.findById(id)
    if(supplier.clientId.toString() !== req.user.userId) {
        return res.status(403).json({message : "This supplier is not in your suppliers list !"})
    }
    if(!supplier) {
        return res.status(404).json({message : "Supplier not found"})
    }
    await supplier.deleteOne()
    return res.status(200).json({message : "Supplier deleted successfully"})
}

const update = async(req, res) => {
    const {id} = req.params
    const supplier = await Supplier.findById(id)
    if(!supplier){
        return res.status(404).josn({error : "Supplier not found !"})
    }
    const {name, email, phone, address} = req.body
    supplier.name = name,
    supplier.email = email
    supplier.phone = phone
    supplier.address = address
    await Supplier.updateOne(supplier)
    return res.status(200).json({success : "Supplier updated successfully", "New Data" : supplier})
}


const getStats = async(req, res) => {
    const {id} = req.params
    const supplier = await Supplier.findById(id).select("_id name")

    const invoices = await Invoice.find({supplierId : id})
    const totalInvoices = invoices.length

    let totalAmount = 0
    let totalPaid = 0
    let totalRemaining = 0
    let totalAllSuppliers = 0

    invoices.forEach(el => {
        totalAmount += el.amount
        totalPaid += el.tottalPaid
        totalRemaining += el.remainingAmount 
    }); 

    const invoicesOfClient = await Invoice.find({clientId : req.user.userId})
    invoicesOfClient.forEach(el => {
        totalAllSuppliers += el.amount
    })
    
    const percentage = totalAllSuppliers === 0 ? 0 : (totalAmount / totalAllSuppliers) * 100
    
    return res.status(200).json({
        supplierId: supplier._id,
        supplierName: supplier.name,
        totalInvoices,
        totalAmount,
        totalPaid,
        totalRemaining,
        percentage
    });
}
module.exports = {createSupplier, getSuppliers, dropSupplier, getOneSupplier, update, getStats}
