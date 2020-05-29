# 你不知道的JavaScript(中)


## 类型

### 1.2 内置类型
- 空值(null)
- 未定义(undefined)
- 布尔值( boolean)
- 数字(number)
- 字符串(string)
- 对象(object)
- 符号(symbol，ES6 中新增)
::: tip 说明
最新的SCMAScript中对类型的定义又增加了 `BigInt` (ES10),并且 `null` 已经定义为非基本数据类型， [站内文档](/front-end/javascript/#js基本数据类型)
:::
`typeof null === "object"` 正确的返回结果应该是 "null"，但这个 bug 由来已久，在 JavaScript 中已经存在了将近 二十年，也许永远也不会修复，因为这牵涉到太多的 Web 系统，“修复”它会产生更多的 bug，令许多系统无法正常工作

判断一个值为null的具体代码实现
``` js
var a = null;
(!a && typeof a === "object"); // true
```

`typeof function(){} === 'function'`，函数是 `Object` 的一个子类型，他还拥有属性length，表示的是参数的个数