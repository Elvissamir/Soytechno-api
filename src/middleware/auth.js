const validateToken = require('../validators/authToken.validator')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')

    if (!token)
        return res.status(401).send('Access denied. No token provided')

    const validToken = validateToken(token)
    
    if (!validToken)
        return res.status(400).send('Invalid token')

    next()
}