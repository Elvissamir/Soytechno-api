const jwt = require('jsonwebtoken')
const { validateToken } = require('./index')

describe('Validate Token Interactor', () => {
    let token
    let payload

    beforeEach(async () => {
        payload = 'authToken'
        token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
    })

    it('Should return true if token is valid', () => {
        const result = validateToken(token)

        expect(result).toBe(true)
    })

    it('Should return false if token is invalid', () => {
        const result = validateToken(token)

        expect(result).toBe(false)
    })
})