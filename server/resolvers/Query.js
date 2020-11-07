const { ApolloError } = require('apollo-server-express')

const { login } = require('./user')
const { getToken } = require('./user')

module.exports = {
    test: (parent, args, { db }) => {
        throw new ApolloError("id must be non-negative", "INVALID_ID", {
            parameter: "id",
        })
    },
    login: (parent, args, { db }) => login(parent, args, { db })
}