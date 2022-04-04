const rules = require('../rules/userRules')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const addErrorMessage = require('../utils/addErrorMessage')

const passwordOptions = {
    min: rules.passwordMinChars,
    max: rules.passwordMaxChars,
    lowerCase: rules.passwordLowerCase,
    upperCase: rules.passwordUpperCase,
    numeric: rules.passwordNumeric,
    symbol: rules.passwordSymbol,
    requirementCount: 5
}

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
        .label('CI'),

    email: Joi.string()
        .max(rules.emailMaxChars)
        .email()
        .required()
        .label('Email'),
    
    password: Joi
        .string()
        .required()
        .label('Password')
})

module.exports = function (userData) {
    const validation = schema.validate(userData)
    
    if (validation.error)
        return validation

    const validPasswordComplexity = passwordComplexity(passwordOptions, 'Password').validate(validation.value.password)
    
    if (validPasswordComplexity.error)
        addErrorMessage(validation, validPasswordComplexity.error.details[0].message)

    return validation
}