const UserDataSource = require('../dataSources/User')
const { validateLogin } = require('./index')

describe('Validate Login Interactor', () => {

    const userData = 

    it('Should return the result of the data validation', async () => {
        const user = new UserDataSource()

        const validToken = UserDataSource

        const result = await validateLogin()

        // expect not to have an error property
        expect(result).not.toHaveProperty('error')

        // expect an object with a token property
        expect(result).toHaveProperty('token')

        // expect the token to be valid
        expect(result.token).toBe(validToken)
    })
})