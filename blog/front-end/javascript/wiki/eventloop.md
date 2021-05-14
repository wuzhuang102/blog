# 基本篇 --- EventLoop

## 事件循环的四个步骤

先执行同步任务 ---> 执行微任务 ----> 执行宏任务

1. 函数入栈，当 Stack 中执行到异步任务的时候，就将他丢给 WebAPIs,接着执行同步任务,直到 Stack 为空；
2. 此期间 WebAPIs 完成这个事件，把回调函数放入队列中等待执行（微任务放到微任务队列，宏任务放到宏任务队列）
3. 执行栈为空时，Event Loop 把微任务队列执行清空；
4. 微任务队列清空后，进入宏任务队列，取队列的第一项任务放入 Stack(栈）中执行，回到第 1 步。

## 浏览器中的任务队列

| 宏任务                | 微任务          |
| :-------------------- | :-------------- |
| script                | Promise(async)  |
| setTimeout            | MutationOberver |
| setInterval           |                 |
| requestAnimationFrame |                 |

当每次 Event Loop 执行完任务队列和 Microtask 队列中所有函数时，就会检查视图是否需要渲染（requestAnimationFrame），如果需要，则会进入视图渲染的过程

### demo1

```js
setTimeout(() => {
    console.log("timeout");
}, 0);
const promise = new Promise((resolve) => {
    console.log("promise init");
    resolve(1);
    console.log("promise end");
});
promise.then((res) => {
    console.log("promise result:", res);
});
```

<details>
<summary>demo1答案</summary>

-   执行顺序
    -   宏任务队列：setTimeout
    -   微任务队列：Promise
    -   同步：promise init ，promise end，微任务：promise result:1，宏任务：timeout

```js
// promise init
// promise end
// promise result:1
// timeout
```

</details>

### demo2

```js
setTimeout(() => {
    console.log("timeout1");
    Promise.resolve().then(() => {
        console.log("promise1");
    });
}, 0);

Promise.resolve().then(() => {
    console.log("promise2");
    setTimeout(() => {
        console.log("timeout2");
    }, 0);
});
```

<details>
<summary>demo2答案</summary>

```js
// promise2
// timeout1
// promise1
// timeout2
```

</details>

## Node eventloops

Node 中的 Event Loop 和浏览器的完全不同， Node 采用 V8 作为 js 解析引擎， I/O 处理方面使用了 libuv。libuv 是一个基于事件驱动的跨平台抽象层

### Node 中的任务队列

| 宏任务       | 微任务           |
| :----------- | :--------------- |
| setTimeout   | Promise(async)   |
| setInterval  | process.nextTick |
| setImmediate |                  |
| IO           |                  |

<img src="/js/node-eventloop.jpeg" class="zoom-img">

### 六大阶段

<br>
<img src="/js/node-eventloop-level.jpg" class="zoom-img">

-   各阶段
    -   **timers** --- `setTimeout`、`setInterval`
    -   I/O callbacks --- 处理上一轮循环中少许未执行的 I/O 回调
    -   idle,prepare --- 仅 node 内部使用
    -   **poll** --- `io` 操作， 一定的条件下这里会阻塞
    -   **check** --- `setImmediate`
    -   close callbacks --- 执行 socket 的 close 回调
-   `process.nextTick` 优先性大于 `Promise`

-   setTimeout 与 setInmmediate 执行顺序不固定

#### demo1

```js
setTimeout((_) => console.log("setTimeout"));
setImmediate((_) => console.log("setImmediate"));
// 每次的执行结果可能不一样
```

#### demo2

如果 i/o 文件操作以后就会先执行 setImmediate，因为 setImmediate 在 i/o 文件操作后面的那个阶段执行，执行完 setImmediate 会在下一个阶段的时候再执行 setTimeout (timers 计时器执行阶段)

```js
const fs = require("fs");
fs.readFile("./index.html", () => {
    setTimeout((_) => console.log("setTimeout"));
    setImmediate((_) => console.log("setImmediate"));
});
```

<details>
<summary>demo2答案</summary>

```js
// setImmediate
// setTimeout
```

</details>

#### demo3

`process.nextTick()`在同一个阶段尾部立即执行。`setImmediate()` 在事件循环的 check 阶段触发。

```js
setImmediate(() => {
    console.log("setImmediate");
});
process.nextTick(() => {
    console.log("nextTick");
});
```

<details>
<summary>demo3答案</summary>

```js
// nextTick
// setImmediate
```

</details>

## 不同 Node 中的 EventLoop

node 11 之前

-   一旦执行一个阶段，会先将这个阶段里的所有任务执行完成之后， 才会执行该阶段剩下的微任务。

node 11 之后（和浏览器保持了一致）

-   一旦执行一个阶段里的一个宏任务，就立刻执行对应的微任务队列。
