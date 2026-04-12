const Payment = require('../Models/Payment');
const Invoice = require('../Models/Invoice');

async function createPaymentService(req, res) {
  const { id } = req.params;
  const { amount, paymentDate, method, note, supplierId } = req.body;

  if (!amount || !paymentDate || !method) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const invoice = await Invoice.findById(id);

  if (!invoice) {
    return res.status(404).json({ error: "Invoice not found" });
  }

  if (invoice.status === "paid") {
    return res.status(422).json({ error: "Invoice is already paid" });
  }
  invoice.tottalPaid += amount;

  invoice.remainingAmount = invoice.amount - invoice.tottalPaid;
  await invoice.save();
  if (amount > invoice.remainingAmount) {
    return res.status(422).json({
      message: `You can't pay more than ${invoice.remainingAmount}`
    });
  }
  if (invoice.tottalPaid === invoice.amount) {
    invoice.status = "paid";
  } else if (invoice.tottalPaid > 0) {
    invoice.status = "partially_paid";
  }

  await invoice.save();

  const payment = new Payment({
    invoiceId: id,
    userId: req.user.userId,
    supplierId,
    clientId : req.user.userId,
    method,
    amount,
    paymentDate,
    note,
    invoiceDetails: invoice
  });

  await payment.save();

  return res.status(201).json({
    payment: payment,
    invoice: invoice
    });
}

async function getInvoiceDetailsService(req, res) {
    const {id} = req.params
    const invoice = await Invoice.findById(id);
    if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
    }
    const payments = await Payment.find({invoiceId: id}).select("method paymentDate amount").sort({ paymentDate: -1 })
    return {
        invoice: {
            id: invoice._id,
            amount: invoice.amount,
            totalPaid: invoice.tottalPaid,
            remainingAmount: invoice.amount - invoice.tottalPaid,
            status: invoice.status
        },
        payments: payments
    };
}

module.exports = { createPaymentService, getInvoiceDetailsService };