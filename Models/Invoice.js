const mongoose = require("mongoose")

const invoiceSchema = new mongoose.Schema({
    supplierId : {
        type : String,
        required : true
    }, amount : {
        type : Number,
        required : true
    }, dueDate : {
        type : Date,
        required : true        
    }, description : {
        type : String
    },status : {
        type : String,
        enum : ["unpaid", "partially_paid", "paid"],
        default : "unpaid"
    },clientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
}, {
    timestamps : true
})
const Invoice = mongoose.model("invoice", invoiceSchema)
module.exports = Invoice