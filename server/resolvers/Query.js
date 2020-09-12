const sign = require('./user/sign')
const payment = require('./payment')

module.exports = {
    login: (parent, args, { db,token }) => sign.in(parent, args, { db,token }),
    order: (parent, args, { db,token }) => payment.Find.order(parent, args, { db,token }),
    
    
}