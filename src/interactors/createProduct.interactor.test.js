const { createProduct } = require('./index')

describe('Create Product Interactor', () => {

    it('Creates a new product and returns it if the given data is valid', async () => {
        const result = createProduct(data)

        expect(result).toHaveProperty('_id')
        expect(result).toHaveProperty('title')
        expect(result).toHaveProperty('price')
        expect(result).toHaveProperty('inStock')
        expect(result).toHaveProperty('description')
        expect(result).toHaveProperty('discount')
        expect(result).toHaveProperty('rating')
    })
})