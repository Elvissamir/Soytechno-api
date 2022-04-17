const app = require('../../app')
const request = require('supertest')
const dbTestHandler = require('../../utils/test-utils/dbTestHandler')

describe('Products Controller / POST', () => {

    const sendPostRequest = () => {
        return request(app).post()
    }

    it('Should create a new post with given data', async () => {
        // expect the database has 0 products
        // send post request with data
        // expect the database has 1 product
        // expect response to be 200
        // expect response to have the created product
    })

    it('Should return 401 if the user is not authenticated', async () => {
        // send post request without auth token
        // expect status 401
        // expect error message Access denied. No token provided
    })

    it('should return 400 if the token is invalid', async () => {
        // send post request with invalid token
        // expect status 400
        // expect error message Invalid token
    })

    it('Should return error status code if the user is not authorized', async () => {
        // send post request with token from non admin user
        // expect status 4XX
        // expect error message FORBIDDEN
    })

    it('Should return 400 if the provided data is invalid', async () => {
        // send post request with invalid data
        // expect status 400 
        // expect validation error message
    })
})