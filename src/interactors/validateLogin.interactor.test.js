const UserDataSource = require('../dataSources/User')
const { validateLogin } = require('./index')
const validUserData = require('../utils/test-utils/validUserData')

describe('Validate Login Interactor', () => {
    let loginData

    beforeEach(() => {
        loginData = {
            email: validUserData.email,
            password: validUserData.password
        }
    })

    it('Should return the result of the data validation', async () => {
        const user = new UserDataSource(validUserData)

        jest.spyOn(UserDataSource, 'findOne').mockReturnValue(Promise.resolve(user))

        const validToken = user.generateAuthToken()
        const result = await validateLogin(loginData)

        expect(result).not.toHaveProperty('error')
        expect(result).toHaveProperty('token')
        expect(result.token).toBe(validToken)
    })

    it('Should return the error if the email is invalid', async () => {
        jest.spyOn(UserDataSource, 'findOne').mockReturnValue(Promise.resolve(null))

        delete loginData.email
        const result = await validateLogin(loginData)

        expect(result).toHaveProperty('error')
        expect(result).not.toHaveProperty('token')
        expect(result.error.details[0].message.includes('Email')).toBe(true)
    })

    it('Should return the error if the password is invalid', async () => {
        jest.spyOn(UserDataSource, 'findOne').mockReturnValue(Promise.resolve(null))

        delete loginData.password
        const result = await validateLogin(loginData)

        expect(result).toHaveProperty('error')
        expect(result).not.toHaveProperty('token')
        expect(result.error.details[0].message.includes('Password')).toBe(true)
    })
})