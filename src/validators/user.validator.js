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
        .label('Last name'),
    
    ci: Joi.string()
        .min(rules.ciMinChars)
        .max(rules.ciMaxChars)
        .required()
        .label('CI')
})

module.exports = function (userData) {
    return schema.validate(userData)
}