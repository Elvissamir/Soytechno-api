const app = require('./src/app')

const port = process.env.DEV_PORT || 3001

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

