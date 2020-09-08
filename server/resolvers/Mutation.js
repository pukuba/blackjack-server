const sign = require('./user/sign')

module.exports = {
    register: (parent, args, { db,token }) => sign.up(parent,args,{ db,token })
}