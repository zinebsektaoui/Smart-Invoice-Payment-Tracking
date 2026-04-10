const Payment = require('../Models/Payment');
const Invoice = require('../Models/Invoice');

async function createPaymentService(req, res) {
    const { invoiceId } = req.params;
    const { amount, paymentDate, method, note, supplierId } = req.body;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
    }
    if (invoice.status === "paid") {
        return res.status(422).json({ error: "Invoice is already paid" });
    }
    if(amount > 0){//amount payed
        invoice.status = "partially_paid"
        await invoice.save();
    }
    if(amount >= invoice.amount){//amount payed
        invoice.status = "paid";
        await invoice.save();
    }
    if(!amount || !paymentDate || !method){
        return res.status(400).json({ error: "Missing required fields" })
    }

    const payment = new Payment({
        invoiceId: invoiceId,
        userId: req.user.UserId,
        supplierId,
        method,
        amount,
        paymentDate,
        note
    })
    await payment.save()
    // console.log(invoiceId); err hena
    return payment
}

module.exports = {createPaymentService}