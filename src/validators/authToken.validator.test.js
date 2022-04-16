const jwt = require('jsonwebtoken')
const { validateToken } = require('./authToken.validator')

describe('Auth Token Validator', () => {
    let token
    let payload

    beforeEach(async () => {
        payload = 'authToken'
        token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
    })

    it('Should return the decoded data if token is valid', () => {
        const result = validateToken(token)

        expect(result).toBe(payload)
    })

    it('Should return false if token is invalid', () => {
        token = jwt.sign(payload, 'notTheSecretKey')
        const result = validateToken(token)

        expect(result).toBe(false)
    })
})