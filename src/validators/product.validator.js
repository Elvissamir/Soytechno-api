const rules = require('../rules/productRules')
const Joi = require('joi')

const schema = Joi.object({
    title: Joi.string()
        .min(rules.titleMinChars)
        .max(rules.titleMaxChars)
        .required()
        .label('Title'),
    price: Joi.any(),
    inStock: Joi.any(),
    description: Joi.string()
        .min(rules.descriptionMinChars)
        .max(rules.descriptionMaxChars)
        .required()
        .label('Description'),
    discount: Joi.number().min(rules.discountMin).label('Discount'),
    rating: Joi.any()
})

module.exports = function (productData) {
    const validation = schema.validate(productData)

    return validation
}