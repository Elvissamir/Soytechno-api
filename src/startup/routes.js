const testController = require('../controllers/state')
const errorController = require('../middleware/error')

module.exports = function (app) {
    if (process.env.APP_ENV != 'production')
        app.use('/api/test', testController)
    app.use(errorController)
}