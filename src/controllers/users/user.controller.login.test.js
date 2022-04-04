const dbTestHandler = require('../../utils/test-utils/dbTestHandler')
const { userEndpoint } = require('../../endpoints')
const request = require('supertest')
const app = require('../../app')
const User = require('../../dataSources/User')

describe('POST /login - Login User', () => {
    const userData = {
        first_name: 'fname',
        last_name: 'lname',
        ci: '24354657',
        email: 'user@mail.com',
        password: 'Apassword1_'
    }

    let data
    let token
    let user

    const sendPostRequest = (endpoint, data) => {
        return request(app).post(`${endpoint}/login`).send(data)
    }

    beforeEach(async () => {
        await dbTestHandler.startAndConnect()

        data = { email: userData.email, password: userData.password }

        userData.password = await User.hashPassword(userData.password)
        user = await User.create({
            first_name: userData.first_name,
            last_name: userData.last_name, 
            ci: userData.ci, 
            email: userData.email, 
            password: userData.password
        })

        token = user.generateAuthToken()
    })

    afterEach(async () => {
        await dbTestHandler.disconnectAndStop()
    })

    it('Should send the auth token', async () => {
        const response = await sendPostRequest(userEndpoint, data)

        expect(response.status).toBe(200)
        expect(response.body).toBe(token)
    })
})