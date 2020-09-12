const auth = require('../auth')

const logic = {
    online: async(parent, args, { db,token }) => {
        const user = await auth.checkToken(token,{ db })
        if(user == 401) return { code : 401 }
        const data = await db.collection('user').findOne({'id':user.id})
        return {
            code : 200,
            id : user.id,
            gold : data.gold,
            token: auth.getToken(user.id)
        }
    }
}

module.exports = logic