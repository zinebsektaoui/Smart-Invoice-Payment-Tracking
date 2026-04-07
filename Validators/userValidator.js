const Joi = require("joi")

const userValidator = Joi.object({
    name: Joi.string().min(2).required().messages({
        'string.min': 'Le nom doit contenir au moins 3 caractères',
        'string.max': 'Le nom ne peut pas dépasser 20 caractères',
        'any.required': 'Le nom est requis'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Format d\'email invalide',
        'any.required': 'L\'email est requis'
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
        'any.required': 'Le mot de passe est requis'
    }),
  confirmPassword:Joi.ref("password"),
    role: Joi.string().valid("Admin", "Client").default('Client'),

});

module.exports = userValidator