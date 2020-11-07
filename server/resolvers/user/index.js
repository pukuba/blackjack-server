const { register, login } = require('./sign')
const { checkToken, getToken, refreshLogin } = require('./auth')

module.exports = { register, checkToken, getToken, refreshLogin, login }