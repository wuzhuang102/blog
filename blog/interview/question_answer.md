# 大厂interview解答
## 字节飞书
- **一面**
1. 利用 ::before 或者 ::after 皆可
2. 柯里化解题
``` js
function sum(...arg) {
    let allArgs = arg || []
    function add(...argMore) {
        allArgs = allArgs.concat(argMore)
        return add
    }
    add.sumOf = function () {
        return allArgs.reduce((sum, item) => sum + item, 0)
    }
    return add
}

console.log(sum(2, 3)(3, 4, 4))
```
4. 异步调度问题
``` js
class Scheduler {
    constructor() {
        this.tasks = []
        this.usingTasks = []
    }

    taskAdd(fn) {
        return new Promise((resolve, reject) => {
            fn.resolve = resolve
            if (this.usingTasks.length < 2) {
                
                this.taskRun(fn)
            } else {
                this.tasks.push(fn)
            }
        })
    }

    taskRun(fn) {
        this.usingTasks.push(fn)
        fn().then(() => {
            fn.resolve()
            this.taskRemove(fn)
            if (this.tasks.length > 0) {
                this.taskRun(this.tasks.shift())
            }
        })
    }


    taskRemove(fn) {
        let index = this.usingTasks.indexOf(fn)
        this.usingTasks.splice(index, 1)
    }
}

const timeout = (time) => new Promise(resolve => {
	setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
	scheduler.taskAdd(() => timeout(time)).then(() => console.log(order))
}

addTask(400, 4) 
addTask(200, 2) 
addTask(300, 3) 
addTask(100, 1) 
```

- **二面**
4. LRU 算法
``` js
var LRUCache = function(capacity) {
    this.cache = new Map()
    this.depth = capacity
};

LRUCache.prototype.get = function(key) {
    if(this.cache.has(key)) {
        let value = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, value)
        return value
    }
    return -1
};

LRUCache.prototype.put = function(key, value) {
    if(this.cache.has(key)) {
        this.cache.delete(key)
    }else if(this.cache.size >= this.depth ) {
        this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
};
```

## 360 金融
- **三面**
3. jsBridge的原理，webview如何实现和native通信
    - **双向通信的信道**
        - JS 向 Native 发送消息: 调用相关功能、通知 Native 当前 JS 的相关状态等。
        - Native 向 JS 发送消息: 回溯调用结果、消息推送、通知 JS 当前 Native 的状态等。
    - **JavaScript 调用 Native**
        - 注入API：像 WebView 中的 全局对象或者上下文环境中注入对象或方法
        - 拦截URL SCHEME：URL SCHEME 是一种类似于url的链接，是为了方便app直接互相调用设计的，形式和普通的 url 近似
            - Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。
            - iOS 上采用了使用 Ajax 发送同域请求的方式，并将参数放到 head 或 body 里
    - **Native 调用 JavaScript**
        - webview 直接注入 JS 并执行