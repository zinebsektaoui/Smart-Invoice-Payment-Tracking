const Invoice = require("../Models/Invoice")

const CheckAmountPayed = async(req, res, next) => {
    const {amountPayed} = req.body
    const {id}= req.params
    const invoice = await Invoice.findById(id)

    if(amountPayed > invoice.amount){
        return res.status(422).json({message : `You can't invest more than ${invoice.amount}`})
    }
    next()
}

module.exports = {CheckAmountPayed}