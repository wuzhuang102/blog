# 面向切面编程（AOP）

## 定义
**面向切面编程**（Aspect-oriented programming，AOP）是一种编程范式：是指在运行时，动态地将代码切入到类地指定方法、指定位置上的编程思想。

## AOP 周边概念
### 1. 函数切面
ES6 之前，都是使用 before、after 做函数的两个切面，在ES6+ 同装饰器的概念
``` js
Function.prototype.before = function(func) {
    var _self = this;
    return function() {
        if(func.apply(this, arguments) === false) {
            return false
        }
        return _self.apply(this, auguments)
    }
}

Function.prototype.after = function(func) {
    var _self = this;
    return function() {
        var res = _self.apply(this, arguments)
        if(res === false) {
            return false
        }
        func.apply(this, arguments)
        return res
    }
}
```
### 2. 装饰器
[装饰器](https://es6.ruanyifeng.com/#docs/decorator)：装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类。

装饰器只能用于class 及 其属性，不能用于函数
``` js
@testable
class MyTestableClass {
    // ...
}

function testable(target) {
    target.isTestable = true;
}
```

## 实例
### 1. 防止 window.onload 被二次覆盖
``` js
window.onload = (window.onload || function() {})
    .before(function() { /*   */})
window.onLoad = (window.onload || function() {})
    .after(function() { /*   */ })
```
### 2. 无侵入的代码统计
``` js
function doSomething() {
    // ...
}

doSomething.before(function() {
    startTime = new Date()
}).after(function() {
    endTime = new Date()
})()
console.log('time waste：' + endTime - startTime
```
### 3. 分离表单请求和校验
```js
var validate_rules = {
    not_empty: function(value) { return value !== '' },
    maxLength: function(value) { return value && value.length > 8 }
}

var validata = function() {
    for(var i in validate_rules) {
        if(validate_rules[i].apply(this, arguments) === false) {
            return false
        }
    }
}

var send = function(value) {
    if(validata(value) === false) { return; }
    // ...
}
```
### 4. 给 ajax 请求动态添加参数
```js
var send = function(type, params) {
    ajax[type].send(params)
}
send = send.before(function(type, param) {
    param.retype = type
})
```
### 5. 职责链模式
职责链模式在 js 中典型的应用场景是事件冒泡. 将所有子节点和父节点连成一条链，并沿着这条链传递事件，直到有一个节点能够处理它为止. 职责链模式是消除过多的 if else 语句的神器.
```js
Function.prototype.after = function(func) {
    var _self = this;
    return funciton() {
        var res = _self.aplly(this. arguments)
        if(res) { return res }
        return func.apply(this, arguments)
    }
}
doSomething.after(getH5).after(getFlash)
```
### 6. 组合代替继承