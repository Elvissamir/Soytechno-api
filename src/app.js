const express = require('express')
const routes = require('./startup/routes')
const middleware = require('./startup/middleware')
require('express-async-errors')

const app = express()

middleware(app)
routes(app)

module.exports = app