const registerUserInteractor = require('./registerUser')
const validateUserInteractor = require('./validateUser')
const validateLoginInteractor = require('./validateLogin')

const UserMongo = require('../dataSources/User')

const validateLogin = validateLoginInteractor(UserMongo)
const validateUser = validateUserInteractor(UserMongo)
const registerUser = registerUserInteractor(UserMongo)

module.exports = {
    registerUser,
    validateUser,
    validateLogin,
}