const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const schema = Joi.object({
    first_name: Joi.required().label('First name'),
})

module.exports = function (userData) {
    return schema.validate(userData)
}