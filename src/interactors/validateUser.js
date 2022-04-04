const addErrorMessage = require('../utils/addErrorMessage')
const userValidator = require('../validators/user.validator')

module.exports = (UserDatasource) => async ({ data, options }) => {    
    const dataValidation = userValidator(data)

    if (dataValidation.error)
        return dataValidation

    const passwordExists = await UserDatasource.findOne({ email: data.email })
    if (passwordExists)
        addErrorMessage(dataValidation, 'The email already exists')

    return dataValidation
}
