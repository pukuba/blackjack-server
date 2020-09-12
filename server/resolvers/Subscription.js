const inGame = require('./inGame')

module.exports = {
    newChat : {
        subscribe: (parent, args, { pubsub }) => {
            return inGame.Chat.newChat(parent, args, { pubsub })
        }
    }
}