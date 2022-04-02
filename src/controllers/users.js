const router = require('express').Router()
const { registerUser } = require('../interactors/index')

router.post('/', async (req, res) => {
    const data = await registerUser(req.body)

    return res
            .header('x-auth-token', data.token)
            .header('access-control-expose-headers', 'x-auth-token')
            .send(data.user)
})

module.exports = router