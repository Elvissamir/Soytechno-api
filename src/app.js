const express = require('express')
const routes = require('./startup/routes')
const middleware = require('./startup/middleware')
const app = express()

middleware(app)
routes(app)

module.exports = app