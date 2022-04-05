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

        // expect not to have an error property
        expect(result).not.toHaveProperty('error')

        // expect an object with a token property
        expect(result).toHaveProperty('token')

        // expect the token to be valid
        expect(result.token).toBe(validToken)
    })
})