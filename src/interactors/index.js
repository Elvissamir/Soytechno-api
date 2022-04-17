const registerUserInteractor = require('./registerUser')
const validateUserInteractor = require('./validateUser')
const validateLoginInteractor = require('./validateLogin')
const createProductInterator = require('./createProduct')

const UserMongo = require('../dataSources/User')
const ProductMongo = require('../dataSources/Product')

const validateLogin = validateLoginInteractor(UserMongo)
const validateUser = validateUserInteractor(UserMongo)
const registerUser = registerUserInteractor(UserMongo)
const createProduct = createProductInterator(ProductMongo)

module.exports = {
    registerUser,
    createProduct,
    validateUser,
    validateLogin,
}