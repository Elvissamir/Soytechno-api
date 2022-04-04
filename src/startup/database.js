const mongoose = require("mongoose")

const getConnectionUri = () => {
    const localUri = process.env.MONGO_LOCAL_URI
    const containerUri = process.env.MONGO_CONTAINER_URI
    return (process.env.DEV_USING_DOCKER)? containerUri : localUri 
}

module.exports = async function () {
    const uri = getConnectionUri()

    await mongoose.connect(uri)
            .then(() => {
                console.log(`Connected to mongoDB using: ${uri}`)
            })
}