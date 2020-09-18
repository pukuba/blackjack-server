const auth = require("../auth")

const logic = {
    async create(parent, args, {db, token, pubsub }){
        const user = await auth.checkToken(token, { db })
        if(user == 401) return {code : 401}
        if(user.status  != 0) return {code : 403}
        const roomId = await db.collection('user').find().sort({"status":-1}).limit(1).toArray() 
        roomId++
        db.collection('user').updateOne({'id':user.id},{$set:{'status':roomId,host:1}})
        const newRoom = {
            host : user.id,
            code : 200,
            player : 1,
            roomId : roomId
        }
        pubsub.publish('lobby',{ newRoom })
        newRoom.token = auth.getToken
        return newRoom
    }
}

module.exports = logic