const { testRoute, userRoute } = require('../endpoints/index')
const userController = require('../controllers/users')
const testController = require('../controllers/state')
const errorController = require('../middleware/error')

module.exports = function (app) {
    if (process.env.APP_ENV != 'production')
        app.use(testRoute, testController)
    
    app.use(userRoute, userController)
    app.use(errorController)
}