const mongoose =  require("mongoose")
const { MongoMemoryServer } = require('mongodb-memory-server')

class mongoDBHandler {
    constructor(mongoServer) {
        this.server = new mongoServer()
    }

    async start() {
        await this.server.start()
    }

    async stop() {
        await this.server.stop()
    }

    async startAndConnect() {
        await this.server.start()

        const connectionString = await this.server.getUri()
        await mongoose.connect(connectionString)
    }

    async disconnect() {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
    }

    async disconnectAndStop() {
        await this.disconnect()
        await this.stop()
    }

    async clear() {
        const collections = mongoose.connection.collections 

        for (const key in collections) {
            const collection = collections[key]
            await collection.deleteMany({})
        }
    }
}

module.exports = new mongoDBHandler(MongoMemoryServer)

