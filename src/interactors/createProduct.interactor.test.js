const { createProduct } = require('./index')
const validProductData = require('../utils/test-utils/validMockData/validProductData')

describe('Create Product Interactor', () => {
    let productData = validProductData

    it('Creates a new product and returns it if the given data is valid', async () => {
        const result = await createProduct(productData)

        expect(result).toHaveProperty('_id')
        expect(result).toHaveProperty('title')
        expect(result).toHaveProperty('price')
        expect(result).toHaveProperty('inStock')
        expect(result).toHaveProperty('description')
        expect(result).toHaveProperty('discount')
        expect(result).toHaveProperty('rating')
    })
})