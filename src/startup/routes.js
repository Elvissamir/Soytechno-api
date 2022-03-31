const testController = require('../controllers/testController')

module.exports = function (app) {
    app.use('/api/test', testController)
}