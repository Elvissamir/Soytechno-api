const express = require('express')
const routes = require('./startup/routes')
const middleware = require('./startup/middleware')
const errors = require('./startup/errors')
require('express-async-errors')

const app = express()

errors()
middleware(app)
routes(app)

module.exports = app