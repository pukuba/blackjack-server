const auth = require("../auth")
const jwt = require('jsonwebtoken');

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
        newChat.token = jwt.sign({
            id: user.id,
            exp:Math.floor(Date.now() / 1000) + (60 * 60)
        },process.env.JWT_SECRET)
        return newChat
    },

    newChat(parent, args, { pubsub }){
        return pubsub.asyncIterator('chat-added' + args.room)
    }
}

module.exports = logic