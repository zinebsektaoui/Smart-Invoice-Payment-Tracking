const Supplier = require("../Models/Supplier")
const Invoice = require("../Models/Invoice")

const dashboard=async(req,res)=>{
    try{
        const userId=req.user.userId
        const totalFournisseurs=await Supplier.countDocuments({clientId : userId}) // totalSuppliers

        const invoices = await Invoice.find({clientId : userId})
        const totalInvoices = invoices.length // totalInvoices

        let totalAmount = 0
        let totalPaid = 0
        let totalRemaining = 0
        let invoicesByStatus = {
            paid : 0,
            unpaid : 0,
            partially_paid : 0
        }

        invoices.forEach(el => {
            totalAmount += el.amount
            totalPaid += el.tottalPaid
            totalRemaining += el.remainingAmount

            if(el.status === "paid") invoicesByStatus.paid++
            if(el.status === "unpaid") invoicesByStatus.unpaid++
            if(el.status === "partially_paid") invoicesByStatus.partially_paid++
        })
        return res.status(200).json({totalFournisseurs, totalInvoices, totalAmount, totalPaid, totalRemaining, invoicesByStatus})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports = {dashboard}