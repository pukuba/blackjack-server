const inGame = require('./inGame')

module.exports = {
    newChat : {
        subscribe: (parent, args, { pubsub }) => inGame.Chat.newChat(parent, args, { pubsub })
    }
}