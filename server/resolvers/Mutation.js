const sign = require('./user/sign')

module.exports = {
    register: (parent, args, { db,token }) => sign.up(parent,args,{ db,token }),
    logout: (parent, args, { db,token }) => sign.out(parent, args, { db,token })
}