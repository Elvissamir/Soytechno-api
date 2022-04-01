const router = require('express').Router()

router.get('/', (req, res) => {
    return res.send('Up and running...')
})

module.exports = router