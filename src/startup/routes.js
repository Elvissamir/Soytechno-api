const { testRoute } = require('../endpoints/index')
const testController = require('../controllers/state')
const errorController = require('../middleware/error')

module.exports = function (app) {
    if (process.env.APP_ENV != 'production')
        app.use(testRoute, testController)
    app.use(errorController)
}