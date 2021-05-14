# JS 基础篇 2

## 1. [0.1 + 0.2 === 0.3 ？](https://juejin.cn/post/6844904012995624967)

1. 0.1 、0.2 转换成二进制是无限循环的
2. JS 中， 小于 `Number.EPSILON` 的数是可以忽略不计的
3. Number 能表示最大的数是 Math.pow(2,53) - 1，超出会截断

## 2. Symbol 有什么用处

1. 命名冲突
    - Symbol 创建的值永不相等，这样就不会存在命名冲突、数据覆盖的问题
2. 私有属性
    - Symbol 创建的 key，不会出现在 Object.keys 中，只能通过 Object.getOwnPropertySymbols() 获取，可以实现私有属性的目的

## 3. 箭头函数

1. 箭头函数没有 this、prototype、arguments、super、new.target 以及 construct 方法，无法进行 new 的

## 4. Promise 与 async-await 与 generator

-   **定义说明**
    -   **Promise**
        -   Promise 代表一个异步操作，有三种状态：pending、fulfilled、rejected
    -   **async/await**
        -   async 是声明语句，定义一个返回 AsyncFunction 对象的异步函数，通过一个隐式的 Promise 返回结果
        -   await 是表达式，表示暂停当前异步函数的执行，等待 Promise 处理完成
        -   async/await 就是 generator/yield/promise/自动执行 的语法糖
    -   **generator**
        -   generator 是一个状态机； 也是一个遍历对象生成函数
-   **区别与联系**
    -   区别
        -   promise 错误无法在外部被捕捉到，只能在内部预判处理；async/await 能在异步代码中像同步代码一样使用 try-catch 捕获错误
        -   promise 是一个状态机，本身是无法完全终止的； async function 使用语义化的 await 中断程序
    -   联系
        -   async/await 简化使用多个 promise 时的同步行为

## 5. CommonJS、ESModule、AMD、CMD

-   **CommonJS**
    -   四个重要的环境变量为模块化的实现提供支持：module、exports、require、global
    -   采用同步(动态)的方式加载模块
    -   `exports` 本身是一个变量（对象），是 `{}` 的引用，它指向 `module.exports` 的 `{}` 模块，只能使用 `.` 语法向外暴露变量
    -   `module.exports`：`module` 是一个变量，指向一块内存，`exports` 是 `module` 中的一个属性
-   **ES Module**
    -   使用 `import`、`export`
    -   ES Modlule 是静态加载，可在在打包时静态分析掉
-   **AMD**（require.js）
    -   异步方式加载模块：`definde()`定义模块，`require()`加载模块
    -   AMD 在实现时，会在第一时间加载并执行模块内的代码
-   **CMD**（sea.js）
    -   CMD 讲究依赖就近，延迟执行

*   CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用,且是 read-only 的。
*   CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
*   CommonJs 是单个值导出，ES6 Module 可以导出多个
*   CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层
*   CommonJs 的 this 是当前模块，ES6 Module 的 this 是 undefined

## 6. WeakMap 与 WeakSet

**WeakMap 与 WeakSet 的键只能使用对象**，而 Map、Set 的键却可以是还可以是原始类型，这主要是为了垃圾回收处理的

-   WeakMap 与 WeakSet 键仅为对象，并且在其它方式无法访问这个对象时，便会将与它们关联的值一同删除
-   由于是弱引用关系， 他们的 key 都是不可枚举的，也没有 size、length 等属性

## 7. ES5 与 ES6 中继承的区别

-   ES5 中实例属性的继承主要靠 A.call(this) 实现， ES 中通过 super

## 8. JS 中创建异步任务的方式

1. 回调函数
2. 事件监听
3. 发布订阅
4. Promise
5. Generator
6. async/await

## 9. Reflect.ownKeys() 与 Object.keys()

```js
Reflect.ownKeys();
// 等于 Object.getOwnPropertyNames() + Object.getOwnPropertySymbols();

Object.keys();
// 只能获取可枚举属性
```

## 10. JS 实现继承的 6 种方式

```js
function Person(name) {
    this.name = name;
    this.sum = function () {
        console.log(this.name);
    };
}
Person.prototype.age = 10;
```

1. **原型链继承**

-   让新实例的原型等于父类的实例

```js
function Per(name) {
    this.name = name; //
}
Per.prototype = new Person();
var per1 = new Per("wz");
```

2. **构造函数继承**

```js
function Per(name) {
    Person.call(this, name); // 继承父类
    this.age = 22;
}
var per2 = new Per("wz");
```

3. **组合继承**

```js
function SubPer(name) {
    Person.call(this, name);
}
SubPer.prototype = new Person();
var per3 = new SubPer("wz");
```

4. **原型式继承**

```js
function wrap(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
}
var sup = new Person("wz");
let per4 = wrap(sup);
```

5. **寄生式继承**

6. **寄生组合式继承**（常用）

```js
function superClass() {}
function subClass(opt) {
    superClass.call(this, opt);
}

function inheritObject(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function inheritPrototype(subClass, superClass) {
    let p = inheritObject(superClass.prototype);
    p.constructor = superClass;
    subClass.prototype = p;
}
```
