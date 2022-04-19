const rules = require('../rules/productRules')
const productValidator = require('./product.validator')

describe('Product Validator', () => {
    let data

    beforeEach(() => {
        data = {
            title: 'The product tile',
            price: 1,
            inStock: 100,
            description: 'The description of the product',
            discount: 10,
            rating: 5
        }
    })
    
    it ('Should validate the title is required', () => {
        delete data.title
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Title')).toBe(true)
        expect(result.error.details[0].message.includes('required')).toBe(true) 
    })

    it ('Should validate the title is a string', () => {
        data['title'] = 100
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Title')).toBe(true)
        expect(result.error.details[0].message.includes('string')).toBe(true) 
    })

    it ('Should validate the title has less than or equal amount of chars to the max', () => {
        data['title'] = new Array(rules.titleMaxChars + 1).fill('a').join('')
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Title')).toBe(true)
        expect(result.error.details[0].message.includes('less than')).toBe(true) 
    })

    it ('Should validate the title has more than or equal amount of chars to the min', () => {
        data['title'] = new Array(rules.titleMinChars - 1).fill('a').join('')
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Title')).toBe(true)
        expect(result.error.details[0].message.includes('at least')).toBe(true) 
    }) 

    it ('Should validate the description is required', () => {
        delete data.description
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Description')).toBe(true)
        expect(result.error.details[0].message.includes('required')).toBe(true) 
    })

    it ('Should validate the description is a string', () => {
        data.description = 100
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Description')).toBe(true)
        expect(result.error.details[0].message.includes('string')).toBe(true) 
    })

    it ('Should validate the description has less than or equal amount of chars to the max', () => {
        data.description = new Array(rules.descriptionMaxChars + 1).fill('a').join('')
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Description')).toBe(true)
        expect(result.error.details[0].message.includes('less than')).toBe(true) 
    })

    it ('Should validate the description has at least the min amount of chars', () => {
        data.description = new Array(rules.descriptionMinChars - 1).fill('a').join('')
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Description')).toBe(true)
        expect(result.error.details[0].message.includes('at least')).toBe(true) 
    }) 

    it('Should validate the discount is a number', () => {
        data.discount = 'string'
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Discount')).toBe(true)
        expect(result.error.details[0].message.includes('number'))
    })

    it('Should validate the discount value is more than or equal to the min', () => {
        data.discount = -1
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Discount')).toBe(true)
        expect(result.error.details[0].message.includes('greater than'))
    })

    it('Should validate the discount value is less than or equal to the max', () => {
        data.discount = 1000
        const result = productValidator(data)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('Discount')).toBe(true)
        expect(result.error.details[0].message.includes('greater than'))
    })
})