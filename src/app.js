const express = require('express')
const app = express()
const routes = require('./startup/routes')
const middleware = require('./startup/middleware')
const dotenv = require('dotenv')
const errors = require('./startup/errors')
const connectToDatabase = require('./startup/database')

dotenv.config()
require('express-async-errors')

errors()
middleware(app)
routes(app)

if (!(process.env.DEV_STAGE === 'testing'))
    connectToDatabase()

module.exports = app