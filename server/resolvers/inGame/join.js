const auth = require('../auth')

const logic = {
    async join(parent, args, { db,token,pubsub}){
        const user = await auth.checkToken(token,{ db })
        if(user == 401) return { code : 401 }
        let count = await db.collection('user').find({'status' : args.room}).toArray()
        count = count.length
        const manager = await db.collection('user').findOne({'status': args.room , 'host' : 1})
        if(count > 3) return { code : 406}
        db.collection('user').updateOne({'id' : user.id},{$set:{'status' : args.room, 'host' : 0}})
        
        const newUser = {
            code : 200,
            id : user.id,
            stat : 1
        }
        
        pubsub.publish('new-user' + args.room, { newUser })

        return {
            token: auth.getToken(user.id, args.room, 0,0),
            code : 200,
            player : count + 1,
            roomId : args.room,
            host : manager.id,
        }
    }
}

module.exports = logic