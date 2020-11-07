const { login, refreshLogin } = require('./user')

module.exports = {
    login: (parent, args, { db }) => login(parent, args, { db }),
    refreshLogin: (parent, { refreshToken }, { db }) => refreshLogin(parent, { refreshToken }, { db })
}