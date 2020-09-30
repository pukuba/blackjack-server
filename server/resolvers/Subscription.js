const inGame = require('./inGame')

module.exports = {
    newChat : {
        subscribe: (parent, args, { pubsub }) => {
            return inGame.New.newChat(parent, args, { pubsub })
        }
    },

    newUser : {
        subscribe: (parent, args, { pubsub }) => {
            return inGame.New.newUser(parent, args, { pubsub })
        }
    }
    /*
    newRoom : {
        subscribe: (parent, args, { pubusb }) => {
            return inGame.Room.create(parent, args, {db, token, pubsub})
        }
    }
    */
}