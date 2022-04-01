const registerUserInteractor = require('./registerUser')

const UserMongo = require('../dataSources/User')
const registerUser = registerUserInteractor(UserMongo)

module.exports = {
    registerUser
}