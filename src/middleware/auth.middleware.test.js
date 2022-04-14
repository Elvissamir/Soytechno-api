const validUser = require('../utils/test-utils/validUserData')
const User = require('../dataSources/User')
const authMiddleware = require('./auth')

describe('Auth Middleware', () => {
    let user
    let token
    let req
    let res
    let next = jest.fn()
    let mockSendfn
    let mockStatusfn

    beforeEach(async () => {
        const userData = validUser
        userData['password'] = await User.hashPassword(validUser.password)

        user = new User(userData)
        token = user.generateAuthToken()

        req = {
            headers: {
                'x-auth-token': token,
                'accsess-control-expose-headers': 'x-auth-token'
            }
        }

        res = {}

        mockSendfn = jest.fn()
        res['send'] = mockSendfn

        mockStatusfn = jest.fn()
        res['status'] = mockStatusfn

        next.mockClear()
        mockSendfn.mockClear()
        mockStatusfn.mockClear()
    })

    it('Should allow the request if the token is valid', () => {
        authMiddleware(req, res, next)

        expect(next).toBeCalledTimes(1)
    })

    it('Should return 400 if the request has no headers', () => {
        // delete req.headers
        const response = authMiddleware(req, res, next)

        expect(response.code).toBe(400)
        expect(response.data).toBe('Access denied. No token provided')
        expect(mockSendfn).toBeCalledTimes(1)
        expect(mockStatusfn).toBeCalledTimes(1)
    })
})