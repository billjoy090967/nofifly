const express = require('express')
const app = express()

const cors = require('cors')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const checkJwt = jwt({
secret:  jwks.expressJwtSecret({
cache: true,
rateLimit: true,
jwksRequestsPerMinute: 5,
jwksUri:  'https://notifly.auth0.com/.well-known/jwks.json'
})
audience: 'https://api.notifly-users.com'

})

app.use(cors({ credientials: true }))

app.get('/', (req, res) => {})
