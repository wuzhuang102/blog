# 基础篇 --- JS基础概念(一)
## 1. JS基本数据类型
[最新的MDN文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

最新的ECMAScript定义了9种数据类型
- 6种基本数据
    - Boolean
    - undefined
    - Number
    - String
    - Symbol (ES6)
    - BigInt (ES10)
- null (typeof instance ===  'object') 一种特殊的原始类型
- Object
- Function

## 2. JS的规范类型
日常开发用不到，但对理解JS语言特性有很大的帮助

- List 和 Record：用于描述函数传参过程
- Set：用于解释字符集等
- Completion Record：描述异常、跳出等语句执行过程
- Reference：用于描述对象属性访问，delete等 [Reference](/front-end/javascript/wiki/this的指向以及Reference)
- Property Descriptor：描述对象的属性
- Lexical Environment 和 Environment Record：用于描述变量和作用域
- Data Block：用于描述二进制数据

## 3. 类型化数组
[类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays)是一种类似于数组的对象，并提供了一种用于访问二进制数据的机制。它分为两个部分：缓冲和视图
- **缓冲**：详当于内存空间申请
    - 使用 `ArrayBuffer` 表示一个通用的、固定长度的二进制数据缓冲区
    - `ArrayBuffer` 中的内容不能直接操作，需要宇哥类型化数组的视图或一个描述缓冲数据格式的 `DataView`，用来读取缓冲区的内容
- **视图**
    - [类型数组视图](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays#类型数组视图)有很多种类
    - [DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)是一种底层接口，提供可以操作缓冲区中任意数据的读写接口，这对操作不同类型数据的场景很有帮助

## 4. Object包含的方法
#### 1. [Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
将所有可枚举属性的值从一个或多个源对象复制到目标对象，它会改变目标对象
##### 语法
``` js
Object.assign(target,...source)
```


1. 它的拷贝只有第一层是深拷贝，后面都是浅拷贝
```js
let obj1 = { a: 0 , b: { c: 0}}; 
let obj2 = Object.assign({}, obj1);

obj2.a = 10; obj2.b.c = 3; 
console.log(JSON.stringify(obj1));  // { a: 0, b: { c: 3}} 
console.log(JSON.stringify(obj2)) // { a: 10, b: { c: 3}} 
```
2. 继承属性值和不可枚举属性是不能拷贝的
``` js
const obj = Object.create({foo: 1}, { // foo 是个继承属性。使用 Object.create 创建，存在于 obj 的原型链上
    bar: {
        value: 2  // bar 是个不可枚举属性。
    },
    baz: {
        value: 3,
        enumerable: true  // baz 是个自身可枚举属性。
    }
});

const copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }
```
3. 原始类型会被包装为对象
``` js
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo")

const obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```

#### 2. [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
创建一个新对象，使用现有的对象来提供新创建的对象的 `__proto__` 
##### 语法
``` js
Object.create(proto,[propertiesObject])
```
#### 3. [Object.defineProperties()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
定义多个属性的属性描述符
##### 语法
``` js
Object.defineProperties(obj, props)
```
#### 4. [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
只能定义单个属性的属性描述符
##### 语法
``` js
Object.defineProperty(obj, prop, descriptor)
```
| 参数         | 默认值    | 描述                                                             |
|:-------------|:----------|:-----------------------------------------------------------------|
| configurable | false     | 只有为true时，属性的描述符才能够改变,这个属性才能被删除          |
| enumrable    | false     | 为true时该属性才会出现在对象的枚举属性中`for...in` `Object.keys` |
| value        | undefined | 任何的 JavaScript 值                                             |
| writable     | false     | 为 true 时，value才可以通过赋值运算符改变                        |
| get          |           |                                                                  |
| set          |           |                                                                  |
`value` 或 `writable` 不能和 `get` 或 `set` 同时使用
#### 5. [Object.entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
返回一个给定对象自身可枚举的键值对的数组
##### 使用方法
``` js
const object1 = {
    a: 'somestring',
    b: 42
};

for (const [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`);
}
```
#### 6. [Object.freeze()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改
#### 7. [Object.fromEntries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)
把键值对列表转换为一个对象
##### 语法
``` js
Object.fromEntries(iterable);    
// iterable 是Array 、 Map 或者其它实现了可迭代协议的可迭代对象
```
#### 8. [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
##### 语法
``` js
Object.getOwnPropertyDescriptor(obj, prop)
```
返回自自有属性的属性描述符
#### 9. [Object.getOwnPropertyDescriptors](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)
所指定对象的所有自身属性的描述符

#### 10. [Object.getOwnPropertyNames()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)
返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组

#### 11. [Object.getOwnPropertySymbols()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)
返回给定对象所有的 Symbol 属性的数组

#### 12. [Object.getPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)
返回指定对象的原型

#### 13. [Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
判断两个值是否为同一个值 `===`

#### 14. [Object.isExtensible()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
判断对象（新属性、\_\_proto\_\_）是否可扩展，默认是可扩展的，`Object.preventtExtensions()`、`Object.seal()`、`Object.freeze()`都可标记一个对象不可扩展

#### 15. [Object.isFrozen()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
判断对象是否被冻结，具体参照文档

#### 16. [Object.isSealed()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
判断一个对象是否被密封，具体参照文档

#### 17. [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
方法会返回一个由一个给定对象的自身*可枚举*属性组成的数组

`Object.getOwnPropertyNames()` 获得是可枚举与不可枚举属性

#### 18. [Object.preventExtensions()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
让一个对象变的不可扩展，也就是永远不能再添加新的属性

#### 19. [Object.seal()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
封闭一个对象，阻止添加新属性并将所有属性标记为不可配置，当前属性的值只要原来是可写的就可以改变

不会影响从原型链上继承的属性。但 \_\_proto\_\_ (  ) 属性的值也会不能修改。

#### 20. [Object.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
设置一个指定对象的原型，性能不好，建议使用 Object.create()

#### 21. [Object.values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
返回一个给定对象自身的所有可枚举属性值的数组

#### 22. [Object.prototype.hasOwnProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
指示对象自身属性中是否具有指定的属性

#### 23. [Object.prototype.isPropertypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
测试一个对象是否存在于另一个对象的原型链上

#### 24. [Object.prototype.propertyIsEnumerable()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
产看指定属性是否可枚举

#### 25. [Object.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
toString() 返回 "[object type]"，它也可以被重写

##### 使用 toString() 检测对象类型
``` js
var toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]

//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
```

#### 26. [Object.property.valueOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
返回对象的原始值，具体参考官方文档
| 对象     | 返回值                                                 |
|:---------|:-------------------------------------------------------|
| Array    | 函数对象本身                                           |
| Boolean  | 布尔值                                                 |
| Date     | 存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC |
| Function | 函数本身                                               |
| Number   | 数值                                                   |
| Object   | 对象本身                                               |
| String   | 字符串值                                               |
|          | Math和 Error 对象没有valueOf方法                       |


