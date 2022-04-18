const validateProduct = require('../validators/product.validator')

const createProduct = (ProductDataSource) => async (data) => {
    // validate product data from req.body
    const valid = validateProduct(data)

    // if invalid 
    // return 400 and validation error
    // if valid create product
    // return product
}

module.exports = createProduct