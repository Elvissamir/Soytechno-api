const jwt = require('jsonwebtoken')
const validateAuthToken = require('../validators/authToken.validator')

module.exports = (UserDataSource) => (token) => {
    // validate jwt token
    // if invalid return false
    // if valid return true
    return true
}