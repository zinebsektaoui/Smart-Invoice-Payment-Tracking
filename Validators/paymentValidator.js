const Joi = require("joi")

const paymentValidator = Joi.object({
    amount: Joi.number().positive().required().messages({
        'number.base': 'Le montant doit être un nombre',
        'number.positive': 'Le montant doit être un nombre positif',
        'any.required': 'Le montant est requis'
    }),
    paymentDate: Joi.date().max('now').required().messages({
        'date.base': 'La date de paiement doit être une date valide',
        'date.max': 'La date de paiement ne doit pas être dans le futur',
        'any.required': 'La date de paiement est requise'
    }),
    method: Joi.string().valid('card', 'bank_transfer', 'cash').required().messages({
        'any.only': 'Le mode de paiement doit être l\'un des suivants: card, bank_transfer, cash',
        'any.required': 'Le mode de paiement est requis'
    }),
    note: Joi.string().max(200).optional().messages({
        'string.max': 'La note ne doit pas dépasser 200 caractères'
    }),
    supplierId: Joi.string().required().messages({
            'any.required': 'Supplier id is required'
    }),
});

module.exports = paymentValidator