const { register, logout } = require('./user')
const { chat } = require('./logic')
module.exports = {
    chat,
    register,
    logout,
} 