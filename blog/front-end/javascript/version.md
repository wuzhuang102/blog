# 基础篇 --- JavaScript版本

## 提案到入选ECMA规范
- Stage 0: strawman - 最初想法提交
- Stage 1: proposal(提案)  TC39至少一名成员倡导的正式提案文件，该文件包括API实例
- Stage 2: draft(草案) 功能规范的初始版本，该版本包含功能规范的两个实验性实现
- Stage 3: candidate(候选) 提案规范通过并从厂商那里收集反馈
- Stage 4: finish(完成) 提案准备加入SCMAScript,但到浏览器或者Node中使用还需要更多时间

## 各版本新增的功能

| ECMAScript版本        | 新增特性                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|:----------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ECMAScript 2016(ES7)  | 1. 数组的includes语法 <br>  2.Math.pow的简写语法                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ECMAScript 2017(ES8)  | 1. Async/Await <br> 2. Object.values <br> 3. Object.entries <br> 4. String.prototype.padStart <br> 5. String.prototype.padEnd <br> 6. 结尾允许逗号 <br> 7. Object.getOwnPropertyDescriptors <br> 8. SharedArrayBuffer <br> 8. Atomics                                                                                                                                                                                                                                                  |
| ECMAScript 2018(ES9)  | 1. 异步迭代器  <br> 2. Promise.finally <br> 3. Rest/Spread属性 <br> 4. 正则表达式命名捕获组 <br> 5. 正则表达式反向断言 <br>   6. dotAll 方式   <br> 7. 正则表达式Unicode转义 <br>    8. 非转义序列的模版字符串                                                                                                                                                                                                                                                                |
| ECMAScript 2019(ES10) | 1. Array添加`flat()` 和 `flatMap()`方法 <br>    2. Object.fromEntries() <br> 3. String.prototype.matchAll <br>  4. `trimStart()`  和 `trimEnd()` <br>  5. Symbol.prototype.description <br>  6. 修改catch参数绑定    <br>   7. 行分隔符`\u2028`与段分隔符`\u2029`将允许出现在字符串中与JSON匹配 <br>   8. 更加友好的JSON.stringfy <br>   9. Array.prototype.sort <br>    10. Function.prototype.toString() <br>     11. BigInt -- 第七种基本数据类型 <br>      12. globalThis |

## ES8
### 1. Async/Await
### 2. Object.values
### 3. Object.entries
`Object.entries()` 函数返回一个给定对象自身可枚举属性的键值对的数组。
``` js
Object.entries({name:1,desc:{age: 1}})
// [['name',1],['desc': {age:1}]]
```
### 4. String.prototype.padStart
### 5. String.prototype.padEnd
### 6. 结尾允许逗号
### 7. Object.getOwnPropertyDescriptors
Object.getOwnPropertyDescriptors()函数用来获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。
#### 8. SharedArrayBuffer [SharedArrayBuffer MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)
SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，类似于 ArrayBuffer 对象，它们都可以用来在共享内存（shared memory）上创建视图
### 9. Atomics
Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作

## ES9
### 1. 异步迭代器
ES9中允许我们在迭代器中使用 `async/await`
``` js
async function process(array) {   
    for await (let i of array) {     
        doSomething(i);   
    }
} 
```
### 2 Promise.finally
无论是否异常，最终都会执行的代码块
``` js
doSomething1()
    .then(doSomething2)
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        // finish here!
    });
```

### 3. Rest/Spread 属性
ES6中的 `Rest/Spread` 只用于 数组

ES9中的 `Rest/Spread` 用于数组和对象

### 4. 正则表达式命名捕获组
命名捕获组可以在`exec` `replace`中使用

常用的正则表达式来解析日月年
``` js
const date_str = '2020-05-23', 
    reg = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
const res = reg.exec(date_str)
console.log(res[1], res[2],res[3])
```
我们先现在可以在ES2018中使用命名捕获组符号 `?<name>`,捕获`()`中的数据立即命名，没有匹配到将返回 undefined
``` js
const date_str = '2020-05-23', 
    reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const res = reg.exec(date_str)
console.log(res.groups.year, res.groups.month, res.groups.day)
```
我们也可以在replace中使用
``` js
const date_str = '2020-05-23', 
    reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
date_str.replace(reg, '$<year>/$<month>/$<day>')
```
### 5. 正则表达式反向（后行）断言 
    
- 肯定反向断言 `?<=` ,表示一个值必须存在
``` js
const str = '$123',
        reg = /(?<=\D)\d+/,
        match = reg.exec(str)
console.log(match[0])  // 123
```
- 否定反向断言 `?<!`，表示一个值必须不存在
``` js
const str = '$123',
        reg = /(?<!\D)\d+/,
        match = reg.exec(str)
console.log(match[0])  // 23
```

### 6. dotAll 方式
正则表达式中 `.` 匹配除回车以外的任何单字符，标记  `s` 可以改变这种规则，允许终止符的出现
``` js
console.log(/./.test('\r\n))  // false
console.log(/./s.test('\n))  // true
console.log(/./s.test('\r))  // true
```
### 7. 正则表达式Unicode转义
ES9之前匹配汉字等Unicode编码属性需要对应编码的范围集合，现阶段添加了Unicode属性转义，为`\p{...}`或`\P{...}`,正则中使用标记`u`
``` js
const reg = /\p{Script=Han}/u
console.log(reg.test('吴某人'))  // true
```
### 8. 非转义序列的模版字符串
'\u{54}' 'C:\user\jackma' 等字符串会被浏览器自动转义，如果想输出非转义的可使用`String.raw`

## ES10
### 1. Array添加`flat()` 和 `flatMap()`方法
- Array.prototype.flat()
``` js
// flat可以拉平数组
const arr1 = [1,2,3,4, [5,6]]
console.log(arr1.flat())  // [1,2,3,4,5,6]

// flat默认拉平深度是1
const arr2 = [1,2,3,4, [5,6,[7,8]]]
console.log(arr2.flat())  // [1,2,3,4,5,6,[7,8]]

// 可指定深度，也可使用Infinity作为深度
const arr3 = [1,2,3,4, [5,6,[7,8]]]
console.log(arr3.flat(2))  // [1,2,3,4,5,6,7,8]
console.log(arr3.flat(Infinity))  // [1,2,3,4,5,6,7,8]

// flat也可用来去除空数组
const arr4 = [1,2,,null,undefined,4]
console.log(arr4.flat()) // [1,2,,null,undefined,4]
```
- Array.prototype.flatMap 相当于map方法与flat(1)的结合体
``` js
const arr1 = [1,2,3,4],arr2 = [[1],[2],[3],[4]]
arr1.flatMap(x => [x*2]) // [2,4,6,8]
arr2.flatMap(x => [x*2]) // [2,4,6,8]

// flatMap只会拉平一层,但是计算前、计算后都会拉平一次
arr1.flatMap(x => [[x*2]]) // [[2],[4],[6],[8]]
arr2.flatMap(x => [[x*2]]) // [[2],[4],[6],[8]]
```
### 2. Object.fromEntries()
`Object.fromEntries()`返回一个对象自身可枚举属性的键值对数组，其排列与`for..in`遍历对象时返回的顺序一致，区别在于`for..in`会枚举原型链中的属性
- Map 转 Object
``` js
const map = new Map([['name', 'wu'],['age', 18]])
Object.fromEntries(map)   // {name: "wu", age: 18}
```
### 3. String.prototype.matchAll
`matchAll`返回一个包含所有正则匹配表达式及捕获结果的迭代器

在`matchAll`出现之前,只能通过循环 reg.exec()来获取所有匹配的信息
``` js
const reg = /wu/g, str = 'wuzhuangwuyongwuqing'
while((match = reg.exec(str)) !== null) {
    console.log(`${match[0]} - ${reg.lastIndex}`)
}
// wu - 2
// wu - 10
// wu - 16
```
`matchAll`出现之后,可以使用 `for...of`, `array spread`, or `Array.from()` 进行迭代
``` js
const reg = /wu/g, str = 'wuzhuangwuyongwuqing'
const match = str.matchAll(reg) // RegExpStringIterator {}
for(const res of match) {
    console.log(res)
}
// ["wu", index: 0, input: "wuzhuangwuyongwuqing", groups: undefined]
// ["wu", index: 8, input: "wuzhuangwuyongwuqing", groups: undefined]
// ["wu", index: 14, input: "wuzhuangwuyongwuqing", groups: undefined]
```
### 4. `trimStart()`  和 `trimEnd()`
- String.prototype.trimStart  去除前面的空字符串
- String.prototype.trimEnd  去除尾部的空字符串

### 5. Symbol.prototype.description
之前访问的方法是将符号转换成字符串

### 6. 修改catch参数绑定
catch中的参数可以省略不写
``` js
// 之前
try{}catch(e) {}

// 现在
try{}catch{}
```
### 7. 行分隔符`\u2028`与段分隔符`\u2029`将允许出现在字符串中与JSON匹配
仍在草案阶段
``` js
const json = '{"name": "wuzhuang", "desc":"zhuang\ni"}'
JSON.parse(json)  // 会报错,业务代码中使用需要try catch处理以防影响程序运行
```
### 8. 更加友好的JSON.stringfy
如果输入 Unicode 格式但是超出范围的字符，在原先JSON.stringify返回格式错误的Unicode字符串。现在实现了一个改变JSON.stringify的第3阶段提案，因此它为其输出转义序列，使其成为有效Unicode（并以UTF-8表示
``` js
// 我们期望它返回的是'"\\UDEAD"',然而现阶段是""UDEAD""
JSON.stringify('\UDEAD')  //  ""UDEAD""
```
### 9. Array.prototype.sort
- 小于10的时候，用的是快速排序，快速排序是一种不稳定的排序 O(n^2)
- 新的v8 TimSort(),一种混合排序  o(nlogn)
### 10. Function.prototype.toString()
返回精确字符，包括空格与注释
### 11. BigInt -- 第七种基本数据类型
``` js
Number.MAX_SAFE_INTEGER   // 9007199254740991
```
### 12. globalThis 
- 可以在任何平台访问全局对象
    - chrome 71+   globalThis === window
    - node 12+    globalThis === global