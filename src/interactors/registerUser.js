const UserResource = require('../resources/UserResource')


const registerUser = (UserDataSource) => async (userData) => {
    const user = await UserDataSource.create(userData)

    return UserResource(user)
}

module.exports = registerUser