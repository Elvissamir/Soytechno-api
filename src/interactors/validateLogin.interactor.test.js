const UserDataSource = require('../dataSources/User')
const { validateLogin } = require('./index')
const validUserData = require('../utils/test-utils/validUserData')
const User = require('../dataSources/User')

describe('Validate Login Interactor', () => {
    let loginData
    let user

    beforeEach(async () => {
        loginData = {
            email: validUserData.email,
            password: validUserData.password
        }

        const userData = validUserData
        userData['password'] = await User.hashPassword(validUserData.password)

        user = new User(userData)
    })

    it('Should return the result of the data validation', async () => {
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

    it('Should return an error if the password is incorrect', async () => {
        jest.spyOn(UserDataSource, 'findOne').mockReturnValue(Promise.resolve(user))

        loginData.password = 'NotTheUserPassword1_'
        const result = await validateLogin(loginData)

        expect(result).toHaveProperty('error')
        expect(result).not.toHaveProperty('token')
        expect(result.error.details[0].message.includes('Invalid email or password')).toBe(true)
    })
})