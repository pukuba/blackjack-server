const auth = require('../auth')
const jwt = require('jsonwebtoken');

const logic = {
    async order(parent, args, { db, token }){
        const user = await auth.checkToken(token, { db })
        if(user == 401) return { code : 401 }
        return {
            code : 200,
            data : await db.collection('payment').find({'id' : user.id}).sort({'date' : -1}).toArray(),
            token : jwt.sign({
                id: user.id,
                exp:Math.floor(Date.now() / 1000) + (60 * 60)
            },process.env.JWT_SECRET)
        }
    }
}

module.exports = logic