# AMD、CMD、CommonJs、ES6
它们都是用于在模块化定义中使用的，AMD、CMD、CommonJs 是 ES5 中提供的模块化编程方案， import/export 是ES6 中新增的
## 模块化
### 模块化
是一种处理复杂系统分解为代码结构更合理，可维护性更高的可管理的模块化方式

- 无模块
```js
<script src="jquery.js"></script> 　　
<script src="jquery_scroller.js"></script> 
```
**优点**：相比使用一个JS，这种多个JS文件实现最简单的模块化的思想是进步的

**缺点**：1. 污染全局作用域 2. 对于大型项目，需要手动解决模块和代码库的依赖关系，后期维护成本较高，依赖关系不明显

## AMD
AMD 规范，即 Asynchronous Module Definition（异步模块化定义）,它是定义在浏览器端模块化开发的规范

**模块定义**：模块通过 `define` 函数定义在闭包
``` js
define( id?:String, dependencies?:String[], factory: Function|Object );
```
- id 是模块的名字，一个没有定义id 只的匿名模块，通常作为应用的启动函数；
- dependencies 制定了依赖的模块列表，他的默认值是 ['require','exports','module']；
- 每个依赖模块的输出将作为参数一次传入 factory 中

**模块使用**
```js
require(['myModule'], function(myModule) {});
```

## CMD
[CMD 模块化规范](https://github.com/seajs/seajs/issues/242)

**模块化定义**

CMD规范的 define 只支持传入一个参数 `factory: Function|Object|String`
``` js
define(function(require, exports, module) {
  // 模块代码
});
```
CMD推崇依赖就近，只有用到某个模块再去 require 它，而AMD推崇依赖前置，在定义时就要声明依赖的模块

## CommonJS
CommonJS是在浏览器之外环境构建 JavaScript 生态系统为目标而生的项目，例如桌面端 和 服务器端

**模块化定义**
模块必须通过 module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中。

``` js
// moduleA.js
module.exports = function( value ){
    return value * 2;
}

// moduleB.js
var multiplyBy2 = require('./moduleA');
var result = multiplyBy2(4);
```

## ES6
ES6 中使用 export/import 对模块化进行导入导出