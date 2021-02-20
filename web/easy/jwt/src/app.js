const Koa = require('koa');
const views = require('koa-views')
const Router = require('koa-router')
const path = require('path')
const bodyparser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const publicKey = fs.readFileSync(__dirname + '/public/keys/publicKey.pem')
const sercetKey = fs.readFileSync(__dirname + '/secretKey.pem')
const app = new Koa(); 
const router = new Router()
const FLAG = process.env.FLAG
const CUSTOMER = 'customer'
const ADMIN = 'admin'

const staticFiles = require('koa-static');
app.use(staticFiles( path.join( __dirname,'/public')));


router.get('/', async (ctx) => {
    const info = ''
    await ctx.redirect('/login',{info})
})

router.get('/login', async (ctx) => {
    const info = ''
    await ctx.render('login', { info })
})

router.get('/index', async (ctx) => {
    const token = ctx.cookies.get('token')
    let verifyRes = null
    jwt.verify(token, publicKey, { algorithms: ['HS256','RS256']},function (err, decoded) {
        if (err) {
            console.log(err)
        } else {
            verifyRes = decoded
        }
    })
    if (verifyRes) {
        const role = verifyRes.role
        if (role === ADMIN) {
            await ctx.render('index', { info: '欢迎你，管理员', flag: FLAG })
        } else if (role === CUSTOMER) {
            await ctx.render('index', { info:'欢迎你，游客' ,flag: '只有管理员看得到hhh'})
        }
    } else {
        await ctx.redirect('/login', { info:'token错误，请重新登录' })
    }
    
})

router.post('/login', async (ctx) => {
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    if (username != '' && password != '') {
        if (username === ADMIN && password != FLAG) {
            const info = '密码错误'
            await ctx.render('login', { info })
        } else if (username === ADMIN && password === FLAG) {
            const info = '欢迎你，管理员'
            const token = jwt.sign({ role : ADMIN }, sercetKey, { algorithm: 'RS256' })
            ctx.cookies.set('token',token)
            await ctx.redirect('/index',{info})
        } else {
            const info = '欢迎你，游客'
            const token = jwt.sign({ role: CUSTOMER }, sercetKey, { algorithm: 'RS256' })
            ctx.cookies.set('token',token)
            await ctx.redirect('/index',{info})
        }
    } else {
        const info = '请输入用户名和密码'
        await ctx.render('login', { info })
    }
})

app.use(views(path.join(__dirname,'./views'), {
  extension: 'ejs'
}))

app.use(bodyparser())
app.use(router.routes());   
app.use(router.allowedMethods());


app.listen(8000);