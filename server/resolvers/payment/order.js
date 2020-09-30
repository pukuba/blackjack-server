const auth = require('../auth')

const logic = {
    async order(parent, args, { db, token }){
        const user = await auth.checkToken(token, { db })
        if(user == 401) return { code : 401 }
        return {
            code : 200,
            data : await db.collection('payment').find({'id' : user.id}).sort({'date' : -1}).toArray(),
            token : auth.getToken(user.id,user.status,user.host,user.play)
        }
    }
}

module.exports = logic