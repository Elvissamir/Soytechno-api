const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserDataSource = require('../dataSources/User')

describe('User DataSource', () => {
    it('Should hash the password with hashPassword static method', async () => {
        const password = 'password'

        const hashedPassword = await UserDataSource.hashPassword(password)

        const result = await bcrypt.compare(password, hashedPassword)
        expect(result).toBe(true)
    })

    it('Should generate a valid jwt token with generateAuthToken method', async () => {
        const user = new UserDataSource( { 
            first_name: 'fname',
            last_name: 'lname',
            email: 'user@mail.com',
        }
        )
        const authToken = user.generateAuthToken()

        const secretKey = process.env.JWT_SECRET_KEY
        
        const validToken = jwt.sign({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email            
        }, secretKey)

        expect(authToken).toBe(validToken)
    })
})