const { ApolloError } = require('apollo-server-express')

const jwt = require('jsonwebtoken')


module.exports = {
    checkToken: (token) => {
        try {
            return jwt.verify(token, process.env.JWT_PW)
        } catch {
            throw new ApolloError("token is not valid", 401)
        }
    },

    getToken: (name, db) => {
        const token = jwt.sign({
            name: name,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, process.env.JWT_PW)

        const refreshToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        }, process.env.JWT_PW)

        db.collection('token').insertOne({
            refreshToken,
            name
        })

        return {
            token,
            refreshToken
        }
    },

    refreshLogin: async (parent, { refreshToken }, { db }) => {
        const foundToken = await db.collection('token').findOne({ refreshToken })
        if (foundToken === null) {
            throw new ApolloError("refreshToken is not valid", 401)
        }
        try {
            jwt.verify(refreshToken, process.env.JWT_PW)
        } catch {
            db.collection('token').deleteOne({ refreshToken })
            throw new ApolloError("refreshToken is not valid", 401)
        }
        return {
            token: jwt.sign({
                name: foundToken.name,
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            }, process.env.JWT_PW)
        }
    },

    deleteToken: (refreshToken, db) => {
        db.collection('token').deleteOne({ refreshToken })
    }
}