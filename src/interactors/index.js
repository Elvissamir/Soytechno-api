const registerUserInteractor = require('./registerUser')
const validateUserInteractor = require('./validateUser')

const UserMongo = require('../dataSources/User')

const validateUser = validateUserInteractor(UserMongo)
const registerUser = registerUserInteractor(UserMongo)

module.exports = {
    registerUser,
    validateUser
}