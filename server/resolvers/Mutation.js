const sign = require('./user/sign')
const payment = require('./payment')
const inGame = require('./inGame')

module.exports = {
    register: (parent, args, { db,token }) => sign.up(parent,args,{ db,token }),
    logout: (parent, args, { db,token }) => sign.out(parent, args, { db,token }),
    onetime: (parent, args, { db,token }) =>  payment.Buy.onetime(parent, args, { db,token }),
    chat: (parent, args, { db,token,pubsub }) => inGame.Chat.chat(parent, args, {db,token,pubsub})
}