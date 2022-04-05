const router = require('express').Router()
const { validateLogin } = require('../../interactors/index')

router.post('/', async (req, res) => {
    // return if invalid login
    const { error, token } = await validateLogin(req.body)

    // return token if valid login
    return res.send("Hello")
})

module.exports = router