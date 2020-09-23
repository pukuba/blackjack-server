const sign = require('./user')
const payment = require('./payment')
const inGame = require('./inGame')

module.exports = {
    login: (parent, args, { db,token,pubsub }) => sign.User.in(parent, args, { db,token,pubsub }),
    order: (parent, args, { db,token }) => payment.Find.order(parent, args, { db,token }),
    online: (parent, args, { db,token }) => sign.Status.online(parent, args, { db,token }),
    refresh: (parent, args, { db,token }) => inGame.Opt1.refresh(parent, args, { db,token })
}