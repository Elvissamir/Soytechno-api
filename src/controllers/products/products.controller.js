const router = require('express').Router()

router.post('/', async (req, res) => {
    return res.status(200).send({})
})

module.exports = router