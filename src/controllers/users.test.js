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
        test('Guests can register', async () => {
            // having the new userData
            const userData = {
                first_name: 'fname',
                last_name: 'lname',
                ci: '25456563',
                email: 'user@mail.com',
                password: 'password'
            }
            
            // expect users count to be 0
            const userCountBefore = await User.count()
            expect(userCountBefore).toBe(0) 

            // send request to endpoint with userData
            const response = request(app).post(userRoute).send(userData)

            // expect users count to be 1
            const usersCountAfter = await User.count()

            // expect response data to be a user
            expect(usersCountAfter).toBe(1)

            // expect returned user has the same values as userData
            expect(response.data[0].first_name).toBe(userData.first_name)
        })
    })
})