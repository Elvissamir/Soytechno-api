const Joi = require("joi")
const rules = require('../rules/userRules')

const loginSchema = Joi.object({
    email: Joi.string()
        .max(rules.emailMaxChars)
        .email()
        .required()
        .label('email'),
    password: Joi.required().label('password')
})

module.exports = function (login) {
    return loginSchema.validate(login)
}