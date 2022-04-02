const { userEndpoint, testEndpoint } = require('../endpoints/index')
const userController = require('../controllers/users')
const testController = require('../controllers/state')
const errorController = require('../middleware/error')

module.exports = function (app) {
    if (process.env.APP_ENV != 'production')
        app.use(testEndpoint, testController)
    
    app.use(userEndpoint, userController)
    app.use(errorController)
}