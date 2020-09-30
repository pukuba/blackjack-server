const sign = require('./user')
const payment = require('./payment')
const inGame = require('./inGame')

module.exports = {
    register: (parent, args, { db,token }) => sign.User.up(parent,args,{ db,token }),
    logout: (parent, args, { db,token }) => sign.User.out(parent, args, { db,token }),
    onetime: (parent, args, { db,token }) =>  payment.Buy.onetime(parent, args, { db,token }),
    chat: (parent, args, { db,token,pubsub }) => inGame.Chat.chat(parent, args, {db,token,pubsub}),
    create: (parent, args, { db,token,pubsub }) => inGame.Room.create(parent, args, { db,token,pubsub }),
    join: (parent, args, { db,token,pubsub }) => inGame.Opt2.join(parent,args,{db, token,pubsub}),
    exit: (parent, args, { db,token,pubsub }) => inGame.Opt3.exit(parent,args,{db,token,pubsub})
}