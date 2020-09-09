const auth = require('../auth')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const specialPW = "!@#$%^&*()_-=+~`./,;"

const specialChar = (x) => {
    for(let i=0; i<specialPW.length; i++) if(x === specialPW[i]) return 1
    return 0
}

const user = {
    async up(parent, args, {db, token}){
        if(await auth.checkToken(token,{ db }) != 401) return { code : 403 }
        if(args.id.length < 4 || args.pw.length < 6) return { code : 411 }
        for(let i=0; i<args.id.length; i++){
            if(!('a' <= args.id[i] && args.id[i] <= 'z' || 'A' <= args.id[i] && args.id[i] <= 'Z' || '0' <= args.id[i] && args.id[i] <= '9'))  return { code : 412}
        }
        for(let i=0; i<args.pw.length; i++){
            if(!('a' <= args.pw[i] && args.pw[i] <= 'z' || 'A' <= args.pw[i] && args.pw[i] <= 'Z' || '0' <= args.pw[i] && args.pw[i]<= '9' || specialChar(args.pw[i]))) return { code : 412 }
        }
        if(await db.collection('user').findOne({id : args.id}) != null) return { code : 409 }
        const seed = Math.round((new Date().valueOf() * Math.random())) + ""
        db.collection('user').insertOne({
            id : args.id,
            pw : crypto.createHash("sha512").update(args.pw + seed).digest("hex"),
            seed : seed,
            gold : 0,
        })
        return {code : 200}
    },

    async in(parent, args, {db, token }){
        if(await auth.checkToken(token, { db }) != 401) return { code : 403 }
        const result = await db.collection('user').findOne({id:args.id})
        if(result == null) return { code : 401 }
        if(crypto.createHash("sha512").update(args.pw + result.seed).digest("hex") == result.pw){
            return {
                code : 200,
                token: jwt.sign({
                    id:args.id,
                    exp:Math.floor(Date.now() / 1000) + (60 * 60)
                },process.env.JWT_SECRET)
            }
        }
        return { code : 401 }
    },

    async out(parent, args, {db, token }){
        if(await auth.checkToken(token,{ db }) == 401) return { code : 403 }
        await db.collection('blackList').insertOne({token : token})
        return {code : 200}
    
    }
}

module.exports = user