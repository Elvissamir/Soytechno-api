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
        expect(result.error.details[0].message.includes("First name")).toBe(true)
        expect(result.error.details[0].message.includes('required')).toBe(true)
    })

    it('Should validate the first name is a string', () => {
        userData.first_name = 0

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("First name")).toBe(true)
        expect(result.error.details[0].message.includes('string')).toBe(true)
    })

    it('Should validate the first name has less or equal than the max allowed chars', () => {
        userData.first_name = new Array(rules.fnameMaxChars + 2).join('a')

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("First name")).toBe(true)
        expect(result.error.details[0].message.includes('less than')).toBe(true)
    })

    it('Should validate the first name has more than the min allowed chars', () => {
        userData.first_name = new Array(rules.fnameMinChars).join('a')

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("First name")).toBe(true)
        expect(result.error.details[0].message.includes("at least")).toBe(true)
    })
})