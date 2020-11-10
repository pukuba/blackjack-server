const { newChat } = require('./logic')

module.exports = {
    newChat: {
        subscribe: (parent, args, { pubsub,subToken }) => {
            console.log(subToken)
            return newChat(parent, args, { pubsub })
        }
    }
}