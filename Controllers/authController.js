const {registerService, loginService} = require("../Services/authService")

async function registerController(req, res) {
  const [user, token] = await registerService(req,res);
  user.password = undefined;// select("-password")
  return res.status(201).json({"Message" : "User created !", user, token})
  // return res.status(201).json({"Message" : "User created !", withoutPswrd})
}

async function loginController(req, res) {
  const [user, token] = await loginService(req, res)
  user.password = undefined
  return res.status(200).json({success : "User logged in successfully !", user, token})
}
module.exports = {registerController, loginController}