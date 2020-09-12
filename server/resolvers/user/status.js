const auth = require('../auth')
const jwt = require('jsonwebtoken');

const logic = {
    online: async(parent, args, { db,token }) => {
        const user = await auth.checkToken(token,{ db })
        if(user == 401) return { code : 401 }
        const data = await db.collection('user').findOne({'id':user.id})
        return {
            code : 200,
            id : user.id,
            gold : data.gold,
            token: jwt.sign({
                id:args.id,
                exp:Math.floor(Date.now() / 1000) + (60 * 60)
            },process.env.JWT_SECRET)
        }
    }
}

module.exports = logic