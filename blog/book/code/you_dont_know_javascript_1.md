# 你不知道的JavaScript(上)

# 第一部分

## 1. 作用域是什么

### 1.1 编译原理
传统编译语言的编译流程
- 分词/词法分析
- 解析/语法分析
- 代码

比起那些编译过程只有三个步骤的语言的编译器，JavaScript 引擎要复杂得多。例如，在 语法分析和代码生成阶段有特定的步骤来对运行性能进行优化，包括对冗余元素进行优化 等。
### 1.2 理解作用域
var a = 2
1. 遇到 var a，编译器会询问作用域是否已经有一个该名称的变量存在于同一个作用域的 集合中。如果是，编译器会忽略该声明，继续进行编译;否则它会要求作用域在当前作 用域的集合中声明一个新的变量，并命名为 a。
2. 接下来编译器会为引擎生成运行时所需的代码，这些代码被用来处理 a = 2 这个赋值 操作。引擎运行时会首先询问作用域，在当前的作用域集合中是否存在一个叫作 a 的 变量。如果是，引擎就会使用这个变量;如果否，引擎会继续查找该变量(查看 1.3 节)。
#### 1.2.3 编译器有话说
LHS 查询: 当变量出现在赋值语句的**左侧**时进行的查询<br>
RHS 查询: 当变量出现在赋值语句的**右侧**时进行的查询(retrieve his source value)

### 1.3 嵌套作用域
**遍历嵌套作用域链的规则**：引擎从当前的执行作用域开始查找变量，如果找不到， 就向上一级继续查找。当抵达最外层的全局作用域时，无论找到还是没找到，查找过程都 会停止。

### 1.4 异常

对一个非函数类型的值进行函数调用，或着引用 null 或 undefined 类型的值中的 属性，那么引擎会抛出另外一种类型的异常，叫作 TypeError

ReferenceError 同作用域判别失败相关，而 TypeError 则代表作用域判别成功了，但是对结果的操作是非法或不合理的。

:::tip 注意
非严格模式下，RHS查询不到对应的变量时，就会抛出 ReferenceError错误；LHS查询找不到对应变量时，就会在全局作用域中创建一个对应的变量
:::

## 2. 词法作用域
### 2.1 词法阶段
词法作用域查找只会查找一级标识符，比如 a、b 和 c。如果代码中引用了 foo.bar.baz， 词法作用域查找只会试图查找 foo 标识符，找到这个变量后，对象属性访问规则会分别接 管对 bar 和 baz 属性的访问。
### 2.2 欺骗词法
欺骗词法作用域会导致性能下降。<br>
在程序中动态生成代码的使用场景非常罕见，因为它所带来的好处无法抵消性能上的损失。
#### 2.2.1 eval
非严格模式下，eval中的执行的代码作用域就是eval函数所处的作用域
严格模式下，eval执行的内容有着自己独特的作用域
#### 2.2.2 with
with 通常被当作重复引用同一个对象中的多个属性的快捷方式，可以不需要重复引用对象 本身。
``` js
function foo(obj) { 
    with (obj) {
        a = 2; 
    }
}
var o1 = { a: 3 };
var o2 = { b: 3 };
foo( o1 );
console.log( o1.a ); // 2

foo( o2 );
console.log( o2.a ); // undefined
console.log( a ); // 2——不好，a 被泄漏到全局作用域上了!
```
o1中有a属性，在LHS查询时，在o1作用域中会直接操作<br>
o2中没有a属性，就会向上级作用域查询，直到在全局作用域中没有找到，非严格模式下直接创建了 `var a` 的全局变量, 
#### 2.2.3 性能
**JavaScript 引擎会在编译阶段进行数项的性能优化**。其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。<br>
**`eval` `with` 的出现让JavaScript跳过了这种性能优化**，它只能简单地假设关于标识符位置的判断 都是无效的，因为无法在词法分析阶段明确知道 eval(..) 会接收到什么代码，这些代码会 如何对作用域进行修改，也无法知道传递给 with 用来创建新词法作用域的对象的内容到底 是什么。

## 3. 函数作用域和块作用域
### 3.1 函数中的作用域
**函数作用域**的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复 用(事实上在嵌套的作用域中也可以使用)
### 3.2 隐藏内部实现
有很多原因促成了这种基于作用域的隐藏方法。它们大都是从最小特权原则中引申出来 的，也叫最小授权或最小暴露原则。<br>
这个原则是指在软件设计中，应该最小限度地暴露必 要内容，而将其他内容都“隐藏”起来，比如某个模块或对象的 API 设计。

#### 规避冲突
“隐藏”作用域中的变量和函数所带来的另一个好处，是可以避免同名标识符之间的冲突， 两个标识符可能具有相同的名字但用途却不一样，无意间可能造成命名冲突。冲突会导致 变量的值被意外覆盖。
##### 全局命名空间
变量冲突的一个典型例子存在于全局作用域中。当程序中加载了多个第三方库时，如果它 们没有妥善地将内部私有的函数或变量隐藏起来，就会很容易引发冲突。
##### 模块管理
另外一种避免冲突的办法和现代的模块机制很接近，就是从众多模块管理器中挑选一个来 使用。使用这些工具，任何库都无需将标识符加入到全局作用域中，而是通过依赖管理器的机制将库的标识符显式地导入到另外一个特定的作用域中。
### 3.3 函数作用域
直接声明函数会造成全局污染，但是函数表达式 `(function foo() {...})` 可以解决这个问题
#### 3.3.1 匿名和具名
**匿名函数表达式** 函数表达式可以是匿名的，而函数声明则不可以省略函数名
``` js
setTimeout( function() { 
    console.log("I waited 1 second!");
}, 1000 );
```
匿名函数的问题
- 匿名函数在栈追踪中不会显示有意义的函数名，使得调试很困难
- 如果没有函数名，当函数需要引用自身时只能使用已经过期的arguments.callee引用，比如在递归中。另一个函数需要引用自身的例子，是在事件触发后事件监听器需要解绑自身。
- 匿名函数省略了对于代码可读性/可理解性很重要的函数名。一个描述性的名称可以让代码不言自明。

给函数表达式指定一个函数名可以解决以上的问题
#### 3.3.2 立即执行表达式
立即执行表达式(**IIFE**)的两种方式：`(function foo(){..})()` `(function foo(){..}())`，功能上都是一样的

IIFE 还有一种变化的用途是倒置代码的运行顺序，将需要运行的函数放在第二位，在 IIFE 执行之后当作参数传递进去。这种模式在 UMD(Universal Module Definition)项目中被广 泛使用
``` js
var a = 2;
(function IIFE( def ) { 
    def( window );
})(function def( global ) {
    var a = 3;
    console.log( a ); // 3 
    console.log( global.a ); // 2
});
```
### 3.4 块作用域
#### 3.4.1 with
我们在第 2 章讨论过 with 关键字。它不仅是一个难于理解的结构，同时也是块作用域的一个例子(块作用域的一种形式)，用 with 从对象中创建出的作用域仅在 with 声明中而非外部作用域中有效。
#### 3.4.2 try/catch
ES3 规范中规定 try/catch 的 catch 分句会创建一个块作用域，其中声明的变量仅在 catch 内部有效。
``` js
try {
    undefined(); // 执行一个非法操作来强制制造一个异常
}catch (err) {
    console.log( err ); // 能够正常执行! 
}
console.log( err ); // ReferenceError: err not defined
```
尽管这个行为已经被标准化，并且被大部分的标准 JavaScript 环境(除了老 版本的 IE 浏览器)所支持，但是当同一个作用域中的两个或多个 catch 分句 用同样的标识符名称声明错误变量时，很多静态检查工具还是会发出警告。
#### 3.4.3 let
let 关键字可以将变量绑定到所在的任意作用域中(通常是 { .. } 内部)。换句话说，let为其声明的变量隐式在了所在的块作用域。
``` js
var foo = true;
if (foo) {
    let bar = foo * 2;
    bar = something( bar ); 
    console.log( bar );
}
console.log( bar ); // ReferenceError
```
使用 var 定义 bar 的话，变量的作用域是外部作用域

**垃圾回收**
``` js
function process(data) {
    // 在这里做点有趣的事情
}
// 在这个块中定义的内容可以销毁了! 
// { 使用let 声明形成的块作用域
    let someReallyBigData = { .. }; 
    process( someReallyBigData );
// }
var btn = document.getElementById( "my_button" );
btn.addEventListener( "click", function click(evt){ 
    console.log("button clicked");
}, /*capturingPhase=*/false );
```
click 函数的点击回调并不需要 someReallyBigData 变量。理论上这意味着当 process(..) 执 行后，在内存中占用大量空间的数据结构就可以被垃圾回收了。<br>
但是，由于 click 函数形成 了一个覆盖整个作用域的闭包，JavaScript 引擎极有可能依然保存着这个结构(取决于具体 实现)。<br>
使用let 声明则会形成块作用域，无论click中具体怎么实现，someReallyBigData不会被闭包影响，都可以被回收

**let 循环**

以下两段代码是相等的 for 循环头部 `let` 声明的变量 `j` 作用域是块级作用域，如果使用 `var` 声明的话，它的作用域便是外层作用域
``` js
for (let j=0; j<10; j++) {
    let i = j; // 每个迭代重新绑定!
    console.log( i ); }
}

{
    let j;
    for (j=0; j<10; j++) {
        let i = j; // 每个迭代重新绑定!
        console.log( i ); 
    }
}
```
#### 3.4.4 const
除了 let 以外，ES6 还引入了 const，同样可以用来创建块作用域变量，但其值是固定的 (常量)。之后任何试图修改值的操作都会引起错误。
## 4. 提升
### 4.1 先有鸡还是现有蛋
``` js
a = 2;
var a; 
console.log( a ); // 2
```

``` js
console.log( a );  // undefined
var a = 2;
```
### 4.2 编译器再度来袭
引擎会在解释 JavaScript 代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来。

所以： **包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理。**

上面第二段代码的实际执行
``` js
var a;
console.log(a);
a = 2;
```

**函数声明会提升，但是函数表达式不会**

即使是具名的函数表达式，名称标识符也无法在所在作用域中使用
``` js
foo(); // 不是 ReferenceError, 而是 foo is not a function(TypeError)
bar()  // ReferenceError
var foo = function bar() { 
    // ...
};
bar()  // ReferenceError
```

### 4.3 函数优先
函数声明和变量声明都会被提升。但是一个值得注意的细节(这个细节可以出现在有多个“重复”声明的代码中)是函数会首先被提升，然后才是变量。
``` js
foo(); // 1
function foo() { 
    console.log( 1 );
}
var foo;

console.log(foo) // 

foo = function() { 
    console.log( 2 );
};
foo() // 2
```

一个普通块内部的函数声明通常会被提升到所在作用域的顶部，这个过程不会像下面的代 码暗示的那样可以被条件判断所控制:
``` js
foo(); // "b"   foo执行时，a已声明但未赋值
var a = true; 
if (a) {
    function foo() { console.log("a"); } 
}else {
    function foo() { console.log("b"); }
}
```
但是需要注意这个行为并不可靠，在 JavaScript 未来的版本中有可能发生改变，因此应该 尽可能避免在块内部声明函数。

## 5. 作用域闭包
### 5.1 启示
闭包是基于词法作用域书写代码时所产生的自然结果，你甚至不需要为了利用它们而有意 识地创建闭包。闭包的创建和使用在你的代码中随处可见。你缺少的是根据你自己的意愿 来识别、拥抱和影响闭包的思维环境。
### 5.2 实质问题
### 5.3 现在我懂了
### 5.4 循环和闭包
for循环是最常见的闭包
``` js
for (var i=1; i<=5; i++) { 
    setTimeout( function timer() {
        console.log( i ); 
    }, i*1000 );
}
//  6  6  6  6  6
```

上面的代码结果和我们预想中有差异，我们可以通过IIFE声明一个立即执行函数表达式来创建作用域<br>
并在这个立即执行函数表达式中创建一个变量 `j` 去存储 `i` 值
``` js
for (var i=1; i<=5; i++) { 
    (function() {
        var j = i
        setTimeout( function timer() { 
            console.log( j )
        }, j*1000 );
    })();
}

// 优雅一点
for (var i=1; i<=5; i++) { 
    (function(j) {
        setTimeout( function timer() { 
            console.log( j )
        }, j*1000 );
    })( i );
}
```
按照创建作用域的思路，我们还可以根据 `let` 创建块作用域的特性，解决for循环中闭包产生的问题
``` js
for (var i=1; i<=5; i++) {
    let j = i; // 是的，闭包的块作用域! 
    setTimeout( function timer() {
        console.log( j ); 
    }, j*1000 );
}

// 修改后
for (let i=1; i<=5; i++) { 
    setTimeout( function timer() {
        console.log( i ); 
    }, i*1000 );
}
```
`for` 循环头部的 `let` 声明还会有一 个特殊的行为。这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明
### 5.5 模块
#### 5.5.1 现代的模块机制
#### 5.5.2 未来的模块机制

# 第二部分

## 1. 关于this
### 1.1 为什么要用this
this 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将 API 设计得更加简洁并且易于复用。
### 1.2 误解
#### 1.2.1 指向自身
第一种误解：人们很容易把 this 理解成指向函数自身，这个推断从英语的语法角度来说是说得通的。
``` js
function foo(){
    this.count++
}
foo.count = 0;
foo()
console.log(foo.count) // 0
// foo()调用时，内部的this指向全局环境window，生成一个全局变量count,计算结果为NaN
// 使用bind/call函数可以改变foo 中 this指向
```
#### 1.2.2 它的作用域
第二种误解：this指向函数的作用域。这个问题有点复杂，因为在某种情况下它是正确的，但是在其他情况下它却是错误的。
### 1.3 this到底是什么
this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调 用时的各种条件。this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式

## 2. this全面解析
### 2.1 调用位置
在理解 this 的绑定过程之前，首先要理解 **调用位置** :调用位置就是函数在代码中被调用的位置(而不是声明的位置)
### 2.2 绑定规则
#### 2.2.1 默认绑定
函数调用类型:独立函数调用，可以把这条规则看作是无法应用其他规则时的默认规则。
``` js
function foo() {
    console.log(this.a)
}
var a = 2
foo() // 2
```
在代码中，foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用 `默认绑定`，无法应用其他规则。

但在严格模式下,全局对象无法使用默认绑定，this被绑定到undefined
``` js
function foo() { 
    "use strict";
    console.log( this.a ); 
}
var a = 2;
foo(); //Uncaught TypeError: Cannot read property 'a' of undefined
```
``` js
function foo() { console.log( this.a ); }
var a = 2;
(function(){
    "use strict";
    foo(); // 2
})();
```
::: tip 注意
通常来说你不应该在代码中混合使用 strict mode 和 non-strict mode,整个程序要么严格，要么非严格。 但第三方库中，其严格程度和你的代码有所不同，因此一定要注意这类兼容性细节。
:::
#### 2.2.2 隐式绑定
另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含，不过这种说法可能会造成一些误导。

对象属性引用链中只有最顶层或者说最后一层会影响调用位置
``` js
function foo() { console.log( this.a );}
var obj2 = { a: 42,foo: foo };
var obj1 = { a: 2,obj2: obj2 };
obj1.obj2.foo(); // 42
```
**隐式丢失**

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时。**这里有一个隐式赋值的过程**
``` js
function foo() { console.log( this.a );}
function doFoo(fn) {
    // 隐式赋值 fn = obj.foo,fn();
    fn(); // <-- 调用位置!
}
var obj = { a: 2, foo: foo };
var a = "oops, global"; // a 是全局对象的属性 
doFoo( obj.foo ); // "oops, global"，
```
#### 2.2.3 显示绑定
##### 硬绑定
硬绑定的一个典型场景就是创建一个包裹函数，传入所有的参数并返回接收到的所有值。
``` js
function foo(something) {
    console.log(this.a, something)
    return this.a + something;
}
var obj = { a: 2 };
var bar = function() { return foo.apply(obj,arguments) };
var b = bar(3) // 2,3
```
Function.prototype.bind(..) 会返回一个硬编码的新函数，它会把参数设置为 this 的上下文并调用原始函数。
##### API调用中的“上下文”
``` js
function foo(el) {
    console.log( el, this.id );
}
var obj = { id: "awesome" };
// 调用 foo(..) 时把 this 绑定到 obj 
[1, 2, 3].forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```

#### 2.2.4 new绑定
使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1. 创建(或者说构造)一个全新的对象。
2. 这个新对象会被执行[[原型]]连接。
3. 这个新对象会绑定到函数调用的this。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。
``` js
function foo(a) { this.a = a;}
var bar = new foo(2); 
console.log( bar.a ); // 2
```
##### 判断this
1. 函数是否在new中调用(new绑定)?如果是的话this绑定的是新创建的对象。var bar = new foo()
2. 函数是否通过call、apply(显式绑定)或者硬绑定调用?如果是的话，this绑定的是 指定的对象。var bar = foo.call(obj2)
3. 函数是否在某个上下文对象中调用(隐式绑定)?如果是的话，this 绑定的是那个上 下文对象。var bar = obj1.foo()
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到 全局对象。var bar = foo()

### 2.4 绑定例外
#### 2.4.1 被忽略的this
如果把undefined 或 null 作为this的绑定对象传入 call 、 apply 或者 bind,这些值在调用时会被忽略，实际应用的是默认绑定规则。
``` js
function foo() { console.log( this.a );}
var a = 2;
foo.call( null ); // 2
```
然而，总是使用 null 来忽略 this 绑定可能产生一些副作用。如果某个函数确实使用了 this(比如第三方库中的一个函数)，那默认绑定规则会把 this 绑定到全局对象(在浏览 器中这个对象是 window)，这将导致不可预计的后果(比如修改全局对象)。
##### 更安全的this
一种“更安全”的做法是传入一个特殊的对象，把 this 绑定到这个对象不会对你的程序产生任何副作用
``` js
function foo(a,b) { console.log( "a:" + a + ", b:" + b ); }
// 我们的 DMZ 空对象
var ø = Object.create( null ); // 把数组展开成参数
foo.apply( ø, [2, 3] ); // a:2, b:3
// 使用 bind(..) 进行柯里化 
var bar = foo.bind( ø, 2 ); 
bar( 3 ); // a:2, b:3
```
#### 2.4.2 间接引用
间接引用最容易在赋值时发生
``` js
function foo() { console.log( this.a );}
var a = 2;
var o = { a: 3, foo: foo }; 
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2
```
赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo() 而不是 p.foo() 或者 o.foo()。根据我们之前说过的，这里会应用默认绑定。
#### 2.4.3 软绑定
硬绑定会大大降低函数的灵活性，使 用硬绑定之后就无法使用隐式绑定或者显式绑定来修改 this
``` js
if (!Function.prototype.softBind) { 
    Function.prototype.softBind = function(obj) {
        var fn = this;
        // 捕获所有 curried 参数
        var curried = [].slice.call( arguments, 1 ); 
        var bound = function() {
            return fn.apply((!this || this === (window || global)) ? obj : this curried.concat.apply( curried, arguments )); 
        };
        bound.prototype = Object.create( fn.prototype );
        return bound; 
    };
}
```
它会对指定的函 数进行封装，首先检查调用时的 this，如果 this 绑定到全局对象或者 undefined，那就把 指定的默认对象 obj 绑定到 this，否则不会修改 this
### 2.5 this词法
箭头函数不使用 this 的四种标准规则，而是根据外层(函数或者全局)作用域来决 定 this。

## 3. 对象
####3.1 语法
对象可以通过两种形式定义：声明形式和构造形式
``` js
// 声明形式
var obj = { key: value }

// 构造形式
var obj = new Object();
obj.key = value;
```
### 3.2 类型
Javascript六种主要类型（ES5）
- string
- number
- boolean
- null
- undefined
- object

null 有时会被当作一种对象类型，但是这其实只是语言本身的一个 bug，即对 null 执行typeof null 会返回字符串 'object'
#### 内置对象
- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error

``` js
var strPrimitive = "I am a string"; 
typeof strPrimitive; // "string" 
strPrimitive instanceof String; // false

var strObject = new String( "I am a string" ); 
typeof strObject; // "object"
strObject instanceof String; // true
```
### 3.3 内容
``` js
var myObject = { a: 2 };
myObject.a; // 2 
myObject["a"]; // 2
```
.a 语法通 常被称为“属性访问”，["a"] 语法通常被称为“键访问”。

键访问可以接受任意UTF-8/Unicode字符串作为属性名。举例来说，如果要引用名称为"Super-Fun!"的属性，就必须使用['Super-Fun!']访问。

在对象中，属性名永远都是字符串。如果你使用 string(字面量)以外的其他值作为属性 名，那它首先会被转换为一个字符串。即使是数字也不例外，虽然在数组下标中使用的的 确是数字，但是在对象属性名中数字会被转换成字符串，**所以当心不要搞混对象和数组中数字的用法**:
#### 3.3.1 可计算属性名
ES6 增加了可计算属性名，可以在文字形式中使用 [] 包裹一个表达式来当作属性名:
#### 3.3.2 属性与方法
“函数”和“方法”在 JavaScript 中是可以互换的。
#### 3.3.3 数组
数组也是对象，所以虽然每个下标都是整数，你仍然可以给数组添加属性:
``` js
var myArray = [ "foo", 42, "bar" ]; 
myArray.baz = "baz"; 
myArray.length; // 3
myArray.baz; // "baz"
```
可以看到虽然添加了命名属性(无论是通过 . 语法还是 [] 语法)，数组的 length 值并未发 生变化。

**注意**:如果你试图向数组添加一个属性，但是属性名“看起来”像一个数字，那它会变成 一个数值下标(因此会修改数组的内容而不是添加一个属性)
#### 3.3.4 复制对象
对于JSON安全（也就是说可以被序列化为一个JSON字符串并且可以根据这个字符串解析出一个结构和值完全一样的对象）的对象来说，有一种巧妙的复制方法。
``` js
var newObj = JSON.parse(JSON.stringify(obj))
```
ES6定义了Object.assign(..)方法实现浅复制，第一个参数是目标对象，之后还可以跟一个 或多个源对象。它会遍历一个或多个源对象的所有可枚举(enumerable，参见下面的代码) 的自有键(owned key，很快会介绍)并把它们复制(使用 = 操作符赋值)到目标对象，最 后返回目标对象
#### 3.3.5 属性描述符
从 ES5 开始，所有的属性都具备了属性描述符。
``` js
var myObject = { a:2 };
Object.getOwnPropertyDescriptor( myObject, "a" ); 
// {
//      value: 2,
//      writable: true,
//      enumerable: true,
//      configurable: true 
// }
```
创建对象时，可以使用Object.defineProperty()添加一个新属性或者修改一个已有属性
``` js
var myObject = {};
Object.defineProperty( myObject, "a", { 
    value: 2,
    writable: true, 
    configurable: true, 
    enumerable: true
} );
myObject.a; // 2
```
- Writable
    - 属性值是否可以改变，严格模式下，Writable为false的值修改会报错。
- Configurable
    - 只要属性是可配置的，就可以使用 defineProperty(..) 方法来修改属性描述符:
    - 不管是不是处于严格模式，尝 试修改一个不可配置的属性描述符都会出错。
    - 把Configurable修改成false是单向操作
    - configurable:false 时，这个属性禁止被删除
- Enumerable
    - 这个描述符控制的是属性是否会出现在对象的属性枚举中
#### 3.3.6 不变性
##### 1. 对象常量
结合writable:false 和 configuration:false 可以创建一个真正的常量属性
``` js
var myObject = {};
Object.defineProperty( myObject, "FAVORITE_NUMBER", { 
    value: 42,
    writable: false,
    configurable: false 
});
```
##### 2. 禁止扩展
Object.preventExtensions(..)
``` js
var myObject = { a:2 };
Object.preventExtensions( myObject );
myObject.b = 3; 
myObject.b; // undefined
```
在非严格模式下，创建属性 b 会静默失败。在严格模式下，将会抛出 TypeError 错误。
##### 3. 密封
Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false。

所以，密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性(虽然可以 修改属性的值)。
##### 4. 冻结
Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal(..) 并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们 的值。
#### 3.3.7 [[Get]]
myObject.a 在 myObject 上实际上是实现了 [[Get]] 操作(有点像函数调 用:[[Get]]())。
- 对象默认的内置 [[Get]] 操作首先在对象中查找是否有名称相同的属性， 如果找到就会返回这个属性的值。
- 如果没有找到名称相同的属性，按照 [[Get]] 算法的定义会执行另外一种非常重要 的行为。我们会在第 5 章中介绍这个行为(其实就是遍历可能存在的 [[Prototype]] 链， 也就是原型链)。
- 无论如何都没有找到名称相同的属性，那 [[Get]] 操作会返回值 undefined
#### 3.8 [[Put]]
[[Put]] 被触发时，实际的行为取决于许多因素，包括对象中是否已经存在这个属性(这 是最重要的因素)。
- 如果已经存在这个属性，[[Put]] 算法大致会检查下面这些内容。
    - 1. 属性是否是访问描述符(参见3.3.9节)?如果是并且存在setter就调用setter。
    - 2. 属性的数据描述符中writable是否是false?如果是，在非严格模式下静默失败，在严格模式下抛出 TypeError 异常。
    - 3. 如果都不是，将该值设置为属性的值。
- 如果对象中不存在这个属性，[[Put]] 操作会更加复杂。我们会在第 5 章讨论 [[Prototype]] 时详细进行介绍。
#### 3.9 Getter Setter
当你给一个属性定义 getter、setter 或者两者都有时，这个属性会被定义为“访问描述 符”(和“数据描述符”相对)。对于访问描述符来说，JavaScript 会忽略它们的 value 和 writable 特性，取而代之的是关心 set 和 get(还有 configurable 和 enumerable)特性。
``` js
var myObject = {
    // 给 a 定义一个 getter 
    get a() {
        return 2; 
    }
};
myObject.a = 3; 
myObject.a; // 2
```
由于我们只定义了 a 的 getter，所以对 a 的值进行设置时 set 操作会忽略赋值操作，
``` js
var myObject = {
    // 给 a 定义一个 getter 
    get a() {
        return this._a_; 
    },
    // 给 a 定义一个 setter 
    set a(val) {
        this._a_ = val * 2; 
    }
};
myObject.a = 2; 
myObject.a; // 4
```
名称 _a_ 只是一种惯例，没有任何特殊的行为
#### 3.3.10 存在性
如 myObject.a 的属性访问返回值可能是 undefined，但是这个值有可能 是属性中存储的 undefined，也可能是因为属性不存在所以返回 undefined
``` js
var myObject = { a:2 };
("a" in myObject); // true 
("b" in myObject); // false
myObject.hasOwnProperty( "a" ); // true 
myObject.hasOwnProperty( "b" ); // false
```
in 操作符会检查属性是否在对象及其 [[Prototype]] 原型链中(参见第 5 章)。相比之下， hasOwnProperty(..) 只会检查属性是否在 myObject 对象中，不会检查 [[Prototype]] 链。
##### 枚举
enumerable为true时，属性值遍历，会出现在循环中；为false时，不会出现在循环中。
``` js
var myObject = { };
Object.defineProperty( myObject, "a",
    // 让 a 像普通属性一样可以枚举 
     enumerable: true, value: 2 }
);
Object.defineProperty( myObject, "b",
    // 让b不可枚举
    { enumerable: false, value: 3 }
);
myObject.b; // 3
("b" in myObject); // true 
myObject.hasOwnProperty( "b" ); // true
// .......

for (var k in myObject) { 
    console.log( k, myObject[k] );
}
// "a" 2
```
Object.keys(..) 会返回一个数组，包含所有可枚举属性，Object.getOwnPropertyNames(..) 会返回一个数组，包含所有属性，无论它们是否可枚举。

in 和 hasOwnProperty(..) 的区别在于是否查找 [[Prototype]] 链，然而，Object.keys(..) 和 Object.getOwnPropertyNames(..) 都只会查找对象直接包含的属性。
### 3.4 遍历
forEach(..) 会遍历数组中的所有值并忽略回调函数的返回值。every(..) 会一直运行直到回调函数返回 false(或者“假”值)，some(..) 会一直运行直到回调函数返回 true(或者 “真”值)。
::: warning  注意
遍历数组下标时采用的是数字顺序(for 循环或者其他迭代器)，但是遍历对 象属性时的顺序是不确定的，在不同的 JavaScript 引擎中可能不一样。因此， 在不同的环境中需要保证一致性时，一定不要相信任何观察到的顺序，它们 是不可靠的。
:::
#### for...in
使用 for..in 遍历对象是无法直接获取属性值的，因为它实际上遍历的是对象中的所有可 枚举属性，你需要手动获取属性值。
#### for...of
遍历属性值

for..of 循环首先会向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的 next() 方法来遍历所有返回值。

数组有内置的@@iterator，我们可以直接使用`for...of`，手动使用它大致如下
``` js
var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();
it.next(); // { value:1, done:false } 
it.next(); // { value:2, done:false } 
it.next(); // { value:3, done:false } 
it.next(); // { done:true }
```
对象没有内置的@@iterator,当然我们可以自定义
``` js
var myObject = { a: 2, b: 3 };
Object.defineProperty( myObject, Symbol.iterator, { 
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() { 
        var o = this;
        var idx = 0;
        var ks = Object.keys( o ); 
        return {
            next: function() { 
                return {
                    value: o[ks[idx++]],
                    done: (idx > ks.length) 
                };
            } 
        };
    } 
});
// 手动遍历 myObject
var it = myObject[Symbol.iterator](); 
it.next(); // { value:2, done:false } 
it.next(); // { value:3, done:false } 
it.next(); // { value:undefined, done:true }
// 用 for..of 遍历 myObject 
for (var v of myObject) { 
    console.log( v );
}
// 2 // 3
```
## 4. 混合对象“类”

## 5. 原型
### 5.1 [[prototype]]
Object.create会创建一个对象并把这个对象的[[prototype]]关联到指定的对象。
#### 5.1.1 Object.prototype
[[prototype]]的尽头是 Object.prototype
#### 5.1.2 属性设置和屏蔽
设置 `myObject.foo = 'bar';` 时，foo不存在myObject中而存在其原型链上时出现的三种情况
1. 如果[[prototype]]链上层存在名为foo的普通数据访问属性并且没有被标记为只读（writable: true），那就会直接在myObject中添加一个新属性，它是**屏蔽属性**。
2. 如果[[prototype]]链上层存在foo，但它被标记为只读(writable: false)，那么无法修改已有属性或者在myObject上创建屏蔽属性。严格模式下会报错，否则会被忽略。
3. 如果[[protorype]]链上层存在foo并且它是一个setter，那它一定会调用这个setter。foo不会被添加到myObject上，也不会重新定义折合setter。

如果希望在第二第三种情况下也能屏蔽foo，那就不能使用 = 操作符赋值，而是使用 Object.defineProperty()

**隐式屏蔽**
``` js
var anotherObject = { a:2 };
var myObject = Object.create( anotherObject );

anotherObject.a; // 2 
myObject.a; // 2

anotherObject.hasOwnProperty( "a" ); // true 
myObject.hasOwnProperty( "a" ); // false

myObject.a++; // 隐式屏蔽! 
anotherObject.a; // 2
myObject.a; // 3
myObject.hasOwnProperty( "a" ); // true
```
### 5.2 类
#### 5.2.1 类函数
``` js
function Foo() { 
    // ...
}
var a = new Foo();
Object.getPrototypeOf( a ) === Foo.prototype; // true
```
#### 5.2.2 构造函数
函数不是构造函数，但是当且仅当使用 new 时，函数调用会变成“构造函数调用”。
#### 5.2.3 技术
### 5.3 （原型）继承
instanceof 操作符的左操作数是一个普通的对象，右操作数是一个函数。instanceof 回答的问题是:在 a 的整条 [[Prototype]] 链中是否有指向 Foo.prototype 的对象?

### 5.4 对象关联

Object.create(null) 会 创 建 一 个 拥 有 空( 或 者 说 null)[[Prototype]] 链接的对象，这个对象无法进行委托。由于这个对象没有原型链，所以 instanceof 操作符(之前解释过)无法进行判断，因此总是会返回 false。 这些特殊的空 [[Prototype]] 对象通常被称作“字典”，它们完全不会受到原 型链的干扰，因此非常适合用来存储数据。

// todo <br>
内容不好梳理，回头看书再梳理。

## 6. 行为委托
### 6.1 面向委托的设计
#### 6.1.1 类理论
类设计模式鼓励你在继承时使用方法重写（和多态）
``` js
class Task {
    id;
    Task(ID) { id = ID }
    outputTask() { output(id) }
}
class XYZ inherits Task {
    label;
    XYZ(ID,Label) { super(ID); label = label }
    outputTask() { super(); output(label) }
}
```
#### 6.1.2 委托理论
``` js
Task = {
    setID: function(ID) { this.id = ID; },
    outputID: function() { console.log( this.id ); }
};

// 让XYZ委托Task
XYZ = Object.create(Task)
XYZ.prepareTask = function(ID,Label) {
    this.setID(ID)
    this.label = Label
}
XYZ.outputTaskDetails = function() {
    this.outputID()
    console.log(this.label)
}
```
- 对象关联风格的代码还有一些不同之处
    1. 上面的代码中，id 和 label 数据成员都是直接存储在 XYZ 上（而不是Task），在[[prototype]]中最好把状态保存在委托者（XYZ）而不是委托目标身上。
    2. 类设计模式中，它的优势是重写（多态）。委托行为中，我们尽量避免在[[prototype]]链的不同级别中使用相同的命名。
    3. 委托行为意味着某些对象(XYZ)在找不到属性或者方法引用时会把这个请求委托给另一个对象(Task)

##### 1. 互相委托（禁止）
你无法在两个或两个以上互相(双向)委托的对象之间创建循环委托。如果你把 B 关联到 A 然后试着把 A 关联到 B，就会出错。
##### 2. 调试
#### 6.1.3 比较思维模型

### 6.2 类与对象
#### 6.2.1 空间“类”
#### 6.2.2 委托控件对象
对象关联可以更好地支持关注分离(separation of concerns)原则，创建和初始化并不需要 合并为一个步骤。
### 6.3 更简洁的设计
