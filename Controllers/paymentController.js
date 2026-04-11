const {createPaymentService, getInvoiceDetailsService} = require('../Services/paymentService');

async function createPaymentController(req, res) {
    const payment = await createPaymentService(req, res);
    return res.status(201).json({message : "Payment created successfully", payment})
}

async function getInvoiceDetailsController(req, res) {
    const result = await getInvoiceDetailsService(req, res);
    return res.status(200).json(result)
}
module.exports = {createPaymentController, getInvoiceDetailsController}