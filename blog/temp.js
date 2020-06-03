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