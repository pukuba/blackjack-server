const auth = require("../auth")
const axios = require("axios")
require('date-utils')


const iamport = {
    'imp_key' : process.env.IMPORT_REST_KEY,
    'imp_secret' : process.env.IMPORT_SECRET_KEY
}

const onetimePay = {
    url : process.env.ONETIME_URL,
    method : 'post',
    headers:{
        'Content-Type': 'application/json'
    }
}

const t0kenData = {
    url : process.env.GET_TOKEN_URL,
    method:`post`,
    headers:{ "Content-Type": "application/json" },
    data: iamport
}

const logic = {
    async onetime(parent, args, { db, token }){
        const user = await auth.checkToken(token, { db })
        if(user == 401) return {code : 401}
        const t0ken = await axios(t0kenData)
        const time = new Date().toFormat('YYYY-MM-DD HH24:MI:SS')
        const onetimeAPI = onetimePay
        const dbCnt = await db.collection('payment').estimatedDocumentCount() + 1
        onetimeAPI.headers.Authorization = t0ken.data.response.access_token
        onetimeAPI.data = {
            'merchant_uid': process.env.UID + " " + time + " " + dbCnt,
            'amount' : args.input.amount,
            'card_number' : args.input.card_number,
            'expiry' : args.input.expiry,
            'birth' : args.input.birth,
            'pwd_2digit' : args.input.pwd_2digit,
            'name' : `Gold-${args.input.amount}`,
            'buyer_name' : user.id,
            'buyer_tel' : args.input.buyer_tel,
            'buyer_email' : args.input.buyer_email
        }
        const buyData = await axios(onetimeAPI)
        if(buyData.status === 200){
            db.collection('payment').insertOne({
                id : user.id,
                merchant_uid : process.env.UID + " " + time + " " + dbCnt,
                date : time,
                amount : args.input.amount
            })
            const userInfo = await db.collection('user').findOne({id:user.id})
            db.collection('user').updateOne({id:user.id},{$set:{'gold' : userInfo.gold + args.input.amount}})
            return {
                code : 200,
                amount : args.input.amount,
                id : user.id,
                gold : userInfo.gold + args.input.amount,
                date : time,
                token : auth.getToken(user.id,user.status,user.host)
            }
        }
        return {code : 412}
    }
}

module.exports = logic