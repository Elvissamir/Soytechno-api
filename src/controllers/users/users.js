const router = require('express').Router()
const { registerUser } = require('../../interactors/index')

router.post('/', async (req, res) => {

    // Check if valid
    // if valid then continue
    // if error 
    // send error

    await Promise.reject('Something failed')

    //res.send("Hola")
    
    // create the new user
    // const data = await registerUser(req.body)
    
    // return the user and the token in the headers
    // return res
    //         .header('x-auth-token', data.token)
    //         .header('access-control-expose-headers', 'x-auth-token')
    //         .send(data.user)
})

module.exports = router