const userRules = require('../rules/userRules')
const bcrypt = require('bcrypt')
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
        required: true
    }
})

userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}

const User = model('User', userSchema)

module.exports = User