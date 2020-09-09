const sign = require('./user/sign')
const pay = require('./payment/buy')

module.exports = {
    register: (parent, args, { db,token }) => sign.up(parent,args,{ db,token }),
    logout: (parent, args, { db,token }) => sign.out(parent, args, { db,token }),
    onetime: (parent, args, { db,token }) =>  pay.onetime(parent, args, { db,token })
}