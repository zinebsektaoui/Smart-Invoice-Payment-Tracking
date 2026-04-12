const User = require("../Models/User")

const getClients = async(req, res) => {
    const clients = await User.find({role : "Client"}) 
    return res.status(200).json(clients)
}

module.exports = {getClients}