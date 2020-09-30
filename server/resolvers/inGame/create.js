const auth = require("../auth")

const logic = {
    async create(parent, args, {db, token, pubsub }){
        const user = await auth.checkToken(token, { db })
        if(user == 401) return {code : 401}
        if(user.status != 0) return {code : 403}
        console.log(user)
        let roomId = await db.collection('user').findOne({$query: {}, $orderby: {'status': -1}})
        db.collection('user').updateOne({'id':user.id},{$set:{'status':roomId.status+1,host:1}})
        let newRoom = {
            host : user.id,
            code : 200,
            player : 1,
            roomId : roomId.status+1
        }
        newRoom.token = auth.getToken(user.id, roomId.status+1, 1,0)
        return newRoom
    }
}

module.exports = logic