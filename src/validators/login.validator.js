const Joi = require("joi")

const loginSchema = Joi.object({
    email: '',
    password: ''
})

module.exports = function (login) {
    return loginSchema.validate(login)
}