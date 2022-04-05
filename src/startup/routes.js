const { userEndpoint, testEndpoint, loginEndpoint } = require('../endpoints/index')
const userController = require('../controllers/users/users.controller')
const loginController = require('../controllers/login/login.controller')
const testController = require('../controllers/state')
const errorController = require('../middleware/error')

module.exports = function (app) {
    if (process.env.APP_ENV != 'production')
        app.use(testEndpoint, testController)
    
    app.use(userEndpoint, userController)
    app.use(loginEndpoint, loginController)
    app.use(errorController)
}