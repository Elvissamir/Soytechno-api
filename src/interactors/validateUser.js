const userValidator = require('../validators/user.validator')

module.exports = (UserDatasource) => async ({ data, options }) => {    
    const validation = userValidator(data)

    if (validation.error)
        return validation

    const passwordExists = await UserDatasource.findOne({ email: data.email })
    if (passwordExists) 
        validation.error = {details: [{message: 'Email already exists'}]}

    return validation
}
