const jwt = require('jsonwebtoken')

const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return decoded
    }
    catch(ex) {
        return false
    }
}

module.exports = {
    validateToken
}
