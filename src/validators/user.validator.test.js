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
            password: 'Password1_',
        }
    })

    it('Should receive the data and return the validated data', () => {
        const result = validateUser(userData)
        const { first_name, last_name, ci, email, password } = userData

        expect(result).toBeDefined()
        expect(result.value).toHaveProperty('first_name', first_name)
        expect(result.value).toHaveProperty('last_name', last_name)
        expect(result.value).toHaveProperty('ci', ci)
        expect(result.value).toHaveProperty('email', email)
        expect(result.value).toHaveProperty('password', password)
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

    it('Should validate the last name is required', () => {
        delete userData.last_name

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Last name")).toBe(true)
        expect(result.error.details[0].message.includes('required')).toBe(true)
    })

    it('Should validate the last name is a string', () => {
        userData.last_name = 0

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Last name")).toBe(true)
        expect(result.error.details[0].message.includes('string')).toBe(true)
    })

    it('Should validate the last name has less or equal than the max allowed chars', () => {
        userData.last_name = new Array(rules.lnameMaxChars + 2).join('a')

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Last name")).toBe(true)
        expect(result.error.details[0].message.includes('less than')).toBe(true)
    })

    it('Should validate the last name has more than the min allowed chars', () => {
        userData.last_name = new Array(rules.fnameMinChars).join('a')

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Last name")).toBe(true)
        expect(result.error.details[0].message.includes("at least")).toBe(true)
    })

    it('Should validate the ci is required', () => {
        delete userData.ci

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("CI")).toBe(true)
        expect(result.error.details[0].message.includes('required')).toBe(true)
    })

    it('Should validate the ci is a string', () => {
        userData.ci = 0

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("CI")).toBe(true)
        expect(result.error.details[0].message.includes('string')).toBe(true)
    })

    it('Should validate the ci has less or equal than the max allowed chars', () => {
        userData.ci = new Array(rules.ciMaxChars + 2).join('2')

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("CI")).toBe(true)
        expect(result.error.details[0].message.includes('less than')).toBe(true)
    })

    it('Should validate the ci has more than the min allowed chars', () => {
        userData.ci = new Array(rules.ciMinChars).join('3')

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("CI")).toBe(true)
        expect(result.error.details[0].message.includes("at least")).toBe(true)
    })

    it('Should validate the email is required', () => {
        delete userData.email

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Email")).toBe(true)
        expect(result.error.details[0].message.includes('required')).toBe(true)
    })

    it('Should validate the email is a string', () => {
        userData.email = 0

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Email")).toBe(true)
        expect(result.error.details[0].message.includes('string')).toBe(true)
    })

    it('Should validate the email has less or equal than the max allowed chars', () => {
        userData.email = new Array(rules.emailMaxChars + 2).join('2')

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Email")).toBe(true)
        expect(result.error.details[0].message.includes('less than')).toBe(true)
    })

    it('Should validate the email format is valid', () => {
        userData.email = 'notanEmail'

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Email")).toBe(true)
        expect(result.error.details[0].message.includes('valid')).toBe(true)
    })

    it('Should validate the password is required', () => {
        delete userData.password

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Password")).toBe(true)
        expect(result.error.details[0].message.includes('required')).toBe(true)
    })

    it('Should validate the password is a string', () => {
        userData.password = 0

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Password")).toBe(true)
        expect(result.error.details[0].message.includes('string')).toBe(true)
    })

    it('Should validate the password has at least 1 uppercase character', () => {
        userData.password = 'password'

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Password")).toBe(true)
        expect(result.error.details[0].message.includes('upper-cased')).toBe(true)
    })

    it('Should validate the password has at least 1 number character', () => {
        userData.password = 'Password'

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Password")).toBe(true)
        expect(result.error.details[0].message.includes('number')).toBe(true)
    })

    it('Should validate the password has at least 1 symbol character', () => {
        userData.password = 'Password1'

        const result = validateUser(userData)

        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Password")).toBe(true)
        expect(result.error.details[0].message.includes('symbol')).toBe(true)
    })
})