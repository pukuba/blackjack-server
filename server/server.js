const { ApolloServer,PubSub } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default

const { MongoClient } = require('mongodb')

const { readFileSync } = require('fs')
const { createServer } = require('http')
const path = require('path')

require('dotenv').config()

const resolvers = require('./resolvers')
const typeDefs = readFileSync('./typeDefs.graphql','utf-8')

const start = async() => {
    const app = express()
    const client = await MongoClient.connect(
        process.env.DB_HOST,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
    const db = client.db()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        engine:true,
        context: async({ req }) => {
            const token = req ? req.headers.authorization: ''
            return {db, token}
        }
    })

    server.applyMiddleware({ app })
    
    app.get('/playground',expressPlayground({ endpoint: '/graphql'}))

    const httpServer = createServer(app)
    httpServer.timeout = 5000

    httpServer.listen({ port : 5252}, () => {
        console.log(`GraphQL Server running at ${process.env.SERVER_HOST}${server.graphqlPath}`)
    })
}

start()