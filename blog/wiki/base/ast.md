# AST
## 什么是AST
什么是AST?AST是Abstract Syntax Tree（抽象语法树）的缩写，我们可以在 [first-ast](https://resources.jointjs.com/demos/javascript-ast)中查看一个js片段具体的AST树
``` js
var a = 42;
function addA(d) {
    return a + d;
}
```
![](/wiki/ast/first-ast.jpg)
## 生成AST的过程
### 1. 分词（tokenize）
就是将代码分割成词法单元，以 `var a = 42;` 为例
``` js
[
    {type:'identifier',value:'var'},
    {type:'whitespace',value:' '},    
    {type:'identifier',value:'a'},
    {type:'whitespace',value:' '},
    {type:'operator',value:'='},
    {type:'whitespace',value:' '},
    {type:'num',value:'42'},
    {type:'sep',value:';'}
]
```
### 2. 语义分析（parse）
在分词结果之上分析这些语法单元之间的关系

生成的抽象语法树，（基于[acorn](https://www.npmjs.com/package/acorn)实现）
``` js
{
    type: 'Program',
    start: 0,
    end: 46,
    body: [
        Node {
            type: 'VariableDeclaration',
            start: 0,
            end: 10,
            declarations: [Array],
            kind: 'var'
        },
        Node {
            type: 'FunctionDeclaration',
            start: 11,
            end: 46,
            id: [Node],
            expression: false,
            generator: false,
            async: false,
            params: [Array],
            body: [Node]
        }
    ],
    sourceType: 'script'
}
```

## AST的应用
### AST in Babel
![](/wiki/ast/babel-ast.png)
#### babel代码转换步骤
1. parse：使用库 babylon 将源代码转换成 AST
2. transform：使用插件库进行代码转换
3. generate：利用代码生成工具，将 AST 转换成代码
### AST in Webpack
Webpack在打包流程中也需要AST的支持，它借助 [acorn](https://www.npmjs.com/package/acorn) 库解析源码，生成AST，提取模块依赖关系

<br>
<br>
<br>

**博文参考**
- [AST in Modern JavaScript](https://zhuanlan.zhihu.com/p/32189701)