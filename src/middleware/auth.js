const { validateToken } = require('../interactors/index')

module.exports = function (req, res, next) {
    // if no headers return error

    // if no x-auth-token header return error

    // validate token
    const validToken = validateToken(req.headers['x-auth-token'])

    // if valid call next
    console.log(validToken)
    if (validToken)
        next()
}