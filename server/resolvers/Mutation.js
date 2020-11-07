const {register} = require('./user')
module.exports = {
    chat:(parent,args,{token,subToken,pubsub}) => {
        const newChat = {
            token : token,
            subToken : subToken
        }
        pubsub.publish('chat-added',{newChat} )
        return args.content
    },
    register:(parent,args,{token,db}) => register(parent,args,{token,db})
    
}