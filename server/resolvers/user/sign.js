const auth = require('../auth')
const crypto = require('crypto');
const specialPW = "!@#$%^&*()_-=+~`./,;"

const specialChar = (x) => {
    for(const i of specialPW) if(x === i) return 1
    return 0
}

const user = {
    async up(parent, args, {db, token}){
        if(await auth.checkToken(token,{ db }) != 401) return { code : 401 }
        if(args.id.length < 4 || args.pw.length < 6) return { code : 411 }
        for(const i of args.id) if(!('a' <= i && i <= 'z' || 'A' <= i && i <= 'Z' || '0' <= i && i <= '9'))  return { code : 412 }
        for(const i of args.pw) if(!('a' <= i && i <= 'z' || 'A' <= i && i <= 'Z' || '0' <= i && i<= '9' || specialChar(i))) return { code : 412 }
        
        if(await db.collection('user').findOne({id : args.id}) != null) return { code : 409 }
        const seed = Math.round((new Date().valueOf() * Math.random())) + ""
        db.collection('user').insertOne({
            id : args.id,
            pw : crypto.createHash("sha512").update(args.pw + seed).digest("hex"),
            seed : seed,
            gold : 0,
            status: -1,
            host:0
        })
        return {code : 200}
    },

    async in(parent, args, {db, token, pubsub }){
        if(await auth.checkToken(token, { db }) != 401) return { code : 401 }
        const result = await db.collection('user').findOne({id:args.id})
        if(result == null) return { code : 404 }
        if(crypto.createHash("sha512").update(args.pw + result.seed).digest("hex") == result.pw){
            db.collection('user').updateOne({'id':args.id},{$set:{'status':0,'host':0}})
            const newChat = {
                code : 200,
                id : "System-Log",
                content : `${args.id} 님이 로비에 접속하셨습니다.`,
            }
            pubsub.publish('chat-added0',{newChat})
            return {
                code : 200,
                token: auth.getToken(args.id,0,0),
                status:0,
                host:0
            }
        }
        return { code : 400 }
    },

    async out(parent, args, {db, token }){
        const user = await auth.checkToken(token,{ db })
        if(user == 401) return { code : 401 }
        await db.collection('blackList').insertOne({token : token})
        db.collection('user').updateOne({'id':user.id},{$set:{'status':-1,'host':0}})
        return {code : 200}
    }
}

module.exports = user