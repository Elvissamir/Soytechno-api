const rules = require('../rules/userRules')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const schema = Joi.object({
    first_name: Joi.string()
        .min(rules.fnameMinChars)
        .max(rules.fnameMaxChars)
        .required()
        .label('First name'),
        
    last_name: Joi.string()
        .min(rules.lnameMinChars)
        .max(rules.lnameMaxChars)
        .required()
        .label('Last name')
})

module.exports = function (userData) {
    return schema.validate(userData)
}