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

    then(onFulfilled = val => val) {
        if (this.state === PENDING) {
            return new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    resolve(onFulfilled(this.value))
                })
            })
        }
    }
}