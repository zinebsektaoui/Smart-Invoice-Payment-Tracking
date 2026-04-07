const Joi = require("joi")

const supplierValidator = Joi.object({
    name: Joi.string().min(2).required().messages({
        'string.min': 'Le nom doit contenir au moins 3 caractères',
        'any.required': 'Le nom est requis'
    }),
    phone: Joi.number().messages({
        'number.base': 'Le numéro de téléphone doit être un nombre'
    }),
    email: Joi.string().email().messages({
        'string.email': 'Format d\'email invalide'
    }),
    address: Joi.string().messages({
        'string.base': 'L\'adresse doit être une chaîne de caractères'
    })
});

module.exports = supplierValidator