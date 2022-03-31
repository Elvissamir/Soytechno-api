const express = require('express')
const routes = require('./startup/routes')
const middleware = require('./startup/middleware')
const app = express()

routes(app)
middleware(app)

module.exports = app