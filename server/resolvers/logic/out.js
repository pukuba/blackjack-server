const { checkToken } = require('../user')

module.exports = {
    chat: (parent, { content }, { token, pubsub }) => {
        const user = checkToken(token)
        const newChat = {
            name: user.name,
            content
        }
        pubsub.publish('chat-added', { newChat })
        return newChat
    },

    newChat: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator('chat-added')
    }
}