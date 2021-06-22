const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const Router = require('@koa/router');

const { fileDownload } = require('./util');

const app = new Koa();
const router = new Router();

// 路由注册
router.get('/api/download', fileDownload);

// 中间件挂载
app.use(router.routes()).use(router.allowedMethods());
app.use(serve(path.resolve(__dirname, '../public')));

app.listen(3000, () => {
  console.log('app is listening on port 3000！');
});
