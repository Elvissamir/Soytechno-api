const UserResource = require('../resources/userResource')

const registerUser = (UserDataSource) => async (userData) => {
    const user = await UserDataSource.create(userData)

    return UserResource(user)
}

module.exports = registerUser