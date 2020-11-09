const { register, logout } = require('./user')
const { chat } = require('./logic')
module.exports = {
    chat: (parent, args, { token, pubsub }) => chat(parent, args, { token, pubsub }),
    register: (parent, args, { token, db }) => register(parent, args, { token, db }),
    logout: (parent, args, { db }) => logout(parent, args, { db })
}