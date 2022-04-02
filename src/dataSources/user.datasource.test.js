const bcrypt = require('bcrypt')
const UserDataSource = require('../dataSources/User')

describe('User DataSource', () => {
    it('Should hash the password with hashPassword static method', async () => {
        const password = 'password'

        const hashedPassword = await UserDataSource.hashPassword(password)

        const result = await bcrypt.compare(password, hashedPassword)
        expect(result).toBe(true)
    })
})