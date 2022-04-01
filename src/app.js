const express = require('express')
const routes = require('./startup/routes')
const middleware = require('./startup/middleware')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

middleware(app)
routes(app)

module.exports = app