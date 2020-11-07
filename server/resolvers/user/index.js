const { register } = require('./sign')
const { checkToken, getToken, getNewToken } = require('./auth')
module.exports = { register, checkToken, getToken, getNewToken }