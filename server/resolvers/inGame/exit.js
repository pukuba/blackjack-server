const auth = require('../auth')

const logic = {
    async exit(parent, args, {db, token, pubsub }){
        const user = await auth.checkToken(token,{ db })
        if(user == 401) return { code : 401 }
        if(!user.status) return { code : 412 }
        // 방장이 게임을나간다?
        const rooms = await db.collection('user').find({'status' : user.status}).sort({'gold':-1}).limit(2).toArray()
        for(const i of rooms){
            if(i.id ==  user.id) continue
            db.collection('user').updateOne({'id' : i.id}, {$set:{'host' : 1}})
        }
        db.collection('user').updateOne({'id' : user.id}, {$set:{'status' : 0, 'host' : 0}})
        const newUser = {
            code : 200,
            id : user.id,
            stat : 0
        }

        pubsub.publish('new-user' + user.status, { newUser })

        return {
            code : 200,
            token : auth.getToken(user.id,0,0,0),
        }
    }
}

module.exports = logic
