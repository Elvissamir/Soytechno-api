const app = require('../app')
const request = require('supertest')
const dbTestHandler = require('../utils/test-utils/dbTestHandler')
const { userRoute } = require('../endpoints')
const User = require('../dataSources/User')

describe('Users Controller', () => {    

    beforeEach(async () => {
        dbTestHandler.startAndConnect()
    })

    afterEach(async () => {
        dbTestHandler.disconnectAndStop()
    })

    describe('Post / - Register User', () => {
        it('Should register a user', async () => {
            const userData = {
                first_name: 'fname',
                last_name: 'lname',
                ci: '25456563',
                email: 'user@mail.com',
                password: 'password'
            }
            
            const userCountBefore = await User.count()
            expect(userCountBefore).toBe(0) 

            const response = await request(app).post(userRoute).send(userData)

            const usersCountAfter = await User.count()
            expect(usersCountAfter).toBe(1)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('first_name', userData.first_name)
            expect(response.body).toHaveProperty('last_name', userData.last_name)
            expect(response.body).toHaveProperty('email', userData.email)
            expect(response.body).not.toHaveProperty('ci')
            expect(response.body).not.toHaveProperty('password')
        })
    })
})