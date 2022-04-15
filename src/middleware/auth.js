const validateToken = require('../validators/authToken.validator')

module.exports = function (req, res, next) {
    if (!req.headers['x-auth-token'])
        return res.status(401).send('Access denied. No token provided')

    const validToken = validateToken(req.headers['x-auth-token'])

    // if invalid token return 400 invalid token

    next()
}