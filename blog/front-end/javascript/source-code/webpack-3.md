# 源码篇 --- Webpack(三)：原理分析
## 1. Webapck HMR
### 1. 相关概念
1. **Webpack Compiler**： JS 编译成 Bundle
2. **Bundle Server**：文件服务器
3. **HMR Server**：将热更新文件输出给 HMR Runtime
4. **HMR Runtime**：会被注入到 bundle.js 中，与 HMR Server 通过 WebScoket 链接，接受文件变化，并更新对应文件
5. **bundle.js**：构建输出的文件
### 2. Webpack HMR 整体流程
1. Webpack Compiler 将对应的文件打包成 bundle.js（包含注入的 HMR Server），发送给 Bundle Server
2. 浏览器访问 Bundle Server 后，会与 Server 建立一个 WebSocket 长链接
3. Webpack Compiler 重新编译，结果发送给 HMR Server
4. HMR Server 可以知道有哪些资源、哪些模块发生了变化，通知 HMR Runtime
5. HMR Runtime 热更新代码
    - **server端**
        1. 每次编译会生成 hash 值、已改动模块的 json 文件、已改动模块的 js 文件
        2. 编译完后通过 socket 向客户端推送当前编译的 hash 值
        ![](/front-end/js/webpack-hmr-socket.jpg)
    - **client端**
        1. 客户端接收 WebSocket 推送过来的 hash 值，和上一次的作比对
            - 一致则走缓存
            - 不一致就通过 ajax 和 jsonp 向服务器端获取最新资
            ![](/front-end/js/webpack-hmr.jpg)
6. 热更新失败的话就直接刷新浏览器


<br>
<br>
<br>

**博文参考**
- [https://juejin.im/entry/6844903509473640462](https://juejin.im/entry/6844903509473640462)
