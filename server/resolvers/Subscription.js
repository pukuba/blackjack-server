module.exports = {
    newChat:{
        subscribe: (parent,args,{ pubsub }) => pubsub.asyncIterator('chat-added')
    }
}