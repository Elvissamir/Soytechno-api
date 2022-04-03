const router = require('express').Router()
const { registerUser } = require('../../interactors/index')
const validateUser = require('../../validators/user.validator')

router.post('/', async (req, res) => {

    const { error } = validateUser(req.body)
    if (error) {
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }
    
    const data = await registerUser(req.body)
    
    return res
            .header('x-auth-token', data.token)
            .header('access-control-expose-headers', 'x-auth-token')
            .send(data.user)
})

module.exports = router