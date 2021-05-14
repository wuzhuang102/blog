---
sidebar: auto
---

# this的指向以及Reference

## Reference 是什么
ECMAScript 将 Reference 定义为被解析的命名绑定（resolved name binding）,由三个部分组成 ----- base、name、strict flag

- 创建Reference的两种方法
    - 标识符解析
    - 属性访问
- 每个被创建的Reference都会拥有base、name、strict三个属性
    - base 为property对象或环境记录(environment record)
    - propertyName 为标识符或属性名
    - strict 表示是否开启了严格模式
- Reference 规范还提供了获取其组成部分的方法(这个是js底层实现上，在真正的js代码中是没有这些方法的)[8.7The Reference Specification Type](https://es5.github.io/#x8.7)
     - GetBase
        - 返回reference 的 base value
     - IsPropertyReference
        - 返回是否是一个对象
- GetValue [8.7.1 GetValue](https://es5.github.io/#x8.7.1)
    - 返回的是一个具体的值，而不是一个Reference


## 如何确定this的值
### 函数调用。如何确定this的取值 
[11.2.3 Function Call](https://es5.github.io/#x11.2.3)
1. Let ref be the result of evaluating `MemberExpression`.
6. If Type(ref) is Reference, then
    - If `IsPropertyReference`(ref) is true, then
        - Let `thisValue` be `GetBase`(ref).
    - Else, the base of ref is an `Environment Record`
        - Let `thisValue` be the result of calling the ImplicitThisValue concrete method of `GetBase`(ref).
7. Else, Type(ref) is not Reference.
    - Let `thisValue` be `undefined`.

简而言之
1. 计算 MemberExpression 的结果赋值给 ref
6. 判断 ref 是不是一个 Reference 类型
    - 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
    - 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)
    - 如果 ref 不是 Reference，那么 this 的值为 undefined


### MemberSxpression的类型
- PrimaryExpression
- FunctionExpression
- MemberExpression [ Expression ]
- MemberExpression . IdentifierName
- new MemberExpression Arguments


1. Property Accessors  [11.2.1 Property Accessors](https://es5.github.io/#x11.2.1)
    - 返回的是Reference
2. The Grouping Operator(( )) [11.1.6 The Grouping Operator ](https://es5.github.io/#x11.1.6)
    - This algorithm does not apply GetValue to the result of evaluating Expression
3. Simple Assignment (=) [11.13.1 Simple Assignment](https://es5.github.io/#x11.13.1)
    - 计算过程中使用了 GetValue, 返回的是值，不是Reference,所以this指向undefined
4. Binary Logical Operators (||) [11.11 Binary Logical Operators](https://es5.github.io/#x11.11)
    - 计算过程中使用了 GetValue
5. Comma Operator (,) [11.14 Comma Operator](https://es5.github.io/#x11.14)
    - 计算过程中使用了 GetValue


| demo                      | Reference? | remarks |
|:--------------------------|:-----------|:-|
| "foo"                     | No         |  |
| 123                       | No         |  |
| /xcf/                     | NO         |  |
| (false \|\| foo.bar)          | NO         |  非运算,GetValue 得到一个新值|
| (1,foo.bar)               | NO         | 逗号运算符，GetValue 得到一个新值 |
| (f=foo.bar)               | NO         | 赋值操作， GetValue 得到一个新值 |
| function(){}              | NO         |  |
| foo                       | YES        |
| foo.bar()                 | YES        |  |
| (foo)                     | YES        |  |
| (foo.bar)                 | YES        |  |
| (123).toString()          | YES        |  |
| (function(){}).toString() | YES        |  |


``` js
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
foo.bar();
//示例2
(foo.bar)();
//示例3
(foo.bar = foo.bar)();
//示例4
(false || foo.bar)();
//示例5
(foo.bar, foo.bar)();
```
<details>
<summary>点击查看答案</summary>

``` js
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
foo.bar(); // 2
//示例2
(foo.bar)(); // 2
//示例3
(foo.bar = foo.bar)(); // 1
//示例4
(false || foo.bar)(); // 1
//示例5
(foo.bar, foo.bar)(); // 1
```

</details>






[博文参考 JavaScript深入之从ECMAScript规范解读this](https://github.com/mqyqingfeng/Blog/issues/7)

[博文参考 从this指向到Reference类型](https://www.cnblogs.com/fayin/p/11044368.html)