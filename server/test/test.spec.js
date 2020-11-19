const should = require('should')
const supertest = require('supertest')
const app = require('../server')
const assert = require('assert')

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

        const json = JSON.parse(res.res.text)
        assert.strictEqual(json.data.findUser.id, "asdf")
        assert.strictEqual(json.data.findUser.name, "asdf")
    })

    it(`Register length error test`, async () => {

        const query = `
            mutation{
                register(id:"d",pw:"asdf",name:"asdf"){
                    id
                }
            }
        `
        const res = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(res.res.text)
        assert.strictEqual(json.errors[0].extensions.code, 412)

    })

    it(`Register Conflict test`, async () => {
        const query = `
            mutation{
                register(id:"asdf",pw:"asdf",name:"asdf"){
                    id
                }
            }
        `

        const res = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(res.res.text)
        assert.strictEqual(json.errors[0].message, "Conflict")
    })

    it(`Login Test Success`, async () => {
        const query = `
            query{
                login(id:"asdf",pw:"asdf"){
                    token
                }
            }
        `
        const res = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(res.res.text)
        assert.strictEqual(json.data.login.token.length > 0, true)
    })

    it(`Login Test Failed`, async () => {
        const query = `
            query{
                login(id:".",pw:"."){
                    token
                }
            }
        `

        const res = await req.post('/graphql')
            .send({ query })
            .expect(200)
        
        const json = JSON.parse(res.res.text)
        assert.strictEqual(json.errors[0].extensions.code, 401)
    })
    
})