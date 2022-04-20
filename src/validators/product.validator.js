const rules = require('../rules/productRules')
const Joi = require('joi')

const schema = Joi.object({
    title: Joi.string()
        .min(rules.titleMinChars)
        .max(rules.titleMaxChars)
        .required()
        .label('Title'),
    price: Joi.number()
        .required()
        .label('Price'),
    inStock: Joi.number()
        .required()
        .label('Stock'),
    description: Joi.string()
        .min(rules.descriptionMinChars)
        .max(rules.descriptionMaxChars)
        .required()
        .label('Description'),
    discount: Joi.number()
        .min(rules.discountMin)
        .max(rules.discountMax)
        .label('Discount'),
    rating: Joi.any()
})

module.exports = function (productData) {
    const validation = schema.validate(productData)

    return validation
}