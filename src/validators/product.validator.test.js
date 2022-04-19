const productValidator = require('./product.validator')

describe('Product Validator', () => {
    const data = {
        title: 'title',
        price: 1,
        inStock: 100,
        description: 'A description',
        discount: 0.8,
        rating: 5
    }
    
    it ('Should validate the title is required', () => {
        delete data.title
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Title')).toBe(true)
        expect(result.error.details[0].message.includes('required')).toBe(true) 
    })
})