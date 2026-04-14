// const { required } = require("joi")
const mongoose = require("mongoose")

const supplierSchema = new mongoose.Schema({
    name : {
        type : String,
        required:true,
        min:2
    },
    phone : {
        type : String,
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
},{
    timestamps : true
})

const Supplier = mongoose.model("Supplier", supplierSchema)
module.exports = Supplier