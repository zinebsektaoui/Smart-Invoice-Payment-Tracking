const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  method: {
    type: String,
    required: true,
    enum : ["cash", "check", "bank_transfer"],
  },
  note: {
    type: String
  },
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
}, {
    timestamps: true,
});
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
