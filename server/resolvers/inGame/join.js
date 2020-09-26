const auth = require('../auth')

module.exports = {
    async join(parent, args, { db,token,pubsub}){
        const user = await auth.checkToken(token,db)
        if(user == 401) return { code : 401 }
        const count = await db.collection('user').find({'status' : args.room}).estimatedDocumentCount()
        const manager = await db.collection('user').findOne({'status': args.room , 'host' : 1})
        if(count > 3) return { code : 406}
        db.collection('user').updateOne({'id' : user.id},{$set:{'status' : args.room, 'host' : 0}})
        return {
            token: auth.getToken(user.id, args.room, 0),
            code : 200,
            player : count + 1,
            roomId : args.room,
            host : manager.id
        }
    }
}
