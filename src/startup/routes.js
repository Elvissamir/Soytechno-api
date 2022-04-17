const { userEndpoint, testEndpoint, loginEndpoint, productEndpoint } = require('../endpoints/index')
const userController = require('../controllers/users/users.controller')
const loginController = require('../controllers/users/login.controller')
const productController = require('../controllers/products/products.controller')
const testController = require('../controllers/state')
const errorController = require('../middleware/error')

module.exports = function (app) {
    if (process.env.APP_ENV != 'production')
        app.use(testEndpoint, testController)
    
    app.use(userEndpoint, userController)
    app.use(loginEndpoint, loginController)
    app.use(productEndpoint, productController)
    app.use(errorController)
}