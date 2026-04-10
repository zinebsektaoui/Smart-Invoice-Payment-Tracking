const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,

      enum: ["unpaid", "partially_paid", "paid"],
      default: "unpaid",
    },
    // tottalPaid: {
    //     type: Number,
    //     default: 0,
    // },
    // remainingAmount: {
    //     type: Number,
    //     default: 0
    // },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);
const Invoice = mongoose.model("invoice", invoiceSchema);
module.exports = Invoice;
