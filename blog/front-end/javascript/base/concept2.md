# 基础篇 --- JS 基础概念(二)

## 1. 原型与原型链

1. prototype
    - 每个函数都有一个 prottotype 属性，这个属性指向函数的原型对象
    - 原型的概念：每个 javascript 对象（除 null 外）创建的时候，都会与之关联另一个对象，这个对象就是我们所说的原型
2. \_\_proto\_\_
    - 每个对象（除了 null）都有的属性，指向该对象的原型
    ```js
    function Person() {}
    let person = new Person();
    console.log(person.__proto__ === Person.prototype);
    ```
3. constructor
    - 每个原型都有一个 constructor 属性，指向该关联的构造函数
4. 实例与原型
    - 读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还找不到，就找原型的原型，一直找到顶层为止
5. 原型链 - 每个对象都有一个指向它原型(prototype)对象的内部指针（\_\_proto\_\_），这个原型对象又有自己的原型，直到某个对象的原型为 null 为止，组成这条链的最后一环。这种一级一级的链结构就成为原型链
   <img src="/front-end/js/prototype.jpg" class="zoom-img">

注意 Function.prototype.\_\_proto\_\_ === Object.prototype，别问为什么，这时 ES 规范

-   [http://www.mollypages.org/tutorials/js.mp](http://www.mollypages.org/tutorials/js.mp)
-   [**proto**和 prototype](https://github.com/creeperyang/blog/issues/9)

## 2. this

[this 的指向以及 Reference](/front-end/javascript/wiki/this的指向以及Reference)

## 3. eventloop

[eventloop](/front-end/javascript/wiki/eventloop)

## 4. new 操作符

new 运算符创建了一个用户定义的对象类型的实例或具有构造函数的内置对象的实例

-   创建一个空对象（{}）
-   链接该对象到另一个对象
-   将步骤一创建的对象作为 this 的上下文
-   如果该函数没有返回对象，则返回 this

```js
function newOperator(fn) {
    if (typeof fn !== "function") throw "the first param must be a function";
    newOperator.target = fn; // ES6 中的new.target指向的是构造函数

    let args = Array.prototype.slice.call(arguments, 1);
    let obj = {}; // 1. 创建空对象
    obj.__proto__ = fn.prototype; // 2. 链接新创建对象到函数的原型上
    // 前两步可以直接使用 Object.create(fn.prototype)
    let result = fn.apply(obj, args); // 3. 将新创建的对象作为 fn 的上下文 this
    let isObject = typeof result === "object" && result !== null;
    let isFunction = typeof result === "function";
    return isObject || isFunction ? result : obj; // 4. 如果函数没有返回对象，则创建新创建的对象
}
```

-   [MDN - new 操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

::: tip 注意
箭头函数没有 prototype（不是构造函数）、没有自己的 this 指向、不可以使用 arguments，所以无法进行 new 操作
:::

## 5. 类型转换

### 5.1 ToBoolean

-   显式转换：`Boolean`、`!!`
-   隐式转换：`if(..)`、`for(..;..;..)`、`while(..)`、`? :`、`|| &&`

1. `""`、`0(+0,-0)`、`NaN`、`null`、`undefined` 会转换成 false，其它都为 true

### 5.2 ToString

1. `null`：转换成 `"null"`
2. `undefined`：转换成 `"undefined"`
3. `Boolean`：转换成 `"true"`、`"false"`
4. `Number`：转换成 `"10"`、`"1e+21"`
5. `Array`：相当于调用 `Array.prototype.join()`，`null`、`undefined`被当空字符串处理
6. `Object`：详单于调用 `Object.prototype.toString()`，默认返回 `"[Object Object]"`

### 5.3 ToNumber

1. `null`：转换成 `0`
2. `undefined`：转换成 `NaN`
3. `String`：纯数字的字符串转成对应数字；空字符串转成 0；其它的一律按失败处理，转换 NaN
4. `Boolean`：`true` 转换成 1； `false` 转换成 0
5. `Array | Object`：先转成原始类型 ToPrimitive，再按上面的规则处理

### 5.4 ToPrimitive

对象类型转原始类型

1. 先查找对象的 `valueOf` 方法，返回的若是原始类型的值，结果就是这个值
2. `valueOf` 不存在或者返回的不是原始类型的值，就会调用 `toString` ，返回若不是原始类型的值，就会抛出异常
3. 不同类型的对象， ToPrivitive 规则有所不同， `Date` 对象会先调用 `toString`

### 5.5 宽松相等（==）时的隐式转换规则

1. 布尔与其它类型比较：布尔值先转换成数字类型
2. 数字和字符串比较：字符串会被转换成数字
3. 对象和原始类型做比较：对象依照 `ToPrimitive` 转换成原始类型
4. 两个都是对象：比较它们指向的内存是否相同
5. `null` 与 `undefined` 宽松相等，自身也宽松相等，除此之外都不相等

### 5.6 + 二元运算符

value1 + value2，两个值先都转换成原始类型

1. 左右两边有一方为字符串时，就全转为字符串计算
2. 没有字符串，就全转换成数字计算

```js
[] + {}; // '[object Object]'
{}+[]; // 0
```

## 6. for、for..of、for..in、forEach、map

1. **for** 直接对接 C 的实现，性能是最好的
2. **for...of**：遍历具有 iterator 接口的数据，循环可以中断
3. **for...in**：遍历对象自身和继承的可枚举属性、可以中断循环
4. **forEach 与 map** 只能遍历数组，且 forEach 没有返回值

## 7. 迭代器（iterator）与生成器（generator）

### 7.1 iterator

-   作用
    -   为各种数据结构，提供一个统一的、简便的访问接口
-   原生具有 iterator 接口的数据
    -   Array、Set、Map、String、函数的 arguments、NodeList 对象

### 7.2 generator

-   概念
    -   Generator 函数是 ES6 提供的一种异步编程解决方案
    -   Generator 函数是一个状态机，封装了多个内部状态
    -   Generator 函数除了状态机，还是一个遍历器对象生成函数
        -   generator 函数就是遍历器生成函数，可以把他赋值给 Symbol.iterator 属性，从而实现 iterator 功能
-   如果想让一个普通对象支持 iterator 怎么办
    ```js
    // 需要配合 generator
    Object.prototype[Symbol.iterator] = function* () {
        for ([key, value] of Object.entries(this)) {
            yield { key, value };
        }
    };
    ```
