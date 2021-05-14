# 原理篇 --- JavaScript 执行堆栈详解
## 1. 基本概念
JavaScript 代码执行时会将不同的变量存于内存中不同位置：堆（heap）和栈（stack）来区分。
- **堆**用来存放一些对象，
- **栈**则存放一些基础类型变量以及对象的指针
### 1.1 执行上下文的类型
- **全局执行上下文**（Global Context，GO）：JS在执行可执行的脚本时，首先会创建一个全局执行上下文
- **函数执行上下文**（Execution Context, EC）：JS执行在遇到函数时就会创建一个函数执行上下文
- **Eval 函数执行上下文**：`eval` 函数中运行的代码，不建议使用
### 1.2 执行栈
当可执行程序存在很多函数调用，就会创建很多 EC，此时 JS 引擎就会创建**执行上下文栈**（Execution Context Stack, ECS）来管理 EC。
函数调用完成后，JS会退出这个执行环境并把这个执行环境销毁，回到上一个方法的执行环境，循环往复，直到执行栈代全部执行完毕。

浏览器解释器执行js是单线程的过程，这就意味着同一时间，只能有一个事件在进行。其它的活动和事件只能排队等候，生成一个等候队列的**执行栈**（Exection Stack）
### 1.3 执行上下文的创建
#### 1.3.1 创建阶段
1. **this binding**，确定 `this` 的值
    - **全局上下文**中，`this` 指向全局对象，浏览器中指向 `window`，`nodejs` 中 指向本文件的 `module` 对象
    - **函数执行上下文**中，`this` 的值取决于函数的调用方式，有：默认绑定、隐式绑定、显示绑定、 `new` 绑定、箭头函数
2. **LexicalEnvironment**（词法环境）被创建
    - 词法环境的两个组成部分
        - **环境记录**：存储变量和函数声明的实际位置
        - **对外部环境的引用**：可以访问外部的词法环境
    - 词法环境的两种类型
        - **全局环境**：是一个没有外部环境的词法环境，拥有一个全局对象及关联的方法和属性以及任何用户自定义的全局变量，`this` 指向这个全局变量
        - **函数环境**：用户在函数中定义的变量被存储在环境记录中，包含 `arguments` 对象。对外部环境的引用可以是全局环境，也可以是包含内部的外部函数环境
3. **VariableEnviroment**（变量环境）被创建
    - 变量环境也是一个词法环境

:::tip 注意
变量提升的原因：创建阶段，函数声明存储在环境中，而变量会被设置为 `undefined`(var) 或者 未初始化（let、const）
:::
ES6 中let const 不存在变量提升的问题， 并且产生了块级作用域。在块级作用域中，变量在声明之前的区域被称为暂时性死区。任何在暂 时性死区内访问变量的企图都会导致“运行时”错误(runtime error)。只有执行到变量的声明 语句时，该变量才会从暂时性死区内被移除并可以安全使用。
#### 1.3.2 执行阶段
完成所有变量的分配，最后执行代码

- 执行栈（Execution Context Satck）
- 全局对象（Global Context）
- 活动对象（Activation Object）
- 变量对象（Variable Object）
- 全局上下文（Global Execution Context）
- 执行上下文（Execution Context）
- 垃圾回收（Garbage Colletion）
- 词法环境（Lexical Environment）
- 变量环境（Variable Environment）
- 环境记录（Environment Record）

## 2. 执行栈压栈顺序
代码刚执行时，便确定了一个全局执行上下文（Global Execution Context）作为默认值，如果在全局环境中调用了其它函数，程序将会创建一个新的 EC，并将这个 EC 推入执行栈中
### 2.1 压栈过程
随着代码的执行 三个函数会被依次押入执行栈中
``` js
function fun3() { 
    console.log('fun3')
}
function fun2() {
    fun3(); 
}
function fun1() {
    fun2();
}

fun1(); 
//执行fun1 结果如下 
ECStack = [
    fun3,
    fun2,
    fun1,
    globalContext
];
```
### 2.2 变量对象（Variable Object）
变量对象 VO 是与执行上下文相关的特殊对象，用来存储上下文的函数声明、函数的形参和变量
- 变量对象 VO 存储上下文中包含以下内容
    - 函数声明，不包含函数表达式
    - 函数形参
    - 变量声明–注意 `b=10` 不是变量，但是 `var b = 10;` 是变量，有变量声明提升
``` js
var a = 30
function test(x) {
    var b = 20
}
test(30)

// -----------------  解释区  ------------------
// 全局执行上下文
VO(globalContext) = {
    a: 10,
    test: <reference to funtion>
}

// test 函数上下文
VO(text functionContext) = {
    x: 30,
    b: 20
}

// VO 分为全局上下文的对象 VO，函数上下文的变量对象 VO
VO(globalContext) === global;
```
### 2.3 活动对象（Activation Object）
函数上下文中，变量对象被表示为活动对象 AO，当函数被调用后，这个活动对象就被创建了。它包含普通参数与特殊参数对象
- 函数执行上下文中， VO 是不能直接访问的，此时由活动对象 AO 扮演 VO 的角色
    - Arguments 对象包括的如下属性：callee、length
    - 内部定义的函数
    - 绑定上的对应环境变量
    - 内部定义的变量
- AO 分两个阶段：创建阶段和执行阶段，我们现阶段是创建阶段
``` js
function test(a, b) {
    var c = 10;
    function d() {}
    var e = function _e() {}; 
    (function x() {});
}
test(10)

// -----------------  解释区  ------------------
VO(functionContext) === AO; 
AO(test) = {
    a: 10,
    b: undefined,
    c: undefined,
    d: <reference to FunctionDeclaration "d"> ,
    e: undefined
};
// AO里并不包含函数“x”。这是因为“x” 是一个函数表达式(FunctionExpression, 缩写为 FE) 而不是 函数声明，函数表达式不会影响VO
```
### 2.4 深度活动对象（Activation Object）
``` js
function foo(i) {
    var a = 'hello';
    var b = function privateB() { };
    function c() {}
}
foo(22);
```
#### 1. 创建阶段
``` js
fooExecutionContext = {
    scopeChain: { Scope },
    AO: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c(),
        a: undefined,
        b: undefined
    },
    VO: {..},
    Scope: [AO, globalContext.VO],
}
```
#### 2. 执行阶段
``` js
fooExecutionContext = {
    scopeChain: { ... },
    AO: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c(),
        a: 'hello',
        b: pointer to function privateB(),
    },
    VO: {..},
    Scope: [AO, globalContext.VO], this: { 运行时确认 }
}
```
### 2.5 补充活动对象（Activation Object）
``` js
var x = 10; 
function foo() {
    var barFn = Function('alert(x); alert(y);');
    barFn(); // 10, "y" is not defined 
}
foo();

// -----------------  解释区  ------------------
// 1. 通过函构造函数创建的函数的[[scope]]属性总是唯一的全局对象(LexicalEnvironment)。
// 2. Eval code - eval 函数包含的代码块也有同样的效果
```
## 总结
- 闭包的原理是Scope(堆空间中存储closure(foo))，
- this的原理是动态绑定，
- 作用域链 的原理是Scope: [AO, globalContext.VO],
- eval不能回收的原理是推不进AO,
- 变量提升的原理是AO的准备阶段，
- 异队列的原理是ECS.