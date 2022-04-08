const router = require('express').Router()
const { validateLogin } = require('../../interactors/index')

router.post('/', async (req, res) => {
    const { error, token } = await validateLogin(req.body)

    return res.send(token)
})

module.exports = router