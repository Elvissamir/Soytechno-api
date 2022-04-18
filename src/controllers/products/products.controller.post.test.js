const app = require('../../app')
const request = require('supertest')
const { productEndpoint } = require('../../endpoints/index')
const Product = require('../../dataSources/Product')
const dbTestHandler = require('../../utils/test-utils/dbTestHandler')

describe('Products Controller / POST', () => {
    const sendPostRequest = (data) => {
        return request(app).post(productEndpoint).send(data)
    }

    beforeEach(async () => {
        await dbTestHandler.startAndConnect()
    })

    afterEach(async () => {
        await dbTestHandler.disconnectAndStop()
    })

    it('Should create a new post with given data', async () => {
        const productsCountBefore = await Product.count()
        expect(productsCountBefore).toBe(0)

        const productData = {}
        const response = await sendPostRequest(productData)

        expect(response.status).toBe(200)
        
        const productsCountAfter = await Product.count()
        expect(productsCountAfter).toBe(1)

        expect(response.body).toHaveProperty('_id')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('price')
        expect(response.body).toHaveProperty('inStock')
        expect(response.body).toHaveProperty('categories')
        expect(response.body).toHaveProperty('description')
        expect(response.body).toHaveProperty('discount')
        expect(response.body).toHaveProperty('rating')
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