const auth = require('../auth')

module.exports = {
    async join(parent, args, { db,token,pubsub}){
        const user = await auth.checkToken(token,db)
        if(user == 401) return { code : 401 }
        const count = await db.collection('user').find({'status' : args.room}).estimatedDocumentCount()
    }
}