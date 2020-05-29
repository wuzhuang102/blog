---
sidebar: auto
---

# Promise 代码实现

## Promise规范
- **state**: 存放当前的状态
    - 等待态（Pending）: 可以迁移至执行态或拒绝态
    - 执行态（Fulfilled）: 不能迁移至其他任何状态;必须拥有一个不可变的终值
    - 拒绝态（Rejected）: 不能迁移至其他任何状态;必须拥有一个不可变的终值
- **value**: 存放当前的状态值
- **then** 方法
- **catch** 方法
- **finally** 方法
- 静态方法 **Promise.all**、**Promise.resolve**


## 代码实现

### step1: 在setTimeout中去resolve
``` js
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED"

class MyPromise {
    constructor(fn) {
        this.state = PENDING;
        this.value = undefined;
        this.resolveCallbacks = [];  // 回调方法执行队列
        const resolve = (val) => {
            this.state = FULFILLED
            this.value = val
            this.resolveCallbacks.map(fn => fn(val))
        }
        const reject = val => {
            this.value = val
            this.state = REJECTED
        }
        fn(resolve, reject)
    }

    then(onFulfilled) {
        if(this.state === PENDING) {
            this.resolveCallbacks.push(onFulfilled)
        }
    }
}

// new MyPromise实例
var promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('step1')
    },100)
}).then(res => {
    console.log("获取到数据：", data);
})
```

### step2: 同步使用resolve,且防止resolve多次
Promise中的函数大致执行顺序是 `fn` --> `resolve` --> `then`，resolve函数执行时，回调函数还未插入队列,这时就需要把 `resolve` 函数中函数体放入一个异步队列，等主线任务完成，`resolveCallbacks` 中插入回调再执行
``` js
// ...
class MyPromise {
    constructor(fn) {
        // ...
        const resolve = (val) => {
            // 将resolve中的代码包裹在setTimeout中，创建一个微任务队列
            setTimeout(() => {
                if (this.state === PENDING) {  // 只有在PENDING状态才可以执行函数
                    this.state = FULFILLED
                    this.value = val
                    this.resolveCallbacks.map(fn => fn(val))
                }
            })
        }
        //...
    }
    // ...
}

// new MyPromise实例
const promise = new MyPromise((resolve, reject) => {
    resolve("step2");
}).then(data => {
    console.log("获取到数据：", data);
});
```

<details>
<summary>step2 完整代码</summary>

``` js
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED"

class MyPromise {
    constructor(fn) {
        this.state = PENDING;
        this.value = undefined;
        this.resolveCallbacks = [];
        const resolve = (val) => {
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = FULFILLED
                    this.value = val
                    this.resolveCallbacks.map(fn => fn(val))
                }
            })
        }
        const reject = val => {
            this.value = val
            this.state = REJECTED
        }
        fn(resolve, reject)
    }

    then(onFulfilled) {
        if (this.state === PENDING) {
            this.resolveCallbacks.push(onFulfilled)
        }
    }
}
```
</details>


### step3: 可以调用then多次
多次调用then方法的核心在于，每次执行完then方法，再返回一个Promise对象并传递接收then方法中的返回值
``` js
class MyPromise {
    constructor(fn) {
        // ...
    }
    then(onFulfilled) {
        if (this.state === PENDING) {
            return new MyPromise((resolve, reject) => {  // 返回一个新的Promise对象并传入这次then的返回值
                this.resolveCallbacks.push(() => {
                    resolve(onFulfilled(this.value))
                })
            })
        }
    }
}

// new MyPromise
var promise = new MyPromise((resolve, reject) => {
    resolve('step3')
}).then(res => {
    console.log('接收到的数据：', res)
    return 'step3.1'
}).then(res => {
    console.log('接收到的数据：', res)
})
```

<details>
<summary>step3 完整代码</summary>

``` js
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED"

class MyPromise {
    constructor(fn) {
        this.state = PENDING;
        this.value = undefined;
        this.resolveCallbacks = [];
        const resolve = (val) => {
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = FULFILLED
                    this.value = val
                    this.resolveCallbacks.map(fn => fn(val))
                }
            })
        }
        const reject = val => {
            this.value = val
            this.state = REJECTED
        }
        fn(resolve, reject)
    }

    then(onFulfilled) {
        if (this.state === PENDING) {
            return new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    resolve(onFulfilled(this.value))
                })
            })
        }
    }
}
```
</details>

### step4: 支持then中空函数
处理then中为空函数，将上一次传入的值直接传递给下一次的then
``` js
class MyPromise {
    // 给一个默认函数，把上次传入的值传递给下一次的then
    then(onFulfilled = val => val) { 
        // ...
    }
}

var promise = new MyPromise((resolve, reject) => {
    resolve('step4')
}).then(res => {
    console.log('接收到的数据：', res)
    return 'step4.1'
}).then().then(res => {
    console.log('接收到的数据：', res)
})
```

<details>
<summary>step4 完整代码</summary>

``` js
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED"

class MyPromise {
    constructor(fn) {
        this.state = PENDING;
        this.value = undefined;
        this.resolveCallbacks = [];
        const resolve = (val) => {
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = FULFILLED
                    this.value = val
                    this.resolveCallbacks.map(fn => fn(val))
                }
            })
        }
        const reject = val => {
            this.value = val
            this.state = REJECTED
        }
        fn(resolve, reject)
    }

    then(onFulfilled) {
        if (this.state === PENDING) {
            return new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    resolve(onFulfilled(this.value))
                })
            })
        }
    }
}
```
</details>

### step5: 支持 then 传递 thenable 对象


[阮一峰 ES6 Promise](https://es6.ruanyifeng.com/#docs/promise)

[图灵社区 Promise](https://www.ituring.com.cn/article/66566)