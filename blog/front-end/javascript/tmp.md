<!-- ### 3.1 Arity
函数参数个数。一个带有两个参数的函数被称为二元函数或者它的 arity 是2。它也被那些更喜欢希腊词根而非拉丁词根的人称为 dyadic。同样地，带有可变数量参数的函数被称为 variadic，而二元函数只能带两个参数
``` js
const sum = (a, b) => a + b
const arity = sum.length
console.log(arity)        // 2
```
### 3.2 高阶函数（High-Order Function / HOF）
以函数为参数 或/和 返回值
``` js
const filter = ( predicate, xs ) => xs.filter(predicate)  // filter 是高阶函数，接收predicate函数作为参数
const is = (type) => (x) => Object(x) instanceof type
filter(is(Number), [ 0, '1', 2, null])   // [0, 2]
```
### 3.3 偏函数（Partial Function）
对原始函数预设参数作为一个新的函数
``` js
// 创建偏函数 partical, 第一个参数是函数（原始函数），后面的参数是预设值。
const partical = (f, ...args) => 
    (...moreArg) =>
        f(...args, ...moreArgs)
const add3 = (a, b, c) => a + b + c
// 偏函数partical传入的原始函数是add3,后两值2、3分别代表a、b
// 返回的threePlus传入最后参数c
const threePlus = partical(add3, 2, 3)
threePlus(10)
```
也可以使用 `Function.prototype.bind` 实现偏函数。
``` js
const add3 = (a, b, c) => a + b + c
const add1More = add3.bind(null, 2, 3)
add1More(10)
```
偏函数应用通过对复杂的函数填充一部分数据来构成一个简单的函数。柯里化通过偏函数实现。
### 3.4 柯里化（Currying）
将一个多元函数转变为一元函数的过程。 每当函数被调用时，它仅仅接收一个参数并且返回带有一个参数的函数，直到传递完所有的参数。
``` js
// sum 与 currying 的函数功能都是一样的
const sum = (a, b, c) => a + b + c
const currying = a => b => c => a + b + c 
currying(2)(3)(4)   // == sum(2, 3, 4)
```
### 3.5 函数组合（Function Composing）
接收多个函数作为参数，从右到左，一个函数的输入为另一个函数的输出
``` js
const compose = (f, g) => (a) => f(g(a))
const floorAndToString = compose( val => val.toString(), Math.floor)
floorAndToString(520.1314)  // "520"
```
### 3.6 Continuation
在程序执行的任何时刻，尚未执行的代码称为Continuation
``` js
const printAsString = (num) => console.log(`Number ${num}`)
const addOneAndContinue = (num, cc) => {
    const result = num + 1
    cc(result)
}
addOneAndContinue(519, printAsString)  // Number 520
```
Continuation 在异步编程中很常见，比如当程序需要接收到数据才能够继续执行。请求的响应通常作为代码的剩余执行部分，一旦接收到数据，对数据的处理被作为 Continuation。
### 3.7 纯函数
同样的输入有着同样的输出（输出仅由输入决定）,且不产生副作用
``` js
// 纯函数
const greet = (name) => `hello, ${name}`
greet('world')

// 非纯函数
let greeting
const greet = (name) => {
    greeting = `Hi, ${name}`  // 修改了函数外部数据状态
}
greet('Brianne')
```
### 3.8 副作用（Side Effects）
如果函数与外部可变状态进行交互，则它是有副作用的
``` js
const differentEveryTime = new Date()
```
### 3.9 幂等性（Idempotent）
如果一个函数多次执行皆返回相同的结果，那么他是幂等的
``` js
f(f(x)) = f(x)
Math.abs(Math.abs(1))
```
### 3.10 Point-Free 风格
定义函数时，不显示地指出函数所带参数。这种风格通常需要柯里化或者高阶函数。也叫做 Tacit programming。
``` js
const map = (fn) => (list) => list.map(fn)
const add = (a) => (b) => a + b

// # Points-Free   list 是显式参数
const incrementAll = (numbers) => map(add(1))(numbers)
// # Points-Free   list 是隐式参数
const incrementAll2 = map(add(1))
```
### 3.11 谓词（Predicate）
根据输入返回 true 或 false
``` js
const predicate = (a) => a > 2;
[1, 2, 3, 4].filter(predicate)
```
### 3.12 契约（Contracts）
契约保证了函数或者表达式在运行时的行为。当违反契约时，将抛出一个错误。
``` js
const contract = (input) => {
  if (typeof input === 'number') return true
  throw new Error('Contract Violated: expected int -> int')
}
const addOne = (num) => contract(num) && num + 1

addOne(2)
addOne('hello') // Error
```
### 3.13 Guarded Functions

### 3.14 值（Value）
赋给变量的值称为 Value

### 3.15 常量（Constant）
一旦定义不可重新赋值

### 3.16 Pointed Functor
一个实现了 of 函数的对象

### 3.17 Lift

### 3.18 引用透明性（Referential Transparency）
一个表达式能够被它的值替代而不改变程序的行为成为引用透明
``` js
const greet = () => 'hello, world.'
```
### 3.19 匿名函数（Lambda）
匿名函数被视作一个值
``` js
(function (a) { return a + 1 })
(a) => a + 1
```
匿名函数通常作为高阶函数的参数
``` js
[1, 2].map((a) => a + 1)
```
### 3.20 Lambda Caculus
### 3.21 惰性求值（Lazy evaluation）
按需求值机制，只有当需要计算所得值时才会计算
``` js
const rand = function* () {
    while (true) {
        yield Math.random()  
    } 
}
const randIter = rand()
randIter.next()
```
### 3.22 Monoid
一个对象拥有一个函数用来连接相同类型的对象
### 3.23 Monad
拥有 `of` 和 `chain`/`flatMap` 函数的对象。`of` 用来创建新对象， `chain`/`flatMap`用来铺平嵌套数据
``` js
Array.prototype.chain = function (f) {
  return this.reduce((acc, it) => acc.concat(f(it)), [])  
}
// ['cat', 'dog', 'fish', 'bird']
Array.of('cat,dog', 'fish,bird').chain(s => s.split(','))
```
### 3.24 Comonad
拥有 `extract` 与 `extend` 函数的对象
``` js
const CoIdentity = v => ({
    val: v,
    extract() {
        return this.val
    },
    extend(f) {
        return CoIdentity(f(this))
    }
})
CoIdentity(1).extract()
CoIdentity(1).extend(x => x.extract() + 1)
```
### 3.25 Applicative Functor
一个拥有 ap 函数的对象
``` js
Array.prototype.ap = function(xs) {
    return this.reduce((acc, f) => acc.concat(xs.map(f)),[])
};
[a => a * 2].ap([1,3]) // [2,6]
```
### 3.26 态射（Morphism）
一个变形的函数
#### 自同态（Endomorphism）
输入输出是相同的函数。
``` js
// decrement :: Number -> Number
const decrement = (x) => x - 1
```
#### 同构（Isomorphism）
不同类型对象的变形，保持结构并且不丢失数据
例如，一个二维坐标既可以表示为数组 `[2, 3]`，也可以表示为对象 `{x: 2, y: 3}`。
``` js
// 提供函数在两种类型间互相转换
const pairToCoords = (pair) => ({x: pair[0], y: pair[1]})

const coordsToPair = (coords) => [coords.x, coords.y]
```
### 3.27 Setoid
拥有 `equals` 函数的对象。 `equals` 可以用来和其他对象比较
``` js
Array.prototype.equals = function (arr) {
    const len = this.length
    if (len !== arr.length) {
        return false
    }
    for (let i = 0; i < len; i++) {
        if (this[i] !== arr[i]) {
            return false
        }
    }
    return true
};

[1, 2].equals([1, 2])   // true
[1, 2].equals([3, 4])   // false
```
### 3.28 半群（Semigroup）
一个拥有 `concat` 函数的对象，`concat`可以连接相同类型的两个对象
``` js
[520].concat([1314])
```
### 3.29 Foldable
一个拥有 `reduce` 函数的对象。 `reduce` 可以把一种类型的对象转换成另一种类型
``` js
const sum = (list) => list.reduce((acc, val) => acc + val, 0)
sum([1, 2, 3])        // 6
```
### 3.30 Traversable

### 3.31 类型签名 (Type Signatures)

### 3.32 联合类型 (Union Type)

### 3.33 Product type

### 3.34 Option -->