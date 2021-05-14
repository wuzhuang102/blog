![tupian](/algorithm/data-structure.jpg)

## 1. 基本数据结构类型

### 1. 集合
- 集合中的数据成员是无序的
- 每个数据成员在集合中不能重复，仅且出现一次
### 2. 线性结构
- 线性结构中的数据之间是一对一的关系，也就是数据元素一个接一个的排列
    - 用来存放特定的一个类型的元素
    - 物理结构位为顺序表和链表
#### 线性表的衍生结构
- [栈](/algorithm/base/data-structure.html#_2-2-栈)
- [队列](/algorithm/base/data-structure.html#_2-3-队列)
- 串
    - 字符串
    - 流

### 3. 树形结构
### 4. 图形结构


## 2. 常用的数据结构


### 2.1 数组
### 2.2 栈

- 栈内元素只能通过列表的一端访问，这一端称为栈顶
- 插入元素又称作`进栈`、`入栈`或`压栈`，删除元素又称作`出栈`或`退栈`
- LIFO（Last In First Out）
- 用途： 
    - 解决括号匹配检查
    - 浏览器的后退或编辑器的undo功能
    
<details>
<summary>1. 栈的代码实现</summary>

``` js
function Stack() {
    this.dataSource = []
    this.top = 0
    this.push = push
    this.pop = pop
    this.peek = peek   // 返回栈顶元素
    this.clear = clear
    this.length = length
}

function push(element) {
    this.dataSource[this.top++] = element
}

function pop() {
    return this.dataSource[--this.top]
}

function peek() {
    return this.dataSource[this.top - 1]
}

function length() {
    return this.top
}

function clear() {
    this.top = 0
}
```

</details> 


<details>
<summary>2. 回文算法</summary>

```js
function isPalindrome(word) {
    var s = new Stack()
    for(var i = 0; i < word.length ; i++) {
        s.push(word[i])
    }
    var rword = ''
    while(s.length > 0) {
        rword += s.pop()
    }

    if(word === rword) {
        return true
    }else {
        return false
    }
}
```
</details>


### 2.3 队列

- 队列只能在队尾插入元素，在队首删除元素
- 插入元素叫入队，删除元素叫出队
- FIFO
- 用途
    - 消息队列、视频弹幕
    - 维护打印机任务

<details>
<summary>队列代码实现</summary>

``` js
function Queue() {
    this.dataSource = []
    this.inQueue = inQueue
    this.deQueue = deQueue
    this.front = front
    this.back = back
    this.isEmpty = isEmpty
    this.toString = toString
}

function inQueue(element) {
    this.dataSource.push(element)
}

function deQueue() {
    this.dataSource.shift()
}

function front() {
    return this.dataSource[0]
}

function back() {
    return this.dataSource[this.dataSource.length - 1]
}

function isEmpty() {
    if(this.dataSource.length === 0){
        return true
    }else {
        return false
    }
}

function toString() {
    var reStr = ''
    for(var i = 0; i< this.dataSource.length; i++) {
        reStr += this.dataSource[i] + '\n'
    }
    return toString()
}
```

</details>

### 2.4 链表

- 一系列节点组成的集合，每个节点都适用一个对象指向它的后继，指向另一个节点的引用叫链
    

### 2.5 树

树是由若干个有限节点组成的一个具有层次关系的集合

- 一棵树中每两个点之间有且仅有一条路
- 一颗有N个点的树有N-1条边

#### 3.1 树遍历
深度遍历中的 先、中、后 是针对根结点而言：子节点遍历永远先左后右
- 先序遍历（深度优先）：根、左、右
- 中序遍历（深度优先）：左、根、右
- 后续遍历（深度优先）：左、右、根
- 层序遍历（广度优先）

![](/algorithm/tree-traversal.jpg)


#### 3.2 树的衍生

- 无序树：树中任意节点之间没有顺序关系
- 有序树：树中任意节点的子节点之间有顺序关系
- 二叉树：每个节点最多含有两个子树的树
- 满二叉树：子节点要么为0，要么为2
- 完全二叉树：除了最后一层，其它各层节点数都达到最大
- 哈夫曼树：是带权路径长度最短的树，权值较大的结点离根较近。


### 2.6 散列表


### 2.7 堆


### 2.8 图
#### 基本概念
- 顶点
- 边
- 权



## 3. 其他

### 3.1 顺序表（列表）
<br>
<details>
<summary>列表List代码实现</summary>

``` js
// List
function List() {
    this.listSize = 0;  //列表个数
    this.pos = 0   // 当前位置
    this.dataStore = [];  // 初始化一个空数组用来保存列表元素
    this.clear = clear;
    this.find = find;
    this.toString = toString
    this.insert = insert;
    this.append = append
    this.remove =remove
    this.front = front; // 列表的当前位置移动到第一个元素
    this.end = end; // 列表的当前位置移动到最后一个元素
    this.prev = prev;
    this.next = next;
    this.length = length
    this.currPos = currPos
    this.moveTo = moveTo
    this.getElement = getElement  // 显当前元素
    this.contains = contains   // 是否包含
}

function append(element) {
    this.dataStore[this.listSize++] = element
}

function find(element) {
    for(var i=0;i<this.dataStore.length; ++i) {
        if(this.dataStore[i] === element) {
            return i
        }
    }
    return -1;
}

function remove(element) {
    var foundAt = this.find(element)
    if(foundAt > -1) {
        this.dataStore.splice(foundAt,1)
        --this.listSize;
        return true
    }
    return false
}

function length() {
    return this.listSize
}

function toString() {
    return this.dataStore.toString()
}

function insert(element, after) {
    var insertPos = this.find(after)
    if(insertPos > -1) {
        this.dataStore.splice(insertPos,0,element)
        return true;
    }
    return false
}

function clear() {
    delete this.dataStore
    this.dataStore.length = 0
    this.listSize = this.pos = 0
}

function contains(element) {
    for(var i=0; i< this.dataStore.length;++i) {
        if(this.dataStore[0] === element) {
            return true
        }
    }
    return false
}

function front() {
    this.pos = 0
}

function end() {
    this.pos = this.listSize -1
}

function prev() {
    if(this.pos> 0) {
        --this.pos
    }
}

function next() {
    if(this.pos < this.listSize-1){
        ++this.pos
    }
}

function currPos() {
    return this.pos
}

function moveTo(position) {
    this.pos = position
}

function getElement() {
    return this.dataStore[this.pos]
}
```
</details>


### 3.2 串（字符串）