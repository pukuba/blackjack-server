const { ApolloError, PubSub } = require('apollo-server-express')
const jwt = require('jsonwebtoken')

module.exports = {
    checkToken: async (parent, args, { token, db }) => {
        try {
            jwt.verify(token, process.env.JWT)
        } catch {
            throw ApolloError("token is not valid", 403)
        }
    },

    getToken: async ({ name, db }) => {
        const token = jwt.sign({
            name: name,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, process.env.JWT)

        const refreshToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, process.env.JWT)

        db.collection('user').insertOne({
            token: refreshToken,
            name
        })

        return {
            token,
            refreshToken
        }
    },

    getNewToken: async (parent, { refreshToken }, { db }) => {
        const foundToken = db.collection('token').findOne({ token: refreshToken })
        if (foundToken) {
            try {
                return user
            } catch {
                throw ApolloError("refreshToken is not valid", 403)
            }
        }
        throw ApolloError("refreshToken is not valid", 403)
    },


}