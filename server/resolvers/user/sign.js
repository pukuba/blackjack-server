const { ApolloError } = require('apollo-server-express')
const { getToken } = require('./auth')

const cryptoRandomString = require('crypto-random-string');
const crypto = require('crypto');
const specialChar = "~!@#$%^&*()_+-=`₩[]{},.|;:></?"

const checkLength = x => {
    return x.length < 4
}

const isAlphaNumeric = x => {
    for (const char of x) {
        if (!('a' <= char && char <= 'z' || 'A' <= char && char <= 'Z' || '0' <= char && char <= '9')) {
            return false
        }
    }
    return true
}

const isValidPassword = x => {
    for (const char of x) {
        if (!('a' <= char && char <= 'z' || 'A' <= char && char <= 'Z' || '0' <= char && char <= '9' || specialChar.includes(char))) {
            return false
        }
    }
    return true
}

const hashWithSalt = (pw, salt) => crypto.createHash("sha512").update(pw + salt).digest("hex");


module.exports = {
    register: async (parent, { name, id, pw }, { token, db }) => {

        if (checkLength(name) || checkLength(id) || checkLength(pw)) {
            throw new ApolloError("길이", 412)
        }

        if (!isAlphaNumeric(name + id)) {
            throw new ApolloError("id 또는 name 형식", 412)
        }

        if (!isValidPassword(pw)) {
            throw new ApolloError("pw 형식", 412)
        }

        const foundUser = await db.collection('user').findOne({ $or: [{ "name": name }, { "id": id }] })

        if (foundUser) {
            throw new ApolloError("Conflict", 409)
        }

        const salt = cryptoRandomString({ length: 15, type: 'numeric' })
        const user = {
            name: name,
            id: id,
            pw: hashWithSalt(pw, salt),
            salt,
            money: 10000
        }

        await db.collection('user').insertOne(user)
        return user
    },

    login: async (parent, { id, pw }, { db, token }) => {
        const user = await db.collection('user').findOne({ 'id': id })
        if (user === null || user.pw !== hashWithSalt(pw, user.salt)) {
            throw new ApolloError("id & pw check", 401)
        }
        return getToken(user.name,db)
    }
}