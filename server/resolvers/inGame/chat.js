const auth = require("../auth")

const logic = {
    async chat(parent, args, { db, token, pubsub }){
        const user = await auth.checkToken(token,{db})
        if(user === 401) return { code : 401 }
        const newChat = {
            code : 200,
            id : user.id,
            content : args.content
        }
        pubsub.publish('chat-added' + args.room, { newChat })
        return newChat
    },

    newChat(parent, args, { pubsub }){
        return pubsub.asyncIterator('chat-added' + args.room)
    }
}

module.exports = logic