const rules = require('../rules/productRules')
const Joi = require('joi')

const schema = Joi.object({
    title: Joi.string().max(rules.titleMaxChars).required().label('Title'),
    price: Joi.any(),
    inStock: Joi.any(),
    description: Joi.any(),
    discount: Joi.any(),
    rating: Joi.any()
})

module.exports = function (productData) {
    const validation = schema.validate(productData)

    console.log(validation)

    return validation
}