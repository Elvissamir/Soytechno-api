const validateToken = require('../validators/authToken.validator')

module.exports = function (req, res, next) {
    // if no headers return error

    // if no x-auth-token header return error

    const validToken = validateToken(req.headers['x-auth-token'])

    if (validToken)
        next()
}