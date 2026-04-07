const User = require("../Models/User")
const bcrpyt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function registerService(req, res) {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrpyt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });
  const token = jwt.sign(
      {userId : user._id, email : user.email, role : user.role},
      process.env.JWT_SECRET,
      {expiresIn : "7d"}
    )
  return [user, token]
}

async function loginService(req, res) {
  const {email, password} = req.body
  const user = await User.findOne({email : email})
  if(!user){
    return res.status(401).json({error : "User not found"})
  }
    const validatePswrd = await bcrpyt.compare(password, user.password)
    if(!validatePswrd){
      return res.status(401).josn({error : "Invalid crediantials !"})
    }
    const token = jwt.sign(
      {userId : user._id, email : user.email, role : user.role},
      process.env.JWT_SECRET,
      {expiresIn : "7d"}
    )
    res.setHeader("Authorization", `Bearer ${token}`);
    return [user, token]
}

async function myProfileService(req, res) {
  const user = await User.findById(req.user.userId).select("-password")
  if(!user){
    return res.status(404).json({error : "User not found"})
  }
  return user
}
module.exports = {registerService, loginService, myProfileService}