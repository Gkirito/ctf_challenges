const jwt = require('jsonwebtoken')
const fs = require('fs')
const publicKey = fs.readFileSync(__dirname + '/publicKey.pem')


const token = jwt.sign({ role: 'admin', "iat": 1613798737 }, publicKey, { algorithm: 'HS256' })
console.log(token)