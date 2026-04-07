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
        address
    });
    return res.status(201).json({message : "Supplier created successfully", supplier})
}

const getSuppliers = async(req, res) => {
    const suppliers = await Supplier.find({userId : req.user._id})
    return res.status(200).json({suppliers})
}

module.exports = {createSupplier, getSuppliers}
