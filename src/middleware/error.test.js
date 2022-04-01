const errorHandler = require('./error')

describe('Error Middleware', () => {
    let req 
    let res
    const next = jest.fn()
    
    beforeEach(() => {
        req = {
            params: {}, 
            body: {}
        }

        res = {
            data: null,
            code: null,
            status (status) {
                this.code = status
                return this
            },
            send (payload) {
                this.data = payload
            }
        }

        next.mockClear()
    })

    it('Returns the expected status and info message', () => {
        errorHandler(new Error, req, res, next)

        expect(res.code).toBeDefined()
        expect(res.code).toBe(500)

        expect(res.data).toBeDefined()
        expect(res.data).toBe('Something went wrong...')
    })
})