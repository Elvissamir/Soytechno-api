const Joi = require("joi")
const rules = require('../rules/userRules')

const loginSchema = Joi.object({
    email: Joi.string()
        .max(rules.emailMaxChars)
        .email()
        .required()
        .label('email'),
    password: Joi.string()
        .required()
        .label('password')
})

module.exports = function (login) {
    const validation = loginSchema.validate(login)

    if (validation.error)
        return validation
    
    return validation

    // const validPasswordComplexity = validatePasswordComplexity(userData.password)
    
    // if (validPasswordComplexity.error)
    //  validation.error = validPasswordComplexity.error
}