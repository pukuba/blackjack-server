module.exports = {
    chat:(parent,args,{token,subToken,pubsub}) => {
        const newChat = {
            token : token,
            subToken : subToken
        }
        pubsub.publish('chat-added',args, { newChat })
        return args.content
    }
}