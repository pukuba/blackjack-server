const { newChat } = require('./logic')

module.exports = {
    newChat: {
        subscribe: (parent, args, { pubsub }) => newChat(parent, args, { pubsub })
    }
}