const UserResource = require('../resources/userResource')

const registerUser = (UserDataSource) => async (userData) => {
    const hashedPassword = await UserDataSource.hashPassword(userData.password)
    
    const user = await UserDataSource.create({
        first_name: userData.first_name,
        last_name: userData.last_name,
        ci: userData.ci,
        password: hashedPassword,
        email: userData.email
    })
    return UserResource(user)
}

module.exports = registerUser