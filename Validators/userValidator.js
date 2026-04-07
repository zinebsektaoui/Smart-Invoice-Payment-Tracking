const joi = require("joi")

const createUser = joi.object({
  name: joi.string().required().min(2),
  email:joi.string().email().required(),
  password:joi.string().required().min(8),
  confirmPassword:joi.ref("password")
});

module.exports = {createUser}