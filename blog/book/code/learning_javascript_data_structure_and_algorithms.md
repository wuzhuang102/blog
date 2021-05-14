# 学习JavaScript数据结构与算法

## 1. JavaScript简介

## 2. ECMAScript和TypeScript概述

## 3. 数组
### 3.1 为什么用数组
用数组来存储连续性数据
### 3.2 创建和初始化数组
### 3.3 添加元素
#### 3.3.1 数组末尾添加元素
``` js
let numbers = [0,1,2,3,4];

// 直接添加 或者 push
numbers[numbers.length] = 5
numbers.push(5)
```
#### 3.3.2 数组开头插入元素
所有元素后移一位，开头插入数组
``` js
Array.protorype.insertFirstPosition = function(value) {
    for(let i = this.length; i >= 0; i --) {
        this[i] = this[i-1]
    }
    this[0] = value
}
```
或者使用unshift,它的行为与insertFirstPosition方法行为是一样的。
### 3.4 删除元素
#### 3.4.1 从数组末尾删除元素
``` js
numbers.pop();
```
#### 3.4.2 从数组开头删除一个元素
```js
// 复制一个新数组
Array.prototype.reIndex = function() {
    const newArray = [];
    for(let i = 0; i < this.length; i ++){
        if(this[i] !== undefined) {
            newArray.push(this[i])
        }
    }
    return newArray;
}

// 删除第一个元素
Array.prototype.removeFirstPosition = function() {
    for(i = 0; i < this.length; i++) {
        this[i] = this[i+1]
    }
    return this.reIndex()
}
```
`Array.prototype.shift` 也能实现
### 3.5 在任意位置添加或删除元素
```js
// 删除从索引3开始的2个元素并插入2,3,4,5,6
numbers.splice(3,2,2,3,4,5,6)
```
### 3.6 二维和多维数组
使用矩阵（二维数组）存储一些信息
``` js
let averageTemp = [];
    averageTemp[0] = [72, 75, 79, 79, 81, 81];
    averageTemp[1] = [81, 79, 75, 75, 73, 73];
```
#### 3.6.1 迭代二维数组元素
``` js
function printMatrix(myMatrix) {
    for(let i = 0; i < myMatrix.length; i++) {
        for(let j = 0; j < myMatrix[i].length; j ++) {
            console.log(myMatrix[i][j])
        }
    }
}
```
#### 3.6.2 多维数组
### 3.7 JavaScript数组方法参考
| 方法        | 描述                                                                           |
|:------------|:-------------------------------------------------------------------------------|
| concat      | 连接两个或更多数组，并返回结果                                                 |
| every       | 对数组的每个元素运行指定函数，每个元素都返回true才为true，遇见false循环终止    |
| filter      | 对数组中每个元素运行指定函数，元素运行返回true的组成新的数组返回               |
| forEach     | 对数组中每个元素运行指定函数，没有返回值                                       |
| join        | 将所有数组连成一个字符串                                                       |
| indexOf     | 返回第一个与给定参数相等的数组元素的索引，没有则返回-1                         |
| lastIndexOf | 返回最后一个与给定参数相等的数组元素索引，没有返回-1                           |
| map         | 对数组中每个元素运行指定函数，返回每次函数调用的结果组成新的函数               |
| reverse     | 数组倒序                                                                       |
| slice       | 传入索引值，从数组给定的索引范围内的元素作为新的数组返回                       |
| some        | 对数组中每个元素运行指定函数,如果有元素运行返回true，则返回true，反之返回false |
| sort        | 按照字符顺序进行数组排序，支持传入指定排序方法的函数作为参数                   |
| toString    |                                                                                |
| valueOf     |                                                                                |
#### 3.7.1 数组合并
Array.prototype.concat
#### 3.7.2 迭代器函数
``` js
const isEven = x => x % 2 == 0;
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
```
##### 1. 使用every迭代
这个例子中，第一个元素1不是偶数，返回false，循环终止
``` js
numbers.every(isEven);
```
##### 2. some
这个例子中，第二个元素2是偶数，返回true，循环终止
``` js
numbers.some(isEven)
```
##### 3. forEach
``` js
numbers.forEach( x => console.log( x % 2 === 0 ) )
```
##### 4. map 和 filter
map返回单个元素返回值的数组; filter 筛选所有返回true的值的数组
``` js
numbers.map(isEven) // [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]
numbers.filter(isEven) // [2, 4, 6, 8, 10, 12, 14]
```
##### 5. reduce
reduce接收四个参数 previousValue、currentValue、index和array
``` js
numbers.reduce((previous,current) => previous + current)
```
#### 3.7.3 ECMAScript6 和 数组新功能
| 方法       | 描述                                                                 |
|:-----------|:---------------------------------------------------------------------|
| @@iterator | 返回一个包含数组键值对的迭代器对象，可以通过同步得到数组元素的键值对 |
| copyWithin | 复制数组中一系列元素到同一数组指定的起始位置                         |
| entries    | 返回包含所有键值对的@@iterator                                       |
| keys       | 返回包含数组的所有索引的@@iterator                                   |
| values     | 返回包含数组所有值的@@iterator                                       |
| includes   | 检测存在某个元素则返回true,否则返回false(ES7)                        |
| find       | 根据回调给定的条件从数组中查找元素，如果找到则返回                   |
| findIndex  | 根据回调给定的条件查找数组元素，如果找到则返回该元素在数组中的索引   |
| fill       | 静态值填充数组                                                       |
| from       | 根据已有数组创建一个新数组                                           |
| of         | 根据传入的参数创建一个新数组                                         |
##### 1. for...of
`for...of`方法是用来迭代@@iterator的
``` js
for(const n of number) {
    console.log( n % 2 === 0 ? 'even':'odd' )
}
```
##### 2. @@iterator对象
``` js
let iterator = numbers[Symbol.iterator]();
iterator.next()  // { value: 1, done: false }
iterator.next()  // { value: 2, done: false }
// ...
iterator.next()  // { value: undefined, done: true }
```
##### 3. entries、keys、values
``` js
let numEntries = numbers.entries();
numEntries.next() // { value: [0,1],done: false }
numEntries.next() // { value: [1,2],done: false }
// ...
numEntries.next() // { value: undefined, done: true }

// 或者
for(const n of numEntries) {
    console.log(n) 
    // 第一项： [0,1]
    // 第二项： [1,2]
}
```
##### 4. Array.from
Array.from有两个参数，一个arr, 一个函数fn;arr是要复制的数组，fn是过滤函数
``` js
let evens = Array.from(numbers, x => x % 2 === 0)
```
##### 5. Array.of
创建新数组
``` js
Array.of(1,2,3,4,5)
Array.of(...numbers)
```
##### 6. fill
接受是三个参数： value, startIndex, endIndex
``` js
let numbers = [1,2,3,4,5,6,7]
// 单独执行结果
numbers.fill(2,1)  // [1,2,2,2,2,2,2]
numbers.fill(1,3,5) // [1,2,3,1,1,6,7]
Array(6).fill(1) // 创建新数组默认值很好用
```
##### 7. copyWithin
接受三个参数：insertIndex,copyStartIndex,copyEndIndex
``` js
let numbers = [1, 2, 3, 4, 5, 6]
numbres.copyWithin(0,3) // [4,5,6,4,5,6]
numbers.copyWithin(1,3,5)  // [1,4,5,4,5,6]
```
#### 3.7.4 排序元素
sort排序时，把元素默认成字符串排序
##### 1. 自定义排序
``` js
const friends = [
    {name: 'John', age: 30},
    {name: 'Ana', age: 20},
    {name: 'Chris', age: 25}
]
function comparePerson(a, b) {
    if(a.age < b.age) { return -1 }
    if(a.age > b.age) { return 1 }
    return 0
}
friends.sort(comparePerson)
```
##### 2. 字符串排序
**JavaScript 在做字 符比较的时候，是根据字符对应的 ASCII 值来比较的。**[ASCII](http://www.asciitable.com/)
#### 3.7.5 搜索
##### 1. find 与 findIndex
find查找匹配的值，否则返回undefined <br>
findIndex查找匹配的索引，否则返回-1
##### 2. includes(es7)
接受两个参数：includeValue, startIndex
#### 3.7.6 输出数组为字符串
toString <br>
join
### 3.8 类型数组
类型数组用于存储单一类型的数据
``` js
// TypeArray 是类型数组的代称，实际是以下其中之一
let myArray = new TypedArray(length)
```
| 类型数组          | 数据类型           |
|:------------------|:-------------------|
| Int8Array         | 8位二进制补码整数  |
| Unit8Array        | 8位无符号整数      |
| Unit8ClampedArray | 8位无符号整数      |
| Int16Array        | 16位二进制补码整数 |
| Unit16Array       | 16位无符号整数     |
| Int32Array        | 32位二进制补码整数 |
| Unit32Array       | 32位无符号整数     |
| Float32Array      | 32位IEEE浮点数     |
| Float64Array      | 64位IEEE浮点数     |
使用 WebGL API、进行位操作、处理文件和图像时，类型数组都可以大展拳脚 [类型数组demo](https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/)
### 3.9 TypeScript中的数组

## 4. 栈
### 4.2 栈数据结构
**栈是一种后进先出（LIFO）原则的有序结构**。新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底
#### 4.2.1 基于数组的栈
``` js
class Stack{
    constructor() {
        this.items = []
    }
    
    push(element) {   // 添加一个或几个新元素到栈顶
        this.items.push(element)
    } 
 
    pop() {  // 移除栈顶的元素，同时返回被移除的与元素
        return this.items.pop();
    }
    
    peek() {  // 返回栈顶元素，不做任何修改
        return this.items[this.items.length - 1]
    } 
   
    isEmpty() {  // 判断栈是否为空
        return this.items.length === 0
    } 

    clear() {  // 移除栈里的所有元素
        this.items = []
    } 

    size() { // 返回栈元素个数
        return this.items.length
    } 
}
```
### 4.3 创建一个基于JavaScript对象的Stack类
``` js
class Stack{
    constructor() {
        this.count = 0;
        this.items = {};
    }

    push(element) {
        this.items[this.count] = element;
        this.count++;
    }

    isEmpty() {
        return this.count === 0;
    }

    pop() {
        if(this.count === 0) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count]
        delete this.items[this.count]
        return result;
    }

    peek() {
        if(this.count === 0) { return undefined }
        return this.items[this.count - 1];
    }

    clear() {
        this.count = 0;
        this.items = [];
    }

    size() {
        return this.count;
    }

    toString() {
        if(this.count === 0) { return '' }
        let objString = `${this.items[0]}`;
        for(let i = 1; i < this.count; i ++ ) {
            objString = `${objString},${this.items[i]}`
        }
        return objString;
    }
}
```
### 4.4 保护数据结构内部元素
``` js
const stack = new Stack(); 
console.log(Object.getOwnPropertyNames(stack)); // {1} 
console.log(Object.keys(stack)); // {2} 
console.log(stack.items); // {3}
```
实例化的stack内部属性 `count` `items`可以被访问且被修改的，ES2015 类是基于原型的。尽管基于原型的类能节省内存空间并在扩展方面优于基于函数的类，但这种方式不能声明私有属性(变量)或 方法。<br>
我们需要使用JavaScript来实现私有属性。
#### 4.4.1 下划线命名约束
下划线命名约定就是在属性名称之前加上一个下划线(_)。但只是一种约定，不能真正的保护数据。
``` js
class Stack {
    constructor() {
        this._count = 0;
        this._items = {};
    } 
}
```
#### 4.4.2 使用ES6的限定作用域Symbol实现类
``` js
class Stack {
    constructor () {
        const _items = Symbol('stackItems'); // {1}
        this[_items] = []; // {2}
    }
    // 栈的方法 
}
```
这种方法创建了一个假的私有属性，因为 ES2015 新增的 Object.getOwnPropertySymbols 方法能够取到类里面声明的所有 Symbols 属性。
#### 4.4.3 使用ES2015的WeakMap实现类
``` js
const items = new WeakMap(); // {1}
class Stack {
    constructor () {
        items.set(this, []); // {2}
    }
    push(element){
        const s = items.get(this); // {3}
        s.push(element); 
    }
    pop(){
        const s = items.get(this);
        const r = s.pop();
        return r;
    }
    // 其他方法 
}
```
代码可读性差、扩展是无法继承私有属性。
#### 4.4.4 SCMAScript类属性提案
TypeScript提供了一个类属性和方法使用 private 修饰符，但只在编译时游泳
### 4.5 用栈解决问题
Java 和 C#用栈来存储变量和方 法调用，特别是处理递归算法时，有可能抛出一个栈溢出异常
#### 从十进制到二进制
``` js
function decimalToBinary(decNumber) {
    const remStack = new Stack();
    let number = decNumber,
        rem,
        binaryString = '';
    while(number > 0) {
        rem = number % 2
        remStack.push(rem)
        number = Math.floor(number / 2)
    }

    while(!remStack.isEmpty()) {
        binaryString += remStack.pop().toString();
    }
    return binaryString;
}
```
#### 进制转换算法
``` js
function baseConverter(decNumber, base) {
    const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // {6}
    let number = decNumber;
    let rem;
    let baseString = '';
    if (!(base >= 2 && base <= 36)) {
        return '';
    }
    while (number > 0) {
        rem = Math.floor(number % base); 
        remStack.push(rem);
        number = Math.floor(number / base);
    }
    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()]; // {7}
    }
    return baseString;
}
```

## 5. 队列和双端队列
### 5.1 队列数据结构
队列遵循FIFO（先进先出）原则的一组有序的项
#### 5.1.1 创建队列
声明队列基类
``` js
class Queue{
    constructor() {
        this.count = 0;   // 队列大小
        this.lowestCount = 0;  // 队首元素
        this.items = {}；
    }

    enqueue(element) {
        this.items[this.count] = element;
        this.count++;
    }

    dequeue() {
        if(this.isEmpty()) {
            return undefined
        }
        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return result
    }

    size() {
        return this.count - this.lowestCount
    }

    peek() {
        return this.items[this.lowestCount]
    }

    isEmpty() {
        return this.count - this.lowestCount === 0
    }

    clear() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }


    toString() {
        if(this.isEmpty()) {
            return ''
        }
        let str = `${this.items[this.lowestCount]}`;
        for(let i = this.lowestCount + 1; i < this.count; i ++) {
            str = `${str},${this.items[i]}`
        }
        return str
    }
}
```
### 5.2 双端数据队列
双端队列（deque, double-ended queue）是一种允许我们同时从前端和后端添加和移除元素的特殊队列
``` js
class Deque{
    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }
    // isEmpty、clear、size、toString
    addFront(element) {
        // this.items[--this.lowestCount] = element
        if(this.isEmpty()) {
            this.addBack(element)
        }else if(this.lowestCount > 0) {
            this.items[--this.lowestCount] = element
        }else {
            for(let i = this.count; i > 0; i --) {
                this.items[i] = this.items[i - 1]
            }
            this.count++
            this.lowestCount = 0
            this.items[0] = element
        }
    }

    addBack(element) {}
    removeFront(){}
    removeBack() {}
    peekFront() {}
    peekBack() {}
}
```
### 5.3 使用队列和双端队列来解决问题
#### 5.3.1 循环队列 --- 击鼓传花游戏
``` js
function hotPotato(elementlist, num) {
    const queue = new Queue(),
        elimitatedList = []
    for (let i = 0; i < elementlist.length; i--) {
        queue.enqueue(elementlist[i])
    }

    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        elimitatedList.push(queue.dequeue())
    }

    return {
        winner: queue.dequeue()
    }
}
```
#### 5.3.2 回文检查器
回文是正反都能读通的单词、词组、数或一系列字符串的序列
``` js
// 算法逻辑
// 将字符串输入进入deque，然后拿removeFront 与 removeBack 比较，每次都相同就为回文
function plaindromeChecker(string) {
    if(string === undefined || string === null) {
        return false
    }
    const deque = new Deque(),
        lowerString = string.toLowerCase().split(' ').join('');
    let isEqual = true

    while(deque.size() > 1 && isEqual) {
        if(deque.removeFront() !== deque.removeBack()) {
            isEqual = false
        }
    }
    return isEqual
}
```
#### 5.3.3 JavaScript任务队列
当我们在浏览器中打开新标签时，就会创建一个任务队列。这是因为每个标签都是单线程处 理所有的任务，称为事件循环

## 6. 链表
### 6.1 链表
```js
function defaultEquals(a, b) {
    return a === b
}

class Node {
    constructor(element) {
        this.element = element
        this.next = undefined
    }
}

class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0
        this.head = undefined
        this.equalsFn = equalsFn
    }

    push(element) {
        const node = new Node(element)
        let current;
        if(this.head == null) {
            this.head = node
        }else {
            current = this.head;
            while(current.next != null) {
                current = current.next
            }
            current.next = node
        }
        this.count++
    }
    
    insert(element, pos) {
        if(pos >= 0 && pos < this.count){
            let node = new Node(element)
            if(pos === 0) {
                const head = this.head
                node.next = head
                this.head = node
            }else {
                let previous = this.getElementAt(pos)
                node.next = previous.next
                previous.next = node
            }
            this.count++
            return true
        }
        return false 
    }

    getElementAt(pos) { 
        if(pos >= 0 && pos < this.count) {
            let node = this.head
            for(let i = 0; i < pos; i ++) {
                node = node.next
            }
            return node
        }
    }

    remove(element) {
        let index = this.indexOf(element)
        return this.removeAt(index)
    }

    indexOf(element) {
        let current = this.head
        for(let i = 0; i < this.count;i++) {
            if(this.equalsFn(element,current.element)) {
                return i
            }
            current = current.next
        }
        return -1
    }

    removeAt(pos) {
        if(pos >= 0 && pos < this.count) {
            let current = this.head
            if(pos === 0) {
                this.head = current.next
            }else {
                let previous;
                for(let i = 0; i < pos; i++) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
            }
            this.count--
            return this.current.element
        }
    }

    isEmpty() {
        return this.size() === 0
    }

    size() {
        return this.count
    }

    toString() {
        if(this.isEmpty()) { return '' }
        let obj = `${this.head.element}`,
            current = this.head.next
        while(current != null) {
            obj = `${obj},${current.element}`
            current = current.next
        }
        return obj
    }
}
```
### 6.2 双向链表
``` js
class DoublyNode extends Node {
    constructor(element, next, prev){
        super(element, next)
        this.prev = prev
    }
}

class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
        this.tail = undefined   // 与head相对，表示链尾元素
    }

    insert(element, pos) {
        if(pos >= 0 && pos < this.count) {
            let node = new DoublyNode(element),
                current = this.head
            if(pos === 0) {
                if(current == null) {
                    this.head = node
                    this.tail = node
                }else {
                    node.next = current
                    this.head = node
                    current.prev = node
                }
            }else if(pos === this.count){
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node
            }else {
                const previous = this.getElementAt(pos - 1)
                current = previous.next
                previous.next = node
                current.prev = node
                node.prev = previous
                node.next = current
            }
            this.count++
            return true
        }
        return false
    }

    removeAt(pos) {
        
    }
}
```
### 6.3 循环链表
**循环链表**可以像链表一样只有单向引用，也可以像双向链表一样有双向引用

循环链表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针(tail.next)不是引用undefined，而是指向第一个元素(head)，如下图所示。
``` js
class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
    }
}
```
### 6.4 有序链表
**有序链表**是指保持元素有序的链表结构。除了使用排序算法之外，我们还可以将元素插入到正确的位置来保证链表的有序性。
``` js
const Compare = { LESS_THAN: -1, BIGGER_THAN: 1 };
function defaultCompare(a, b) {
    if (a === b) { 
        return 0; 
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN; 
}

class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
        super(equalsFn)
        this.compareFn = compareFn
    }
}
```
### 6.5 StackLinkedList
我们还可以使用 LinkedList 类及其变种作为内部的数据结构来创建其他数据结构，例如栈、队列和双向队列

## 7. 集合
### 7.1 构建数据集合
集合是一组无序且唯一的项组成的
### 7.2 创建集合类
``` js
class Set {
    constructor() {
        this.items = {}
    }

    has(element) {
        return element in this.items
    }

    add(element) {
        if(!this.has(element)) {
            this.items[element] = element
            return true
        }
        return false
    }

    delete() {
        if(this.has(element)) {
            delete this.items[element]
            return true
        }
        return false
    }

    clear() {
        this.items = {}
    }

    size() {
        return Object.keys(this.items).length
    }

    values() {
        return Object.values(this.items)
    }
}
```
### 7.3 集合的运算
#### 7.3.1 并集
#### 7.3.2 交集
#### 7.3.3 差集
#### 7.3.4 子集
### 7.4 ECMAScript 2015 --- Set类
ES2015 中的 Set类含有 add、has、values、delete 等方法

ES2015 中含有一个size属性，它的 values 方法返回一个 Iterator 

## 8 字典和散列表
### 8.1 字典
集合以[值，值]的形式存储元素，字典以[键，值]的形式存储元素，字典也称作 映射、符号、关联数组

字典对应 ES6 中的 Map
### 8.2 散列表
散列算法的作用是尽可能快地在数据结构中找到一个值：一般的，在数据结构中要获得一个值，需要迭代整个数据结构来找到它。如果使用散列函数（给定一个键值，然后返回值在表中的地址），就能知道值具体的位置，从而快速检索到该值。

散列表与字典的区别在于用值的hash值当作key来存储
### 8.3 ES2015 Map类
ES2015 的 values 和 keys 方法都会返回 Iterator
### 8.4 WeakMap 与 WeakSet
- WeakMap 与 WeakSet 没有 entries、keys、values 等方法，它们是弱化的 Map 与 Set，主要是为了性能
- 只能用对象作为键，使得 GC 可以从中清除整个入口

## 9. 递归
### 9.1 理解递归
递归是一种解决问题的方法，它从解决问题的各个小部分开始，直到解决最初的大问题，递归通常涉及函数的自身调用
### 9.2 计算一个阶乘
``` js
function factorialInterative(number) {
    if(number === 1 || number === 0) { return 1 }
    return n * factorialInterative(n-1)
}
```
#### 1. 调用栈
每当 一个函数被一个算法调用时，该函数会进入调用栈的顶部。当使用递归的时候，每个函数调用都 会堆叠在调用栈的顶部，这是因为每个调用都可能依赖前一个调用的结果。
#### 2. JavaScript 调用栈大小的限制
以下代码可以检测浏览器最大调用栈
``` js
let i = 0; 
function recursiveFn() {
    i++;
    recursiveFn();
}
try {
    recursiveFn();
} catch (ex) {
    console.log('i = ' + i + ' error: ' + ex);
}
```

ES2015 有**尾调用优化**，如果函数内的最后一个操作是调用函数，会通过跳转指令而不是子程序调用
### 9.3 斐波那契数列
#### 9.3.1 迭代
- 位置 0 的斐波那契数是零。
- 1和 2的斐波那契数是 1。
- n(此处 n > 2)的斐波那契数是(n - 1)的斐波那契数加上(n - 2)的斐波那契数。
``` js
function fibonacciIterative(n) {
    if(n === 0) return 0
    if(n <= 2) return 1
    return fibonacciIterative(n-1) + fibonacciIterative(n-2)
}
```
#### 9.3.2 记忆
```js
function fibonacciIterative(n,memory = {}) {
    if(n < 2) return n
    if(!memory[n]) {
        memory[n] = fibonacciIterative(n-1,memory) + fibonacciIterative(n-2, memory)
    }
    return memory[n]
}
```
### 9.4 为什么使用递归
迭代 的版本要比 递归 的版本快很多，但是递归版本更容易理解，需要的代码通常更少。另外，对一些算法来说，迭代的解法可能不可用， 3 而且有了尾调用优化，递归的多余消耗甚至可能被消除。

## 10. 树
### 10.2 树的相关术语
- 位于树顶部的节点叫作**根节点**
- 节点的一个属性是**深度**，节点的深度取决于它的祖先节点的数量
- **子树**由节点和它的后代构成
- 树的高度取决于所有节点深度的最大值
### 10.3 二叉树和二叉搜索树
- **二叉树**中的节点最多只能有两个子节点
- **二叉搜索树(BST)**允许你在左侧节点存储比父节点小的值，右节点存储比父节点大的值
#### 10.3.1 创建 BinarySearchTree 类
``` js
class Node {
    constructor(key, left, right) {
        this.key = key
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}
```
### 10.4 树的遍历
遍历一颗树是指访问树的每个节点并对它们进行某种操作的过程
#### 10.4.1 中序遍历
#### 10.4.2 先序遍历
#### 10.4.3 后序遍历


## 11. 二叉堆和堆排序
### 11.1 二叉堆数据结构
二叉堆是一种特殊的二叉树
- 是一颗完全二叉树，表示树的每一层都有左侧和右侧子节点（除最后一层的叶节点），并且最后一层的叶节点尽可能都是左侧子节点
- 二叉堆不是最小堆就是最大堆。最小堆允许你快速导出树的最小值，最大堆允许你快速导出树的最大值。
#### 11.1.1 创建最小堆类
``` js
const Compare = { LESS_THAN: -1, BIGGER_THAN: 1 };
function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.heap = []
    }

    getLeftIndex(index) {
        return 2 * index + 1
    }

    getRightIndex(index) {
        return 2 * index + 2
    }

    getParentIndex(index) {
        if (index === 0) return undefined
        return Math.floor(index / 2)
    }

    insert(value) {
        if (value != null) {
            this.heap.push(value)
            this.siftUp(this.heap.length - 1)
            return true
        }
        return false
    }

    extract() {  // 移除堆顶元素
        if (this.isEmpty()) return undefined
        if (this.size() === 1) return this.heap.shift()
        const removeValue = this.heap.shift()
        this.siftDown(0)
        return removeValue
    }

    siftUp(index) {  // 数据上移：将值和它的父节点进行交换，直到父节点小于这个插入的值
        let parent = this.getParentIndex(index)
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) > Compare.BIGGER_THAN) {
            swap(this.heap, parent, index)
            index = parent
            parent = this.getParentIndex(index)
        }
    }

    siftDown(index) { // 数据下移：与子节点比较，比子节点大就下移
        let element = index
        const left = this.getLeftIndex(index)
        const right = this.getRightIndex(index)
        const size = this.size()
        if (left < size && this.compareFn(this.heap[element], this.heap[left]) > Compare.BIGGER_THAN) {
            element = left
        }
        if (right < size && this.compareFn(this.heap[element], this.heap[left] > Compare.BIGGER_THAN)) {
            element = right
        }
        if (index !== element) {
            swap(this.heap, element, index)
            this.siftDown(element)
        }
    }

}

// 数组两个值交换
function swap(array, a, b) {
    const temp = array[a]
    array[a] = array[b]
    array[b] = temp
}
```
### 11.2 堆排序算法
- 用数组创建一个最大堆用作数据源
- 创建后，最大值会被存储在堆的第一个位置，我们将它替换为堆的最后一个值，将堆的大小减1
- 重复将堆的根结点下移并重复步骤2直到堆的大小为1
``` js
function heapSort(array, compareFn = defaultCompare) { 
    let heapSize = array.length;
    buildMaxHeap(array, compareFn); // 步骤1
    while (heapSize > 1) {
        swap(array, 0, --heapSize); // 步骤2
        heapify(array, 0, heapSize, compareFn); // 步骤3 
    }
    return array;
}

function buildMaxHeap(array, compareFn) {
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
        heapify(array, i, array.length, compareFn);
    }
    return array
}
```







