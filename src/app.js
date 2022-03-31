const express = require('express')
const routes = require('./startup/routes')
const app = express()

routes(app)

module.exports = app