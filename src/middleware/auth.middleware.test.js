const validUser = require('../utils/test-utils/validUserData')
const User = require('../dataSources/User')
const userData = require('../utils/test-utils/validUserData')

describe('Auth Middleware', () => {
    let user
    let token
    let req
    let res
    let next = jest.fn()

    beforeEach(() => {
        userData = validUser
        userData['password'] = User.hashPassword(validUser.password)

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

    it('Should allow the request if the token is valid', async () => {
        
        authMiddleware(req, res, next)

        expect(next).toBeCalledTimes(1)
    })
})