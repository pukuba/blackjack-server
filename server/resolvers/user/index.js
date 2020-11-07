const { register, login, logout } = require('./sign')
const { checkToken, getToken, refreshLogin, deleteToken } = require('./auth')

module.exports = { register, checkToken, getToken, refreshLogin, login, deleteToken, logout }