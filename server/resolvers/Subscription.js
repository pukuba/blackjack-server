const inGame = require('./inGame')

module.exports = {
    newChat : {
        subscribe: (parent, args, { pubsub }) => {
            return inGame.Chat.newChat(parent, args, { pubsub })
        }
    },
    /*
    newRoom : {
        subscribe: (parent, args, { pubusb }) => {
            return inGame.Room.create(parent, args, {db, token, pubsub})
        }
    }
    */
}