const auth = require('../auth')

const user = {
    async chat(parent, args, { db, token, pubsub }){
        const user = await auth.checkToken(token,{db})
        if(user === 401) return { code : 401 }
        const newChat = {
            code : 200,
            id : user.id,
            content : args.content
        }
        pubsub.publish('chat-added' + args.room, { newChat })
        newChat.token = auth.getToken(user.id,user.status,user.host,user.play)
        return newChat
    }
}

module.exports = user