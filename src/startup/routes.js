const testController = require('../controllers/state')
const errorController = require('../middleware/error')

module.exports = function (app) {
    app.use('/api/test', testController)
    app.use(errorController)
}