module.exports = function () {
    process.on('uncaughtException', (ex) => {
        process.exit(1)
    })

    process.on('unhandledRejection', (ex) => {
        process.exit(1)
    })
}