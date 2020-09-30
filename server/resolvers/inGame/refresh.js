const auth = require('../auth')

const logic = {
    async refresh(parent, args, {db, token, pubsub }){
        const user = await auth.checkToken(token, { db })
        if(user == 401) return [{code : 401}]
        if(user.status != 0) return [{ code : 403 }]
        const data = await db.collection('user').find({status:{$gt:0}}).sort({'status':-1}).toArray()
        let rooms = new Map(), hosts = new Map(), res = []
        for(const i of data){
            rooms.set(i.status, rooms[i.status] ? rooms[i.status] + 1 : 1) 
            if(i.host) hosts[i.status] = i.id
        }
        for(let [key, value] of rooms){
            res.push({
                code : 200,
                host : hosts[key],
                player : value,
                roomId : key,
                token : auth.getToken(user.id,user.status,user.host,user.play)
            })
        }
        return res
    } ,

    newUser(parent, args, { pubsub }){
        return pubsub.asyncIterator('new-user' + args.room)
    }
}



module.exports = logic