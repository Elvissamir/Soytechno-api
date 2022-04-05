

module.exports = (UserDataSource) => async (loginData) => {
    
    // validate email and password

    // validate user exists in db
    const user = await UserDataSource.findOne({ email: loginData.email })

    // check if password is correct

    // generate token 
    const token = user.generateAuthToken()

    return { token: token }
}