const should = require('should')
const supertest = require('supertest')
const app = require('../server')

describe('TEST', () => {
    const req = supertest(app)

    it(`GraphQL findUser Query Test`, async () => {

        const query = `
            query{
                findUser(name:"asdf"){
                    id
                    name
                }
            }
        `

        const res = await req.post('/graphql')
            .send({ query })
            .expect(200)
        
            
    })

    it(`Graphql register Mutation Test`, async () => {
        
        const query = `
            mutation{
                register(id:"test12",pw:"test12",name:"test12"){
                    id
                    name
                    money
                }
            }
        `
        const res = await req.post('/graphql')
            .send({ query })
            .expect(200)
        
    })


})