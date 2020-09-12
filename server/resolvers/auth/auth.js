const jwt = require('jsonwebtoken');

module.exports = {
    checkToken: async(token, {db}) =>{
        let ret = 0;
        try{
            ret = jwt.verify(token,process.env.JWT_SECRET)
        } catch { 
            return 401
        }
        if(await db.collection('blackList').findOne({token : token}) == null) return ret
        return 401
    },
    
    getToken: (id) => {
        return jwt.sign({
            id: id,
            exp:Math.floor(Date.now() / 1000) + (60 * 60)
        },process.env.JWT_SECRET)
    }
}