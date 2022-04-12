const router = require('express').Router()
const { validateLogin } = require('../../interactors/index')

router.post('/', async (req, res) => {
    const { error, token } = await validateLogin(req.body)

    if (error)
        return res.status(400).send('Invalid email or password')

    return res.send(token)
})

module.exports = router