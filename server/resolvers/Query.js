const sign = require('./user/sign')

module.exports = {
    test: (parent, args,{ db }) => "hello",
    login: (parent, args, { db,token }) => sign.in(parent, args, { db,token })
}