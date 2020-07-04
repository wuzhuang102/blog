# 函数式编程

[轻量级函数式编程](https://juejin.im/post/5a2f93666fb9a045132aaaa1)  
## 1. 范畴（Category）
彼此之间存在某种关系的概念、事物、对象等等，都构成"**范畴**"
- 范畴论认为，同一个范畴的所有成员，就是不同状态的"变形"(transformation)。通过"态射"，一个成员可以变形成另一个成员
- 理理论上通过函数，就可以从范畴的一个成员，算出其他所有成员。
- 本质上，函数式编程只是范畴论的运算⽅法，跟数理理逻辑、微积分、⾏列式是同一类东⻄，都是数学⽅法，只是碰巧它能用来写程序

一个有效的范畴遵从以下三个原则：
- 必有一个 identity 态射，使得 map 一个对象是它自身。a 是范畴里的一个对象时，必有一个函数使 a -> a。
- 态射必是可组合的。a，b，c 是范畴里的对象，f 是态射 a -> b，g 是 b -> c 态射。g(f(x)) 一定与 (g ● f)(x) 是等价的。
- 组合满足结合律。f ● (g ● h) 与 (f ● g) ● h 是等价的。

`Category` 是一个类，也是一个容器，⾥面包含⼀个值( `this.val` )和一种变形关系 ( `addOne` );这里的范畴，就是所有彼此之间相差等于1的数字。
``` js
class Category {
    constructor(val) {
        this.val = val; 
    }
    addOne(x) {
        return x + 1;
    } 
}
```

## 2. 函子（Functor）
它首先是一种范畴，也就是说，是一个容器，包含了值和变形关系。比较特殊的是，它的变形关系可以依次作用于每一个值，将当前容器变形成另一个容器。

**⼀般约定，函⼦的标志就是容器具有 `map` 方法。该⽅法将容器里⾯的每⼀个值，映射到另一个容器**

`Functor` 是⼀个函⼦，它的 `map` ⽅法接受函数 `f` 作为参数，然后返回⼀个新的函子，⾥⾯包含的值是被 `f` 处理过的( `f(this.val)` )。
``` js
class Functor {
    constructor(val) {
        this.val = val; 
    }
    map(f) {
        return new Functor(f(this.val));
    } 
}
```
**学习函数式编程，实际上就是学习函⼦的各种运算**。由于可以把运算方法封装在函⼦里面，所以又衍⽣出各种不同类型的函子，有多少种运算，就有多少种函子。函数式编程就变成了运⽤用不同的函子，解决实际问题。
### 2.1 Pointed函子（f 方法）
上面代码生成函子的时候，都需要先 `new` 一次，这不太符合函数式编程的理念，因为 `new` 是面向对象编程的标志。

**函数式编程一般约定，函子有一个 `of` ⽅法，⽤来生成新的容器。**
``` js
Functor.of = function(val) { 
    return new Functor(val);
};
```
### 2.2 Maybe 函子
Maybe函子是为了解决数据异常时调用自己没有的方法时导致的处理错误

如下：当传入的 `value` 为 `null` `undefined` 等数据时，处理就会出错，Maybe 函子就是为了解决这种问题
``` js
Functor.of(null).map(function (s) { 
    return s.toUpperCase();
})  // TypeError

// Maybe   函子就是为了解决这一类问题而设计的。简单说，它的map方法⾥面设置了空值检查。
class Maybe extends Functor {
    map(f) {
        return this.val ? Maybe.of(f(this.val)) : Maybe.of(null); 
    }
}
```
### 2.3 Either 函子
函数式编程中使用 `Either`函子代替 `if...else`

Either 函⼦内部有两个值:左值(  `Left` )和右值( `Right` )。右值是正常情况下使⽤的值，左值是右值不存在时使用的默认值。
``` js
class Either extends Functor {
    constructor(left, right) { 
        this.left = left; 
        this.right = right;
    }
    map(f) {
        return this.right ? Either.of(this.left, f(this.right)) : Either.of(f(this.left), this.right); 
    }
}
Either.of = function (left, right) { 
    return new Either(left, right)
};
```
**Either函子使用场景一： 提供默认值**
``` js
Either
.of({address: 'xxx'}, currentUser.address)
.map(updateField);
```
**Either函子使用场景二： 代替 `try...catch`**<br>
左值为空，代表没有异常；左值不为空，代表异常
``` js
function parseJSON(json) {
    try {
        return Either.of(null, JSON.parse(json)); 
    }catch (e: Error) {
        return Either.of(e, null); 
    }
}
```
### 2.4 ap 函子
ap 函⼦的意义在于，对于那些多参数的函数，就可以从多个容器之中取值，实现函⼦的链式操作。
``` js
function add(x) {
    return function (y) {
        return x + y;
    };
}
Ap.of(add).ap(Maybe.of(2)).ap(Maybe.of(3));
```
### 2.5 Monad 函子
[图解 Monad](https://www.ruanyifeng.com/blog/2015/07/monad.html):Monad就是一种设计模式，表示将一个运算过程，通过函数拆解成互相连接的多个步骤。你只要提供下一步运算所需的函数，整个运算就会自动进行下去

**Monad 函⼦的作用是，总是返回⼀个单层的函子** 

上一次返回的函子就可以作为下一次 `flatMap` 中函数的输入
``` js
class Monad extends Functor {
    join() {
        return this.val; 
    }
    flatMap(f) {
        return this.map(f).join();
    } 
}
```
**Monad 函⼦子的重要应⽤用，就是实现 I/O (输⼊入输出)操作。**
``` js
// IO是一个Monad函子
var fs = require('fs');
var readFile = function(filename) {
    return new IO(function() {
        return fs.readFileSync(filename, 'utf-8'); // 把不纯的操作return出去，在外面执行
    });
};
var print = function(x) {
    return new IO(function() {
        console.log(x);
        return x; 
    });
}

var tail = function(x) {
    return new IO(function() {
        return x[x.length - 1]; 
    });
}
readFile('./user.txt').flatMap(tail).flatMap(print)
```
普通的IO操作是不纯的操作，我们基于 `Monad` 函子实现了一个 `IO` 函子, `readFile` `print` `tail` 是 `IO` 实例。

`readFile` 是纯函数，返回的是一个` IO` 函子，`flatMap` 返回的也是一个IO函子，这样就可有一直链式调用下去，用上一个 `flatMap` 的输出作为下一个 `flatMap` 中函数的输入

## 3. 函数式编程专业术语
较详细的 [函数式编程术语](https://github.com/shfshanyue/fp-jargon-zh)
### 3.1 纯函数
对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。
- **优点**
    - 可缓存
    - 可移植/自文档化
    - 可测试性
    - 合理性
    - 并行代码
- **缺点**
    - 硬编码在函数内部的参数可扩展性差

### 3.2 柯里化
#### 3.2.1 幂等性
幂等性是指执行无数次后还具有相同的效果
#### 3.2.2 偏函数
传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数
``` js
// partial带一个函数参数和 该函数的部分参数
const partial = (f, ...arg) => (...moreArg) => f(...arg, ...moreArg)

const add3 = (a, b, c) => a + b + c
// 偏函数bind实现
const add1More = add3.bind(null, 2, 3) // c => 2 + 3 + c
```
#### 3.2.3 柯里化
通过偏函数实现，它是一个把多参数函数转换成一个嵌套一元函数的过程。
``` js
var checkage = (min, age) => age > min

// 柯里化
var checkage = min => age => age > min
var checkage18 = checkage(18)
checkage18(20)
```
**优点：** 事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这些参数的新函数，从某种意义上讲，这是一种对参数的缓存。

#### 3.2.4 反柯里化
与柯里化相反，扩大使用范围，创建一个应用范围更广的函数。使原本只有特定对象才适用的方法，扩展到更多对象。
``` js
// 反柯里化，使Object拥有Array的push方法
Function.prototype.unCurrying = function() {
    var self = this
    return function() {
        // 第一个参数（arguments[0]）是需要操作的Object
        var obj = Array.prototype.shift.call(arguments) 
        return self.apply(obj,arguments)
    }
}

var push = Array.prototype.push.unCurrying(),
    obj = {}
push(obj, 'wu', 'zhuang')
console.log(obj)
```


### 3.3 函数组合(compose)
``` js
function compose() {
    var fns = [].slice.call(arguments)
    return function (initialArg) {
        var res = initialArg
        for (var i = fns.length - 1; i > -1; i--) {
            res = fns[i](res)
        }
        return res
    }
}
```
**Point Free：** 定义函数时，不显式地指出函数所带参数。这种风格通常需要柯里化或者高阶函数。也叫 Tacit programming

#### 函数组合子



### 3.4 声明式与命令式
**声明式：** 通过写表达式的方式来声明我们像干什么，而不是一步步的指示

**命令式：** 通过一条又一条的指令让计算机去执行一些操动作，这其中会涉及到很多繁杂的细节

**优点**
- 可以不考虑函数内部是如何实现的，专注于编写业务代码
- 优化代码是，目光只要集中在这些稳定坚固的函数内部即可

### 3.5 惰性链、惰性求值、惰性函数
- _chain(数据).map().reverse().value(): 惰性链可以添加一个输入对象的状态，从而能将这些输入转换为所需的输出操作链接在一起；它可以避免任何变量的创建，并且消除所有的循环，且在最后调用value之前不会执行任何的操作。
``` js
// _.chain可以推断可优化点，如合并执行或存储优化
// 合并函数执行、压缩计算过程并使用临时函数数据结构降低内存占用

// 三个基本函数
const trace = masg => console.log(msg)
let square = x => Math.pow(x,2),
    isEven = x => x % 2 === 0;

// 使用组合子 追踪函数执行
square = _.compose(_.tap(() => { trace('map函数') }), square);
isEven = _.compose(_.tap(() => { trace('filter数组')}), isEven);

const numbers = _.range(200);
const result = _.chain(numbers)
    .map(square)
    .filter(isEven)
    .take(3)
    .value();
// shortcut fusion 技术把map和filter融合  
//      _.compose(filter(isEven),map(square)) --->  filter(x => isEven(square(x)))
```
- 惰性求值：当输入很大但只有一个小的子集有效时，避免不必要的函数调用。
- 惰性函数：加入一个函数被大量复用，并且这个函数内部又有许多判断来检测函数，这样调用会浪费时间和资源，所有当第一次判断完成后，直接把这个函数改写，不再需要判断。
    - 惰性函数经典应用：ajax
``` js
function createXHR() {
    var xhr;
    if (typeof XMLHttpRequest != 'undefined') {
        xhr = new XMLHttpRequest();
        createXHR = function () {
            return new XMLHttpRequest();
        }
    } else {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
            createXHR = function () {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
                createXHR = function () {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
            } catch (e) {
                createXHR = function () {
                    return null;
                }
            }
        }
    }
    return xhr
}
```

### 3.6 尾递归 与 尾调用
- **尾调用**
    - 函数的最后一个动作是函数调用，并将其返回值直接返回给函数，就叫尾调用。

- **尾递归**
    - 函数是调用自身，称为递归；如果是尾调用自身，就称为尾递归。
    - 递归需要保存大量的调用记录，很容易发生栈溢出；**如果使用尾递归优化，保存一个调用记录，将递归变为循环，就不会发生栈溢出错误了**。
    - 尾递归不容易爆栈，但不一定不爆栈
    ``` js
    // 斐波那契数列
    function factorial(n) { // 不是尾递归
        if(n===1) { return 1 }
        return n * factorial( n - 1 );
    }

    function factorial( n, total ) { // 尾递归
        if(n === 1) { return total }
        return factorial( n - 1, n * total )
    }
    ```
    - // something todo

## 4 函数式编程库
### 4.1 RxJS
- rxjs 中所有外部输入都被视为事件流
- 它的响应式编程（Functional Reactive Programming, FRP）理念非常先进，虽然使用不频繁，但可以了解
- rxjs中把拥有副作用的操作都留给了订阅者
### 4.2 cycleJS
- cyclejs是在rxjs的基础上发展出来的，加入了 virtual dom、jsx语法。
### 4.3 lodashJS
- lodash 具有一致接口、模块化、高性能，是underscore的fork；最初的目标也是一致的跨浏览器行为
- lodash 采用延迟计算，链式调用方法在value()调用之前是不会执行的。
### 4.4 underscoreJS
- 
### 4.5 ramdaJS
- Ramda的数据一律放在最后一个参数，理念是“function first, data last”。
- Ramda提供的函数都是curry的，所有多参数的函数，都可以单参数传递




