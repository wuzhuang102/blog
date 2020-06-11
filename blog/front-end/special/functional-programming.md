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
### 2.1 of 方法
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
        return fs.readFileSync(filename, 'utf-8'); 
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
纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。
- **优点**
    - 可缓存
    - 可移植/自文档化
    - 可测试性
    - 合理性
    - 并行代码

### 3.2 柯里化
