const loginValidator = require('./login.validator')
const validUserData = require('../utils/test-utils/validUserData')

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
})