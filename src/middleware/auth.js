const validateToken = require('../validators/authToken.validator')

module.exports = function (req, res, next) {
    // if no headers return error
    if (!req.headers)
        return res.status(401).send('Access denied. No token provided')

    // if no x-auth-token header return error

    const validToken = validateToken(req.headers['x-auth-token'])

    if (validToken)
        next()
}