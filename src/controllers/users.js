const router = require('express').Router()
const { registerUser } = require('../interactors/index')

router.post('/', async () => {
    await registerUser()
})

module.exports = router