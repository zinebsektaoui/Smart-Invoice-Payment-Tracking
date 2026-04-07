const Supplier = require('../models/supplier')

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
    const suppliers = await Supplier.find({userId : req.user.userId})// hadshy makhdamsh
    if(suppliers.length === 0) {
        return res.status(404).json({message : "No suppliers found"})
    }
    return res.status(200).json({suppliers})
}


const dropSupplier = async(req, res) => {
    const {id} = req.params
    const supplier = await Supplier.findByIdAndDelete(id)
    if(!supplier) {
        return res.status(404).json({message : "Supplier not found"})
    }
    return res.status(200).json({message : "Supplier deleted successfully"})
}

module.exports = {createSupplier, getSuppliers, dropSupplier}
