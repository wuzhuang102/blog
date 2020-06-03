---
sidebar: auto
---

# Promise 代码实现 
## Promise规范
具体Promise规范请参考文档 [promise 规范](https://www.ituring.com.cn/article/66566),以下是promise拥有的一些属性和方法
- **state**: 存放当前的状态
    - 等待态（Pending）: 可以迁移至执行态或拒绝态
    - 执行态（Fulfilled）: 不能迁移至其他任何状态;必须拥有一个不可变的终值
    - 拒绝态（Rejected）: 不能迁移至其他任何状态;必须拥有一个不可变的终值
- **value**: 存放当前的状态值
- **then** 方法 : promise.then(onFulfilled, onRejected)
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

``` js
// 包装一个判断是否为thenable对象的处理逻辑，方便复用
function promiseResolutionProcedure(promise2, x, resolve, reject) {
    // 判断是thenable对象
    if ((typeof x === 'object' || typeof x === 'function') && x !== null) {
        if(typeof x.then === 'function') {
            x.then(y => {
                promiseResolutionProcedure(promise2, y, resolve, reject)
            },reject)
        }else {
            resolve(x)
        }
    }else {
        resolve(x)
    }
}
class MyPromise {
    constructor(fn) {
        // ...
    }
    then(onFulfilled = val => val) {
        if (this.state === PENDING) {
            const promise2 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    const x = onFulfilled(this.value)
                    promiseResolutionProcedure(promise2,x,resolve,reject)
                })
            })
            return promise2
        }
    }
}

// step5 demo
var promise = new MyPromise((resolve, reject) => {
    resolve('step5')
}).then(res => {
    console.log('接收到的数据：', res)
    return {
        then(r,j) {
            r('step5.1')
        }
    }
}).then(res => {
    console.log('接收到的数据：', res)
})
```
<details>
<summary>step5 完整代码</summary>

``` js
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED"

function promiseResolutionProcedure(promise2, x, resolve, reject) {
    // 判断是thenable对象
    if ((typeof x === 'object' || typeof x === 'function') && x !== null) {
        if(typeof x.then === 'function') {
            x.then(y => {
                promiseResolutionProcedure(promise2, y, resolve, reject)
            },reject)
        }else {
            resolve(x)
        }
    }else {
        resolve(x)
    }
}

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

    then(onFulfilled = val => val) {
        if (this.state === PENDING) {
            const promise2 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    const x = onFulfilled(this.value)
                    promiseResolutionProcedure(promise2,x,resolve,reject)
                })
            })
            return promise2
        }
    }
}
```
</details>

### step6: 支持then传promise对象
``` js
function promiseResolutionProcedure(promise2, x, resolve, reject) {
    // 处理promise对象
    if(x instanceof MyPromise) {
        if(x.state === PENDING) {
            x.then(y => {
                promiseResolutionProcedure(promise2,y.resolve.reject)
            },reject)
        }else {
            x.state === FULFILLED && resolve(x.value)
            x.state === REJECTED && reject(x.value)
        }
    }
    // 判断是thenable对象
    // ...
}

// step 6
var promise = new MyPromise((resolve, reject) => {
    resolve('step6')
}).then(res => {
    console.log('接收到的数据：', res)
    return new Promise((r,j) => {
        r('step6.1')
    })
}).then(res => {
    console.log('接收到的数据：', res)
})
```
<details>
<summary>step6 完整代码</summary>

``` js
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED"

function promiseResolutionProcedure(promise2, x, resolve, reject) {
    // 处理promise对象
    if(x instanceof MyPromise) {
        if(x.state === PENDING) {
            x.then(y => {
                promiseResolutionProcedure(promise2,y.resolve.reject)
            },reject)
        }else {
            x.state === FULFILLED && resolve(x.value)
            x.state === REJECTED && reject(x.value)
        }
    }
    // 判断是thenable对象
    if ((typeof x === 'object' || typeof x === 'function') && x !== null) {
        if(typeof x.then === 'function') {
            x.then(y => {
                promiseResolutionProcedure(promise2, y, resolve, reject)
            },reject)
        }else {
            resolve(x)
        }
    }else {
        resolve(x)
    }
}

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

    then(onFulfilled = val => val) {
        if (this.state === PENDING) {
            const promise2 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    const x = onFulfilled(this.value)
                    promiseResolutionProcedure(promise2,x,resolve,reject)
                })
            })
            return promise2
        }
    }
}
```
</details>

### step7: resolve 传递 promise 对象
``` js
class MyPromise {
    constructor(fn) {
        // ...
        const resolve = (val) => {
            // val 为 promise 时，跳出执行，进行下一次的promise对象处理
            if((typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function') {
                promiseResolutionProcedure(this,val,resolve,reject)
                return
            }
            // ...
        }
    }
}

// step7 demo
var promise = new MyPromise((resolve, reject) => {
    resolve(new Promise((r,j) => {
        r('step7')
    }))
}).then(res => {
    console.log('接收到的数据：', res)
})
```
<details>
<summary>step7 完整代码</summary>

``` js
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED"

function promiseResolutionProcedure(promise2, x, resolve, reject) {
    // 处理promise对象
    if(x instanceof MyPromise) {
        if(x.state === PENDING) {
            x.then(y => {
                promiseResolutionProcedure(promise2,y.resolve.reject)
            },reject)
        }else {
            x.state === FULFILLED && resolve(x.value)
            x.state === REJECTED && reject(x.value)
        }
    }
    // 判断是thenable对象
    if ((typeof x === 'object' || typeof x === 'function') && x !== null) {
        if(typeof x.then === 'function') {
            x.then(y => {
                promiseResolutionProcedure(promise2, y, resolve, reject)
            },reject)
        }else {
            resolve(x)
        }
    }else {
        resolve(x)
    }
}

class MyPromise {
    constructor(fn) {
        this.state = PENDING;
        this.value = undefined;
        this.resolveCallbacks = [];
        const resolve = (val) => {
            // val 为 promise 时，跳出执行，进行下一次的promise对象处理
            if((typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function') {
                promiseResolutionProcedure(this,val,resolve,reject)
                return
            }
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

    then(onFulfilled = val => val) {
        if (this.state === PENDING) {
            const promise2 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    const x = onFulfilled(this.value)
                    promiseResolutionProcedure(promise2,x,resolve,reject)
                })
            })
            return promise2
        }
    }
}
```
</details>


### step8. 处理 then 中的循环 promise
``` js
function promiseResolutionProcedure(promise2, x, resolve, reject) {
    if(promise2 === x) {
        throw new Error('循环引用')
    }
    // ...
」

// step8 demo
const promise = new MyPromise((resolve, reject) => {
    resolve("step8");
});
const promise1 = promise.then(data => {
    return promise1;
});
```
<details>
<summary>step8 完整代码</summary>

``` js
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED"

function promiseResolutionProcedure(promise2, x, resolve, reject) {
    if(promise2 === x) {
        throw new Error('循环引用')
    }
    // 处理promise对象
    if(x instanceof MyPromise) {
        if(x.state === PENDING) {
            x.then(y => {
                promiseResolutionProcedure(promise2,y.resolve.reject)
            },reject)
        }else {
            x.state === FULFILLED && resolve(x.value)
            x.state === REJECTED && reject(x.value)
        }
    }
    // 判断是thenable对象
    if ((typeof x === 'object' || typeof x === 'function') && x !== null) {
        if(typeof x.then === 'function') {
            x.then(y => {
                promiseResolutionProcedure(promise2, y, resolve, reject)
            },reject)
        }else {
            resolve(x)
        }
    }else {
        resolve(x)
    }
}

class MyPromise {
    constructor(fn) {
        this.state = PENDING;
        this.value = undefined;
        this.resolveCallbacks = [];
        const resolve = (val) => {
            // val 为 promise 时，跳出执行，进行下一次的promise对象处理
            if((typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function') {
                promiseResolutionProcedure(this,val,resolve,reject)
                return
            }
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

    then(onFulfilled = val => val) {
        if (this.state === PENDING) {
            const promise2 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    const x = onFulfilled(this.value)
                    promiseResolutionProcedure(promise2,x,resolve,reject)
                })
            })
            return promise2
        }
    }
}
```
</details>

### step9: 静态方法 Promise.all
``` js
class MyPromise {
    static all(promiseArray) {
        return new MyPromise((resolve,reject) => {
            const resultArray = []
            let successTimes = 0
            function processResult(index, data) {
                resultArray[index] = data
                successTimes++
                if(successTimes === promiseArray.length) {
                    resolve(resultArray)
                }
            }
            for(let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(data => {
                    processResult(i ,data)
                },err => {  reject(err) })
            }
        })
    }
    // ...
}

// step9 demo
MyPromise.all([
    new MyPromise(resolve => { resolve(1) }),
    new MyPromise(resolve => { resolve(2) })
]).then(dataList => {
    console.log(dataList);
});
```

<details>
<summary>step9 完整代码</summary>

``` js
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED"

function promiseResolutionProcedure(promise2, x, resolve, reject) {
    if(promise2 === x) {
        throw new Error('循环引用')
    }
    // 处理promise对象
    if(x instanceof MyPromise) {
        if(x.state === PENDING) {
            x.then(y => {
                promiseResolutionProcedure(promise2,y.resolve.reject)
            },reject)
        }else {
            x.state === FULFILLED && resolve(x.value)
            x.state === REJECTED && reject(x.value)
        }
    }
    // 判断是thenable对象
    if ((typeof x === 'object' || typeof x === 'function') && x !== null) {
        if(typeof x.then === 'function') {
            x.then(y => {
                promiseResolutionProcedure(promise2, y, resolve, reject)
            },reject)
        }else {
            resolve(x)
        }
    }else {
        resolve(x)
    }
}

class MyPromise {
     static all(promiseArray) {
        return new MyPromise((resolve,reject) => {
            const resultArray = []
            let successTimes = 0
            function processResult(index, data) {
                resultArray[index] = data
                successTimes++
                if(successTimes === promiseArray.length) {
                    resolve(resultArray)
                }
            }
            for(let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(data => {
                    processResult(i ,data)
                },err => {  reject(err) })
            }
        })
    }
    constructor(fn) {
        this.state = PENDING;
        this.value = undefined;
        this.resolveCallbacks = [];
        const resolve = (val) => {
            // val 为 promise 时，跳出执行，进行下一次的promise对象处理
            if((typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function') {
                promiseResolutionProcedure(this,val,resolve,reject)
                return
            }
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

    then(onFulfilled = val => val) {
        if (this.state === PENDING) {
            const promise2 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    const x = onFulfilled(this.value)
                    promiseResolutionProcedure(promise2,x,resolve,reject)
                })
            })
            return promise2
        }
    }
}
```
</details>


### step10: 支持reject
``` js

class MyPromise {
    // ...
    constructor(fn) {
        // ...
        const reject = val => {
            if ((typeof val === "object" || typeof val === "function") && typeof val.then === 'function') {
                promiseResolutionProcedure(this, val, resolve, reject);
                return;
            }
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.value = val;
                    this.state = REJECTED;
                    // 执行所有的 then 方法
                    this.rejectedCallbacks.map(fn => fn());
                }
            });
        }
        fn(resolve, reject)
    }
    then(onFulfilled = val => val, onRejected = err => { throw new Error(err) }) {
        if (this.state === PENDING) {
            const promise2 = new MyPromise((resolve, reject) => {
                //    ...
                this.rejectedCallbacks.push(() => {
                    const x = onRejected(this.value);
                    promiseResolutionProcedure(promise2, x, resolve, reject);
                });
            })
            return promise2
        }
    }
}


// step 10 demo
const promise = new MyPromise((resolve, reject) => {
    reject("step11");
}).then(
    data => { console.log("resolve 值：", data) },
    rej => { console.log("reject 值：", rej) }
);
```

<details>
<summary>step10 完整代码</summary>

``` js
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED"

function promiseResolutionProcedure(promise2, x, resolve, reject) {
    if (promise2 === x) {
        throw new Error('循环引用')
    }
    // 处理promise对象
    if (x instanceof MyPromise) {
        if (x.state === PENDING) {
            x.then(y => {
                promiseResolutionProcedure(promise2, y.resolve.reject)
            }, reject)
        } else {
            x.state === FULFILLED && resolve(x.value)
            x.state === REJECTED && reject(x.value)
        }
    }
    // 判断是thenable对象
    if ((typeof x === 'object' || typeof x === 'function') && x !== null) {
        if (typeof x.then === 'function') {
            x.then(y => {
                promiseResolutionProcedure(promise2, y, resolve, reject)
            }, reject)
        } else {
            resolve(x)
        }
    } else {
        resolve(x)
    }
}

class MyPromise {
    static all(promiseArray) {
        return new MyPromise((resolve, reject) => {
            const resultArray = []
            let successTimes = 0
            function processResult(index, data) {
                resultArray[index] = data
                successTimes++
                if (successTimes === promiseArray.length) {
                    resolve(resultArray)
                }
            }
            for (let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(data => {
                    processResult(i, data)
                }, err => { reject(err) })
            }
        })
    }

    constructor(fn) {
        this.state = PENDING;
        this.value = undefined;
        this.resolveCallbacks = [];
        this.rejectedCallbacks = []
        const resolve = (val) => {
            // val 为 promise 时，跳出执行，进行下一次的promise对象处理
            if ((typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function') {
                promiseResolutionProcedure(this, val, resolve, reject)
                return
            }
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = FULFILLED
                    this.value = val
                    this.resolveCallbacks.map(fn => fn(val))
                }
            })
        }
        const reject = val => {
            if ((typeof val === "object" || typeof val === "function") && typeof val.then === 'function') {
                promiseResolutionProcedure(this, val, resolve, reject);
                return;
            }
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.value = val;
                    this.state = REJECTED;
                    // 执行所有的 then 方法
                    this.rejectedCallbacks.map(fn => fn());
                }
            });
        }
        fn(resolve, reject)
    }

    then(onFulfilled = val => val, onRejected = err => { throw new Error(err) }) {
        if (this.state === PENDING) {
            const promise2 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    const x = onFulfilled(this.value)
                    promiseResolutionProcedure(promise2, x, resolve, reject)
                })

                this.rejectedCallbacks.push(() => {
                    const x = onRejected(this.value);
                    promiseResolutionProcedure(promise2, x, resolve, reject);
                });
            })
            return promise2
        }
    }
}
```
</details>


### step11: 支持处理完成态或失败态的then
``` js
class MyPromise {
    then(onFulfilled = val => val, onRejected = err => { throw new Error(err) }) {
        let promise2 = null;
        // 处理已经完成的promise
        if (this.state === FULFILLED) {
            promise2 = new MyPromise((resolve, reject) => {
                const x = onFulfilled(this.value);
                promiseResolutionProcedure(promise2, x, resolve, reject);
            });
        }

        // 处理已经完成的promise
        if (this.state === REJECTED) {
            promise2 = new MyPromise((resolve, reject) => {
                const x = onRejected(this.value);
                promiseResolutionProcedure(promise2, x, resolve, reject);
            });
        }

        // ...
    }
}

// step11 demo
const promise = new MyPromise((resolve, reject) => {
    resolve("step12");
});
setTimeout(() => {
    promise.then(data => { console.log("step12:", data)  });
    promise.then(data => { console.log("step12:", data) });
}, 100)
```
<details>
<summary>step11 完整代码</summary>

``` js
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED"

function promiseResolutionProcedure(promise2, x, resolve, reject) {
    if (promise2 === x) {
        throw new Error('循环引用')
    }
    // 处理promise对象
    if (x instanceof MyPromise) {
        if (x.state === PENDING) {
            x.then(y => {
                promiseResolutionProcedure(promise2, y.resolve.reject)
            }, reject)
        } else {
            x.state === FULFILLED && resolve(x.value)
            x.state === REJECTED && reject(x.value)
        }
    }
    // 判断是thenable对象
    if ((typeof x === 'object' || typeof x === 'function') && x !== null) {
        if (typeof x.then === 'function') {
            x.then(y => {
                promiseResolutionProcedure(promise2, y, resolve, reject)
            }, reject)
        } else {
            resolve(x)
        }
    } else {
        resolve(x)
    }
}

class MyPromise {
    static all(promiseArray) {
        return new MyPromise((resolve, reject) => {
            const resultArray = []
            let successTimes = 0
            function processResult(index, data) {
                resultArray[index] = data
                successTimes++
                if (successTimes === promiseArray.length) {
                    resolve(resultArray)
                }
            }
            for (let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(data => {
                    processResult(i, data)
                }, err => { reject(err) })
            }
        })
    }

    constructor(fn) {
        this.state = PENDING;
        this.value = undefined;
        this.resolveCallbacks = [];
        this.rejectedCallbacks = []
        const resolve = (val) => {
            // val 为 promise 时，跳出执行，进行下一次的promise对象处理
            if ((typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function') {
                promiseResolutionProcedure(this, val, resolve, reject)
                return
            }
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = FULFILLED
                    this.value = val
                    this.resolveCallbacks.map(fn => fn(val))
                }
            })
        }
        const reject = val => {
            if ((typeof val === "object" || typeof val === "function") && typeof val.then === 'function') {
                promiseResolutionProcedure(this, val, resolve, reject);
                return;
            }
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.value = val;
                    this.state = REJECTED;
                    // 执行所有的 then 方法
                    this.rejectedCallbacks.map(fn => fn());
                }
            });
        }
        fn(resolve, reject)
    }

    then(onFulfilled = val => val, onRejected = err => { throw new Error(err) }) {
        let promise2 = null;
        // 处理已经完成的promise
        if (this.state === FULFILLED) {
            promise2 = new MyPromise((resolve, reject) => {
                const x = onFulfilled(this.value);
                promiseResolutionProcedure(promise2, x, resolve, reject);
            });
        }

        // 处理已经完成的promise
        if (this.state === REJECTED) {
            promise2 = new MyPromise((resolve, reject) => {
                const x = onRejected(this.value);
                promiseResolutionProcedure(promise2, x, resolve, reject);
            });
        }

        if (this.state === PENDING) {
            promise2 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    const x = onFulfilled(this.value)
                    promiseResolutionProcedure(promise2, x, resolve, reject)
                })

                this.rejectedCallbacks.push(() => {
                    const x = onRejected(this.value);
                    promiseResolutionProcedure(promise2, x, resolve, reject);
                });
            })
            return promise2
        }
    }
}
```
</details>



[阮一峰 ES6 Promise](https://es6.ruanyifeng.com/#docs/promise)

[图灵社区 Promise](https://www.ituring.com.cn/article/66566)