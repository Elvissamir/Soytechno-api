module.exports = function (validationObject, message) {
    validationObject.error = {details: [{ message: message }]}

    return validationObject
}