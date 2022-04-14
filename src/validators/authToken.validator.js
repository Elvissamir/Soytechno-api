const jwt = require('jsonwebtoken')

module.exports = function (token) {
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        return true
    }
    catch(ex) {
        return false
    }
}