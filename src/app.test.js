const request = require('supertest')
const app = require('./app')

describe('Server is Up', () => {
    it('Checks if the server is up and running', async () => {
        const response = await request(app).get('/api/test')

        expect(response.status).toBe(200)
        expect(response.text).toBe('Up and running...')
    })  
})