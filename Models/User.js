const mongoose = require("mongoose")
 
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },email : {
        type : String,
        required : true,
        unique : true
    },password : {
        type : String,
        required : true,
    },role : {
        type : String,
        enum : ["Client", "Admin"],
        default : "Client"
    }
},{
    timestamps : {
        updatedAt : false
   }
})
const User = mongoose.model("User", userSchema)
module.exports = User