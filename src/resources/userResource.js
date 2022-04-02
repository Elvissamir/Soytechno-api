const keys = ['_id', 'first_name', 'last_name', 'email']

const UserResource = (data) => {
    const result = {}
    for (let key of keys)
        result[key] = data[key]

    return result
}

module.exports = UserResource