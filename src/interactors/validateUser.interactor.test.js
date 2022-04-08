const UserDatasource = require('../dataSources/User')
const { validateUser } = require('./index')

describe('Validate User Interactor', () => {
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

    it('Should return the result of the data validation', async () => {
        jest.spyOn(UserDatasource, 'findOne').mockReturnValue(Promise.resolve(null))

        const result = await validateUser({ data: userData, options: { checkEmail: true } })
    
        expect(result).not.toHaveProperty('error')
        expect(result.value).toHaveProperty('first_name', userData.first_name)
        expect(result.value).toHaveProperty('last_name', userData.last_name)
        expect(result.value).toHaveProperty('email', userData.email)
        expect(result.value).toHaveProperty('ci', userData.ci)
        expect(result.value).toHaveProperty('password', userData.password)
    })

    it('Should return the validation errors', async () => {
        userData.first_name = 'invalid first name'

        const result = await validateUser({ data: userData, options: { checkEmail: true } })
    
        expect(result.error).toBeDefined()
        expect(result.error.details[0].message.includes('First name')).toBe(true)
    })
    
    it('Should validate if the email is already in use', async () => {
        userData.email = 'alreadyInUse@mail.com'
    
        jest.spyOn(UserDatasource, 'findOne').mockReturnValue(Promise.resolve({ email: userData.email }))
    
        const result = await validateUser({ data: userData, options: { checkEmail: true } })
    
        expect(result).toHaveProperty('error')
        expect(result.error.details[0].message.includes("Email")).toBe(true)
        expect(result.error.details[0].message.includes('already exists')).toBe(true)
    })
})
