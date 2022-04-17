const router = require('express').Router()
const { createProduct } = require('../../interactors/index')

router.post('/', async (req, res) => {
    // give data to createProduct interactor
    const data = createProduct(req.body)
    // if validation error return 400 and the message
    // else return the created product in the form of a product resource
    return res.status(200).send(data)
})

module.exports = router