const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    ctx.body = {
        data: '吴壮'
    }
})

app.listen(3000, () => {
    console.log('服务在3000端口')
})

module.exports = app