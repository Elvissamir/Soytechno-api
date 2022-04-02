const mongoose = require('mongoose')
const userResource = require('./userResource')

describe('User Resource', () => {
    it('Should select the specified fields', () => {

        const data = {
            first_name: 'fname',
            last_name: 'lname',
            password: 'password',
            email: 'email',
            ci: '25543456',
            _id: mongoose.Types.ObjectId,
            _v: 0
        }

        const result = userResource(data)

        expect(result).toHaveProperty('_id')
        expect(result).toHaveProperty('first_name')
        expect(result).toHaveProperty('last_name')
        expect(result).toHaveProperty('email')
        expect(result).not.toHaveProperty('password')
        expect(result).not.toHaveProperty('ci')
    })
})