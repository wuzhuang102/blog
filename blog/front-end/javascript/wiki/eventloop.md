---
sidebar: auto
---

# eventloop

## 事件循环的四个步骤

先执行同步任务  --->  执行微任务 ----> 执行宏任务

1. 函数入栈，当Stack中执行到异步任务的时候，就将他丢给WebAPIs,接着执行同步任务,直到Stack为空；
2. 此期间WebAPIs完成这个事件，把回调函数放入队列中等待执行（微任务放到微任务队列，宏任务放到宏任务队列）
3. 执行栈为空时，Event Loop把微任务队列执行清空；
4. 微任务队列清空后，进入宏任务队列，取队列的第一项任务放入Stack(栈）中执行，回到第1步。

## 浏览器中的任务队列

| 宏任务                | 微任务          |
|:----------------------|:----------------|
| script                | Promise(async)  |
| setTimeout            | MutationOberver |
| setInterval           |                 |
| requestAnimationFrame |                 |

### demo1
``` js
setTimeout(() => {
  console.log("timeout");
}, 0);
const promise = new Promise(resolve => {
  console.log("promise init");
  resolve(1);
  console.log("promise end");
});
promise.then(res => {
  console.log("promise result:", res);
});

```
<details>
<summary>demo1答案</summary>

- 执行顺序
    - 宏任务队列：setTimeout
    - 微任务队列：Promise
    - 同步：promise init ，promise end，微任务：promise result:1，宏任务：timeout

``` js
// promise init     
// promise end     
// promise result:1    
// timeout
```
</details>

### demo2
``` js
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

``` js
// promise2   
// timeout1
// promise1       
// timeout2
```
</details>

## Node eventloop
![node-eventloop](/js/node-eventloop.jpeg)

![node-eventloop](/js/node-eventloop-level.jpg)


## Node中的任务队列
| 宏任务       | 微任务           |
|:-------------|:-----------------|
| setTimeout   | Promise(async)   |
| setInterval  | process.nextTick |
| setImmediate |                  |
| IO           |                  |

- 各阶段
    - timers  ---  `setTimeout`、`setInterval`
    - poll --- `io` 操作
    - check --- `setImmediate`
- `process.nextTick` 优先性大于 `Promise`

- setTimeout 与 setInmmediate 执行顺序不固定

### demo1
``` js
setTimeout(_ => console.log('setTimeout'))
setImmediate(_ => console.log('setImmediate'))
// 每次的执行结果可能不一样
```

### demo2
如果i/o文件操作以后就会先执行setImmediate，因为setImmediate在i/o文件操作后面的那个阶段执行，执行完setImmediate会在下一个阶段的时候再执行setTimeout (timers 计时器执行阶段)
``` js
const fs = require('fs')
fs.readFile('./index.html',()=>{
    setTimeout(_ => console.log("setTimeout"));
    setImmediate(_ => console.log("setImmediate"));
})
```
<details>
<summary>demo2答案</summary>

``` js
// setTimeout
// setImmediate
```
</details>

### demo3
`process.nextTick()`在同一个阶段尾部立即执行。`setImmediate()` 在事件循环的 check 阶段触发。
``` js
setImmediate(()=>{
    console.log('setImmediate')
})
process.nextTick(()=>{
    console.log('nextTick')
})
```
<details>
<summary>demo3答案</summary>

``` js
// nextTick
// setImmediate
```
</details>

## 不同Node中的EventLoop
node 11 之前
 - 一旦执行一个阶段，会先将这个阶段里的所有任务执行完成之后， 才会执行该阶段剩下的微任务。

node 11 之后（和浏览器保持了一致）
- 一旦执行一个阶段里的一个宏任务，就立刻执行对应的微任务队列。