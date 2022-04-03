const rules = require('../rules/userRules')
const validateUser = require('../validators/user.validator')

describe('User Validator', () => {
    let userData

    beforeEach(() => {
        userData = {
            first_name: 'fname',
            last_name: 'lname',
            ci: '45546345',
            email: 'user@mail.com',
            password: 'password',
        }
    })

    it('Should receive the data and return the validated data', () => {
        const result = validateUser(userData)
        const { first_name, last_name, ci, email, password } = userData

        expect(result).toBeDefined()
        expect(result).toHaveProperty('first_name', first_name)
        expect(result).toHaveProperty('last_name', last_name)
        expect(result).toHaveProperty('ci', ci)
        expect(result).toHaveProperty('email', email)
        expect(result).toHaveProperty('password', password)
        expect(result).not.toHaveProperty('error')
    })

    it ('Should validate the first name is required', () => {
        delete userData.first_name

        const result = validateUser(userData)
        
        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("First name"))
        expect(result.error.details[0].message.includes("required"))
    })
})