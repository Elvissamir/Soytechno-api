const userRules = require('../rules/userRules')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    first_name: { 
        type: String, 
        minlength: userRules.fnameMinChars,
        maxlength: userRules.fnameMaxChars,
        trim: true,
        required: true 
    },
    last_name: {
        type: String,
        minlength: userRules.lnameMinChars,
        maxlength: userRules.lnameMaxChars,
        trim: true,
        required: true
    },
    ci: {
        type: String,
        minlength: userRules.ciMinChars,
        maxlength: userRules.ciMaxChars,
        trim: true,
        required: true
    },
    email: {
        type: String,
        maxlength: userRules.emailMaxChars,
        trim: true,
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

userSchema.methods.generateAuthToken = function () {
    const data = {
        _id: this._id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email
    }

    const secret = process.env.JWT_SECRET_KEY
    
    return jwt.sign(data, secret)
}

const User = model('User', userSchema)

module.exports = User