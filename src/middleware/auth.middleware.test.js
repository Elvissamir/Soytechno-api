const validUser = require('../utils/test-utils/validUserData')
const User = require('../dataSources/User')
const authMiddleware = require('./auth')

describe('Auth Middleware', () => {
    let user
    let token
    let req
    let res
    let next = jest.fn()

    beforeEach(async () => {
        const userData = validUser
        userData['password'] = await User.hashPassword(validUser.password)

        user = new User(userData)
        token = user.generateAuthToken()

        req = {
            params: {}, 
            body: {},
            headers: {
                'x-auth-token': token,
                'accsess-control-expose-headers': 'x-auth-token'
            }
        }

        res = {
            data: null, 
            code: null, 

            status (status) {
                this.code = status
                return this.code
            },

            send (payload) {
                this.data = payload
            }
        }

        next.mockClear()
    })

    it('Should allow the request if the token is valid', () => {
        authMiddleware(req, res, next)

        expect(next).toBeCalledTimes(1)
    })

    it('Should return 400 if the request has no headers', () => {

    })
})