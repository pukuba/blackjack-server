const sign = require('./user/sign')
const payment = require('./payment')

module.exports = {
    register: (parent, args, { db,token }) => sign.up(parent,args,{ db,token }),
    logout: (parent, args, { db,token }) => sign.out(parent, args, { db,token }),
    onetime: (parent, args, { db,token }) =>  payment.buy.onetime(parent, args, { db,token })
}