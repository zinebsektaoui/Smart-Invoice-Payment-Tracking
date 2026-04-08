const Joi = require("joi")

const invoiceValidator = Joi.object({
    supplierId : Joi.string().required().messages({
        'any.required': 'Supplier id is required'
    }),
    amount : Joi.number().min(1).messages({
        'number.base': 'Amount must be a number',
        'number.min': 'Amount must be greater than 0'
    }),
    dueDate : Joi.date().messages({
        'date.base': 'Due date must be a valid date'
    }),
    description : Joi.string().min(5).messages({
        'string.base' : 'Description must be a string',
        'string.min' : 'Description must be at least 5 characters long'
    }),
    status : Joi.string().valid("unpaid", "paid", "partially_paid").messages({
        'string.base' : 'Status must be a string',
        'any.only' : 'Status must be one of the following: unpaid, paid, partially_paid'
    })
})

module.exports = invoiceValidator