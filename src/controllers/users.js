const router = require('express').Router()
const { registerUser } = require('../interactors/index')

router.post('/', async (req, res) => {
    const user = await registerUser(req.body)

    return res.send(user)
})

module.exports = router