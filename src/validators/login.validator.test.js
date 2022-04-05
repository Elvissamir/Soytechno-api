const loginValidator = require('./login.validator')
const validUserData = require('../utils/test-utils/validUserData')
const rules = require('../rules/userRules')

describe('Login Validator', () => {
    let loginData

    beforeEach(() => {
        loginData = {
            email: validUserData.email,
            password: validUserData.password
        }
    })

    it('Should return the validated data', () => {
        const result = loginValidator(loginData)

        expect(result).not.toHaveProperty('error')
        expect(result).toHaveProperty('value')
        expect(result.value).toHaveProperty('email')
        expect(result.value).toHaveProperty('password')
    })

    it('Should validate the email is required', () => {
        delete loginData.email
        const result = loginValidator(loginData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('email')).toBe(true)
        expect(result.error.details[0].message.includes('required')).toBe(true)
    })

    it('Should validate the email is a string', () => {
        loginData.email = 0
        const result = loginValidator(loginData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('email')).toBe(true)
        expect(result.error.details[0].message.includes('string')).toBe(true)
    })

    it('Should validate the email has a valid format', () => {
        loginData.email = 'notAnEmail'
        const result = loginValidator(loginData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('email')).toBe(true)
        expect(result.error.details[0].message.includes('valid')).toBe(true)
    })

    it('Should validate the email has less than or equal than the max allowed chars', () => {
        loginData.email = new Array(rules.emailMaxChars + 2).join('2')
        
        const result = loginValidator(loginData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('email')).toBe(true)
        expect(result.error.details[0].message.includes('less than')).toBe(true)
    })

    it('Should validate the password is required', () => {
        delete loginData.password
        
        const result = loginValidator(loginData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('password')).toBe(true)
        expect(result.error.details[0].message.includes('required')).toBe(true)
    })

    it('Should validate the password is a string', () => {
        loginData.password = 0
        
        const result = loginValidator(loginData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('password')).toBe(true)
        expect(result.error.details[0].message.includes('string')).toBe(true)
    })

    it('Should validate the password has more or equal chars than the min required', () => {
        loginData.password = 'a'
        
        const result = loginValidator(loginData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('password')).toBe(true)
        expect(result.error.details[0].message.includes('at least')).toBe(true)
    })

    it('Should validate the password has less or equal chars than the max required', () => {
        loginData.password = 'a'
        
        const result = loginValidator(loginData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes('password')).toBe(true)
        expect(result.error.details[0].message.includes('at least')).toBe(true)
    })
})