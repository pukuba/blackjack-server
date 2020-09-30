const auth = require("../auth")

const logic = {
    newChat(parent, args, { pubsub }){
        return pubsub.asyncIterator('chat-added' + args.room)
    },

    newUser(parent, args, { pubsub }){
       return pubsub.asyncIterator('new-user' + args.room)
    }
}

module.exports = logic