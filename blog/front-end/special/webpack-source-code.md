---
sidebar: auto
---
# Webpack 源码实现
## 简单的入门
**第一步**：新建两个存在调用关系的js文件
``` js
// src/index.js
const fn = require('./test.js')
fn()

// src/test.js
const fn = () => {
    console.log('你当像鸟飞往你的山')
}
module.exports = fn
```
**第二步**：编写 simple-webpack.js 文件

simple-webpack.js 的作用是将需要打包的文件处理成成一定的格式，通过固定模版输出到指定文件夹
``` js
// Webpack 主运行流程
// Compiler(tapable) --> Compilation --> Chunk --> Module --> runloaders() --> Dependency(AST)  --> Template
const fs = require('fs')
const ejs = require('ejs')

let input = './src/index.js'
let output = './dist/hello.js'
let dependency = []
const getEntry = fs.readFileSync(input, 'utf-8')
const dealEntry = getEntry.replace(/(require)\(['"](.+?)['"]\)/g, ($1, $2, $3, $4) => {
    let cont = fs.readFileSync($3, 'utf-8')
    dependency.push(cont)
    return $2 = `__webpack_require__(${dependency.length})`
})

// 编译模版，使用ejs插入打包后的js代码
let template = `
(function (modules) {
    function __webpack_require__(moduleId) {
        const module = {
            exports: {}
        }
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports
    }
    return __webpack_require__(0)
})([
    (function (module, exports, __webpack_require__) {
        <%- dealEntry %>
    }),
    <% for(var i = 0; i< dependency.length; i++) { %>
        (function(module, exports) {
            <%- dependency[i] %>
        }),
    <% } %>
])
`
let result = ejs.render(template, {
    dealEntry,
    dependency
})
fs.writeFileSync(output, result)
```
**第三步：** 执行simple-webpack.js，生成打包文件
``` js
// 代码中出现的0、1是模块文件的moduleId，webpack中是用模块文件相对项目根路径作为moduleId的
(function (modules) {
    function __webpack_require__(moduleId) {
        const module = {
            exports: {}
        }
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports
    }
    return __webpack_require__(0)
})([
    (function (module, exports, __webpack_require__) {
        const a = __webpack_require__(1)
        a()
    }),
    (function (module, exports) {
        const a = () => {
            console.log('wuzhuang')
        }
        module.exports = a
    }),
])
```

这里的代码只是将 require 换成了 __webpack_require__ 函数，实现的时候应该还要替换 module.exports 
