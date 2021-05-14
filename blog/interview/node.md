# Node 专题
## 1. Koa2 与 express 的区别
`express` 是一个基于 Node.js 平台的极简、灵活的 web 应用平台，主要基于 connect 中间件，并且封装了路由、视图等功能

`Koa2` 是 express 原班人马基于 es 新特性 开发的框架，主要基于 co 中间件，不包含任何的中间件
1. `express` 自身集成了路由、视图等功能，`Koa2` 没有集成任何中间件，需要手动添加
2. `express` 采用 callback 处理异步，`Koa2` 采用 async/await 处理异步，语义化更好
3. `express` 采用 callback 处理异常，深层次的异常捕获不了，`Koa2` 采用 try...catch，可以很好的捕获
4. `express` 中间件基于 connect，线性模型，`Koa2` 采用洋葱模型，面向切面
5. `express` 只有 Request、Response 两个对象，`Koa2` 多一个 Context 对象