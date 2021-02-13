const Koa = require('koa');
const views = require('koa-views')
const Router = require('koa-router')
const path = require('path')
const bodyparser = require('koa-bodyparser')
const app = new Koa(); 
const router = new Router()

const staticFiles = require('koa-static');
app.use(staticFiles( path.join( __dirname,'/public')));

const rightBrowser = 'CTF Security Browser'

router.get('/', async (ctx) => {
    const info = ''
    await ctx.render('index', { info })
})

router.post('/login', async (ctx) => {
    const userAgent = ctx.request.header['user-agent']
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    if (username != '' && password != '') {
        if (rightBrowser === userAgent) {
            const flag = process.env.FLAG
            ctx.body = flag
        } else {
            const info = '非安全环境登录'
            await ctx.render('index', { info })
        }
    } else {
        const info = '请输入用户名和密码'
        await ctx.render('index', { info })
    }
})

app.use(views(path.join(__dirname,'./views'), {
  extension: 'ejs'
}))

app.use(bodyparser())
app.use(router.routes());   
app.use(router.allowedMethods());


app.listen(8000);