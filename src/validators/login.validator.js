const Joi = require("joi")

const loginSchema = Joi.object({
    email: Joi.required().label('email'),
    password: Joi.any().label('password')
})

module.exports = function (login) {
    return loginSchema.validate(login)
}