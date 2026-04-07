const { required } = require("joi")
const mongoose = require("mongoose")

const supplierSchema = new mongoose.Schema({
    name : {
        type : String,
        required:true,
        min:2
    },
    phone : {
        type : Number,
    },
    email : {
        type : String,
    },
    address : {
        type : String,
    },
    clientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

const Supplier = mongoose.model("Supplier", supplierSchema)
module.exports = Supplier