const express = require('express')
require('express-async-errors')
const routes = require('./startup/routes')
const middleware = require('./startup/middleware')


const app = express()

middleware(app)
routes(app)

module.exports = app