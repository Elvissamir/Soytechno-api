const validUser = require('../utils/test-utils/validUserData')
const User = require('../dataSources/User')
const authMiddleware = require('./auth')

describe('Auth Middleware', () => {
    let user
    let userData
    let token
    let req
    let res
    let next = jest.fn()
    let mockSendfn = jest.fn(function () {return this})
    let mockStatusfn = jest.fn(function () {return this})

    beforeEach(async () => {
        userData = validUser
        userData['password'] = await User.hashPassword(validUser.password)

        user = new User(userData)
        token = user.generateAuthToken()

        req = {
            headers: {
                'x-auth-token': token,
                'accsess-control-expose-headers': 'x-auth-token'
            },

            header(name) {
                return this.headers[name]
            }
        }

        res = {}
        res['send'] = mockSendfn
        res['status'] = mockStatusfn

        next.mockClear()
        mockSendfn.mockClear()
        mockStatusfn.mockClear()
    })

    it('Should allow the request if the jwt token is valid', () => {
        authMiddleware(req, res, next)

        expect(next).toBeCalledTimes(1)
    })

    it('Should add the decoded jwt token data to the user prop of the request', () => {
        authMiddleware(req, res, next)

        expect(req).toHaveProperty('user')
        expect(req.user).toHaveProperty('_id')
        expect(req.user).toHaveProperty('first_name')
        expect(req.user).toHaveProperty('last_name')
        expect(req.user).toHaveProperty('email')
    })

    it('Should return 401 if the jwt token is not present in headers', () => {
        delete req.headers['x-auth-token']
        
        authMiddleware(req, res, next)

        expect(mockSendfn).toBeCalledTimes(1)
        expect(mockSendfn).toBeCalledWith('Access denied. No token provided')
        expect(mockStatusfn).toBeCalledTimes(1)
        expect(mockStatusfn).toBeCalledWith(401)
    })

    it('Should return 400 if the jwt token is invalid', () => {
        req.headers['x-auth-token'] = 'nonValidToken'

        authMiddleware(req, res, next)

        expect(mockSendfn).toBeCalledTimes(1)
        expect(mockSendfn).toBeCalledWith('Invalid token')
        expect(mockStatusfn).toBeCalledTimes(1)
        expect(mockStatusfn).toBeCalledWith(400)
    })
})