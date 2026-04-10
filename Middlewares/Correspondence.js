const Invoice = require("../Models/Invoice")

const correspending = async(req, res, next) => {
    const {id} = req.params
    const invoice = await Invoice.findById(id)
    if(invoice.clientId != req.user.userId){
        return res.status(403).json({message : "The supplier id you gived is not correspending to the connected client !"})
    }
    next()
}

module.exports = {correspending}