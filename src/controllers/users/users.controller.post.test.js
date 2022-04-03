const app = require('../../app')
const bcrypt = require('bcrypt')
const request = require('supertest')
const dbTestHandler = require('../../utils/test-utils/dbTestHandler')
const { userEndpoint } = require('../../endpoints')
const User = require('../../dataSources/User')

describe('Post / - Register User', () => {
    let userData

    const sendPostRequest = (endpoint, data) => {
        return request(app).post(endpoint).send(data)
    }

    beforeEach(async () => {
        userData = {
            first_name: 'fname',
            last_name: 'lname',
            ci: '25456563',
            email: 'user@mail.com',
            password: 'password'
        }

        await dbTestHandler.startAndConnect()
    })

    afterEach(async () => {
        await dbTestHandler.disconnectAndStop()
    })

    it('Should register a user and return the created user', async () => {
        const userCountBefore = await User.count()
        expect(userCountBefore).toBe(0) 

        const response = await sendPostRequest(userEndpoint, userData)

        const usersCountAfter = await User.count()
        expect(usersCountAfter).toBe(1)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('first_name', userData.first_name)
        expect(response.body).toHaveProperty('last_name', userData.last_name)
        expect(response.body).toHaveProperty('email', userData.email)
        expect(response.body).not.toHaveProperty('ci')
        expect(response.body).not.toHaveProperty('password')
    })

    it('Should hash the password before saving the data', async () => {
        await sendPostRequest(userEndpoint, userData)

        const userInDB = await User.findOne({ first_name: userData.first_name })
        
        const result = await bcrypt.compare(userData.password, userInDB.password)
        expect(result).toBe(true)    
    })

    it('Should add the auth token to the response headers', async () => {
        const response = await sendPostRequest(userEndpoint, userData)

        const user = await User.findOne({ first_name: userData.first_name })
        const token = user.generateAuthToken() 

        expect(response.header['x-auth-token']).toBeDefined()
        expect(response.header['x-auth-token']).toBe(token)
        expect(response.header['access-control-expose-headers']).toBeDefined()
        expect(response.header['access-control-expose-headers']).toBe('x-auth-token')
    })

    it('Should ', async () => {
        
    })
})