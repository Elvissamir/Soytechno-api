const userRules = require('../rules/userRules')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    first_name: { 
        type: String, 
        minlength: userRules.fnameMinChars,
        maxlength: userRules.fnameMaxChars,
        required: true 
    },
    last_name: {
        type: String,
        minlength: userRules.lnameMinChars,
        maxlength: userRules.lnameMaxChars,
        required: true
    },
    ci: {
        type: String,
        minlength: userRules.ciMinChars,
        maxlength: userRules.ciMaxChars,
        required: true
    },
    email: {
        type: String,
        maxlength: userRules.emailMaxChars,
        required: true
    },
    password: {
        type: String,
        minlength: userRules.passwordMinChars,
        maxlength: userRules.passwordMaxChars,
        required: true
    }
})

const User = model('User', userSchema)

module.exports = User