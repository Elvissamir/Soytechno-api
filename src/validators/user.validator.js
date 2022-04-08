const rules = require('../rules/userRules')
const Joi = require('joi')
const addErrorMessage = require('../utils/addErrorMessage')

const schema = Joi.object({
    first_name: Joi.string()
        .min(rules.fnameMinChars)
        .max(rules.fnameMaxChars)
        .required()
        .label('first name'),

    last_name: Joi.string()
        .min(rules.lnameMinChars)
        .max(rules.lnameMaxChars)
        .required()
        .label('last name'),
    
    ci: Joi.string()
        .min(rules.ciMinChars)
        .max(rules.ciMaxChars)
        .required()
        .label('ci'),

    email: Joi.string()
        .max(rules.emailMaxChars)
        .email()
        .required()
        .label('email'),
    
    password: Joi
        .string()
        .required()
        .label('password')
})

module.exports = function (userData) {
    const validation = schema.validate(userData)
    
    if (validation.error)
        return validation

    const validPasswordComplexity = validatePasswordComplexity(userData.password)
    
    if (validPasswordComplexity.error)
        validation.error = validPasswordComplexity.error

    return validation
}