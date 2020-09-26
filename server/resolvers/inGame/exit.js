const auth = require('../auth.js')

const logic = {
    async exit(parent, args, {db, token, pubsub }){
        const user = await auth.checkToken(token,{ db })
        if(user == 401) return { code : 401 }
        if(!user.status) return { code : 412 }
        // 방장이 게임을나간다?
        const rooms = await db.collection('user').find({'status' : user.status}).sort({'gold':-1}).limit(2).toArray()
        if(rooms.length == 1) 
    }
}

module.exports = logic
