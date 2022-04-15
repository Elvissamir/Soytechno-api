const jwt = require('jsonwebtoken')

module.exports = function (token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return decoded
    }
    catch(ex) {
        return false
    }
}