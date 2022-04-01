const testController = require('../controllers/state')
const errorController = require('../middleware/error')

module.exports = function (app) {
    if (!process.env.APP_ENV === 'production')
        app.use('/api/test', testController)

    console.log(process.env.APP_ENV)
    app.use(errorController)
}