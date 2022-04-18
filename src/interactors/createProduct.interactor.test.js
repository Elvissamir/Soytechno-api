const { createProduct } = require('./index')

describe('Create Product Interactor', () => {
    let productData = {
        title: 'title',
        price: 1,
        inStock: 100,
        description: 'A description',
        discount: 0.8,
        rating: 5
    }

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