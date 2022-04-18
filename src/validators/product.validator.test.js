const productValidator = require('./product.validator')

describe('Product Validator', () => {

    it ('Should validate the title is required', () => {
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Title')).toBe(true)
        expect(result.error.details[0].message.includes('required')).toBe(true)
    })
})