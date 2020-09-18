const auth = require('../auth')

const logic = {
    async refresh(parent, args, {db, token, pubsub }){
        const user = auth.checkToken(token, { db })
        if(user == 401) return { code : 401 }
        const data = await db.collection('user').find({status:{$gt:0}}).sort({'status':-1}).toArray()
        
    } 
}

module.exports = logic