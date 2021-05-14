# JS 基础篇 1

## 1. 调用栈

[JS 执行堆栈](/front-end/javascript/principle/execution)

调用栈是解释器追踪函数执行流的一种机制。当执行环境中调用了多个函数时，通过这种机制，我们能追踪到哪个函数正在执行，执行的函数体中又调用了哪个函数。

-   每调用一个函数，解释器就会把该函数添加进调用栈并开始运行。
-   正在调用栈中执行的函数还调用了其它函数，那么新函数也将会被添加进调用栈，一旦这个函数被调用，便会立即执行。
-   当前函数执行完毕后，解释器将其清除出调用栈，继续执行当前执行环境下的剩余代码。
-   当分配的调用栈空间被占满时，会引发“堆栈溢出”错误

## 4. [隐式、显式、名义与鸭子类型，宽松等于==](/front-end/javascript/base/concept2.html#_5-类型转换)

## 5. typeof 与 instanceof

-   typeof 返回类型的字符串形式
    -   原始类型：除 `null` 外，都是正常类型， `typeof null === 'object'`
    -   对象：除了函数都是 `object`
-   instanceof 判断 A 是否为 B 的实例（检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上）
    :::tip 注意
    typeof 的唯一使用场景就是判断一个对象是否已经定义或者被赋值
    :::

## 6. [this](/front-end/javascript/base/concept2.html#_2-this)，call、apply、bind

-   call 参数是一个一个的传 `call(obj, param1, param2,...)`
-   apply 参数是一个数组 `apply(obj, [param1, param2, ...])`
-   bind 绑定 this 后返回一个新函数 `bind(obj, param1, param2,...)`，前两个都是立即执行的

## 7. 函数作用域、块级作用域、词法作用域

作用域是程序源代码中定义变量的区域，是根据变量名称查找变量的一套规则。

-   **词法作用域**
    -   规则
        -   函数允许访问函数外部的数据
        -   整个代码结构中只有函数可以限定作用域
        -   作用规则首先使用提升规则分析
        -   如果当前作用域中有了名字了，就不考虑外面的名字
    -   欺骗词法
        -   [eval](/book/code/you_dont_know_javascript_1.html#_2-2-欺骗词法)、[with](/book/code/you_dont_know_javascript_1.html#_2-2-欺骗词法)
-   **[函数作用域](/book/code/you_dont_know_javascript_1.html#_3-1-函数中的作用域)**
    -   定义
        -   属于这个函数的全部变量都可以在整个函数的范围内使用及复 用(事实上在嵌套的作用域中也可以使用)
    -   使用场景
        -   规避冲突
        -   全局空间命名
        -   模块管理
    -   立即执行函数：`(function foo(){..})()`、`(function foo(){..}())`
-   **[块级作用域](/book/code/you_dont_know_javascript_1.html#_3-4-块作用域)**
    -   `{ }` 内的每一段代码都具有各自的作用域，而且变量在声明他们的代码段之外是不可见的。
    -   创建块级作用域的场景
        -   with
        -   try/catch
        -   let/const

## 8. 闭包

-   **闭包**：内部函数可以访问其所在的外部函数中声明的参数和变量（然后从执行上下文、VO、AO 的角度去解释它）
-   闭包的作用
    -   模仿块级作用域
    -   存储变量
    -   封装私有变量

## 10. [表达式和语句](https://ld246.com/article/1547453774159)

-   表达式：产生一个值
-   语句：执行一个操作

## 11. [变量提升](/front-end/javascript/principle/execution.html#_1-3-执行上下文的创建)

## 12. [Promise](/interview/js-code.html#_4-promise)
### 12.1 Promise 的第二个参数和 catch 有什么区别
- then 中抛出的异常，Promise 的第二个参数捕获不到，catch能捕获

## 13. 立即执行函数、模块化、命名空间

-   立即执行函数：`(function foo(){..})()`、`(function foo(){..}())`

## 19. 继承、多态和代码复用

-   **封装**
    -   定义：隐藏实现细节、设计细节，使得对象内部的变化对其它对象而言是不可见的，对象之间只能同归暴露的 API 接口来通信
-   **继承**
    -   定义：可以让某个类型的对象获得另一个类型对象的属性和方法
    -   JS 中实现继承的方式
        1. 构造函数绑定：使用 call 或者 apply 方法将父对象的构造函数绑定在子对象上
        2. 原型继承：
        3. 组合继承：使用原型链对原型属性和方法的继承，通过构造函数实现对实例属性的继承
-   **多态**
    -   定义：同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果
    -   作用：通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句

## 20. [按位操作符](/wiki/base/bit-operation)，[类型化数组](/front-end/javascript/base/concept.html#_3-类型化数组)

## 22. [new 一个函数发生了什么](/front-end/javascript/base/concept2.html#_4-new-操作符)

## 23. [原型继承、原型链](/front-end/javascript/base/concept2.html#_1-原型与原型链)

## 24. [Object.create，Object.assign](/front-end/javascript/base/concept.html#_4-object包含的方法)

## 25. 工厂函数和类

-   **工厂函数**
    -   定义： 指这些内建函数都是类对象，当你调用他们时，实际上是创建了一个类实例。

## 26. [设计模式](/wiki/base/design.html)

## 27. Memoization

一种优化技术，存储昂贵的函数调用的结果来加速计算机程序，并在再次发生相同的输入时返回缓存的结果。

-   **underscore 中的 memoize 函数**

```js
function memoize(func, hasher) {
    var memoize = function (key) {
        var cache = memoize.cache;
        var address = "" + (hasher ? hasher.apply(this, arguments) : key);
        if (!has(cache, address)) cache[address] = func.apply(this, arguments);
        return cache[address];
    };
    memoize.cache = {};
    return memoize;
}
```

<br>
<br>
<br>
<img src="/interview/js-base.png" class="zoom-img">
