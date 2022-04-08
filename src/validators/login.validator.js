const Joi = require("joi")
const rules = require('../rules/userRules')
const validatePasswordComplexity = require('./passwordComplexity.validator')

const loginSchema = Joi.object({
    email: Joi.string()
        .max(rules.emailMaxChars)
        .email()
        .required()
        .label('Email'),
    password: Joi.string()
        .required()
        .label('Password')
})

module.exports = function (login) {
    const validation = loginSchema.validate(login)

    if (validation.error)
        return validation
    
    const validPasswordComplexity = validatePasswordComplexity(login.password)
        
    if (validPasswordComplexity.error)
        validation.error = validPasswordComplexity.error
    return validation
}