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

})