const {createPaymentService} = require('../Services/paymentService');

async function createPaymentController(req, res) {
    const payment = await createPaymentService(req, res);
    return res.status(201).json({message : "Payment created successfully", payment})
}

module.exports = {createPaymentController}