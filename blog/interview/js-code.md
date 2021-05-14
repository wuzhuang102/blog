# JS 编码实践

## 1. 深拷贝

-   知识点
    -   typeof 类型：string、number、boolean、undefined、function、object symbol、bigint
    -   instanceof：右边变量的 prototype 在左边变量的原型链上
    -   Object.toString 的实现原理是啥 `[object constructor.name]`
    -   丐中丐版本：JSON.parse(JSON.stringfy())
-   终极版本

    ```js
    // 常规的 complexData 中 obj还可以是是 fucntion ，但这里 function 不用遍历，就没有判断了
    const isComplexDataType = (obj) => typeof obj === "object" && obj !== null;

    const deepClone = function (obj, hash = new WeakMap()) {
        if (hash.has(obj)) return hash.get(obj);
        let type = [Date, RegExp, Set, Map, WeakMap, WeakSet];
        if (type.includes(obj.constructor)) return new obj.constructor(obj);

        let cloneObj = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
        hash.set(obj, cloneObj);

        for (let key of Reflect.ownKeys(obj)) {
            cloneObj[key] = isComplexDataType(obj[key]) ? deepClone(obj[key], hash) : obj[key];
        }
        return cloneObj;
    };
    ```

## 2. bind

1. bind 生成的函数没有 `prototype` 属性
2. bind 生成的函数在 new 的过程中，传入的 this 失效，但是参数依然有效

```js
Function.prototype.bind = function (context) {
    let that = this,
        args = Array.prototype.slice.call(arguments, 1);
    const fNOP = function () {};

    const fBound = function () {
        let moreArgs = Array.prototype.slice.call(arguments);
        return that.apply(this instanceof fBound ? this : context, [...args, ...moreArgs]);
    };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
};
```

## 3. apply/call

```JS
Function.prototype.apply = function (context, ...args) {
    if (typeof this !== "function") return new TypeError("is not a function");
    context = context || window;
    const fn = this;
    context.fn = fn;
    args = (args && args[0]) || [];
    let result = context.fn(...args);
    delete context.fn;
    return result;
};
```

## 4. async

```js
function asyncToGenerator(generatorFunc) {
    return function () {
        const gen = generatorFunc.apply(this, arguments);
        return new Promise((resolve, reject) => {
            function step(key, arg) {
                let generatorResult;
                try {
                    generatorResult = gen[key](arg);
                } catch (error) {
                    return reject(error);
                }
                const { value, done } = generatorResult;
                if (done) {
                    return resolve(value);
                } else {
                    return Promise.resolve(value).then(
                        (val) => step("next", val),
                        (err) => step("throw", err)
                    );
                }
            }
            step("next");
        });
    };
}
```

## 5. Promise

-   [Promise 详解](/front-end/javascript/code/promise.html)
-   此 MyPromise 支持：resolve、reject、Promise.resolve、Promise.alls

```js
const PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected";

class MyPromise {
    constructor(fn) {
        this.state = PENDING;
        this.val = undefined;
        this.resolveCallbacks = [];
        const resolve = (val) => {
            setTimeout(() => {
                this.state = FULFILLED;
                this.val = val;
                this.resolveCallbacks.map((fn) => fn(val));
            }, 0);
        };
        const reject = (val) => {
            this.state = REJECTED;
            this.val = val;
        };
        try {
            fn(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled = (val) => val, onRejected = (val) => val) {
        if (this.state === PENDING) {
            return new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    resolve(onFulfilled(this.val));
                });
            });
        }
    }

    static resolve(val) {
        return new MyPromise((resolve) => resolve(val));
    }

    static all(promiseArr) {
        return new MyPromise((resolve, reject) => {
            let result = [],
                successTime = 0;
            function processResult(i, data) {
                result[i] = data;
                successTime++;
                if (successTime === promiseArr.length) {
                    resolve(result);
                }
            }

            for (let i = promiseArr.length - 1; i >= 0; i--) {
                promiseArr[i].then(
                    (data) => {
                        processResult(i, data);
                    },
                    (err) => {
                        reject(err);
                    }
                );
            }
        });
    }
}
```

## 6. new

```js
function newOperator(fn) {
    if (typeof fn !== "function") throw "the first param must be a function";
    newOperator.target = fn; // ES6 中的new.target指向的是构造函数

    let args = Array.prototype.slice.call(arguments, 1);
    let obj = {}; // 1. 创建空对象
    obj.__proto__ = fn.prototype; // 2. 链接新创建对象到函数的原型上
    // 前两步可以直接使用 Object.create(fn.prototype)
    let result = fn.apply(obj, args); // 3. 将新创建的对象作为 fn 的上下文 this
    let isComplexData = (typeof result === "object" || typeof result === "function") && result !== null;
    return isComplexData ? result : obj; // 4. 如果函数没有返回对象，则创建新创建的对象
}
```

## 7. 防抖、节流

[进阶版](/front-end/javascript/wiki/防抖与节流.html)

-   **防抖**

```js
function debounce(fn, wait) {
    let timer;
    let debounced = function () {
        let _this = this,
            args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(_this, args);
            timer = null;
        }, wait);
    };

    debounced.cancel = function () {};

    return debounced;
}
```

-   **节流**

```js
function throttle(fn, wait) {
    let timer;
    let throttled = function () {
        let _this = this,
            args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(_this, args);
                timer = null;
            }, wait);
        }
    };
    return throttled;
}
```

## 8. compose

```js
function compose() {
    var fns = [].slice.call(arguments);
    return function (initialArg) {
        var res = initialArg;
        for (var i = fns.length - 1; i > -1; i--) {
            res = fns[i](res);
        }
        return res;
    };
}
```

## 9. Array.prototype.reduce

```js
Array.prototype.reduce = function (fn, initVal) {
    if (typeof fn !== "function") return TypeError("first param must be a function!");
    let startIndex = initVal === undefined ? 1 : 0,
        prev = initVal === undefined ? this[0] : initVal;
    for (let i = startIndex, len = this.length; i < len; i++) {
        prev = fn(prev, this[i], i, this);
    }
    return prev;
};
```

## 10. 实现一个带并发限制的异步调度器 Scheduler,保证同时运行的任务最多有两个

```js
const MAX_TASK = 2;

class Scheduler {
    constructor() {
        this.tasks = [];
        this.runingTasks = [];
    }

    add(promiseCreator) {
        return new Promise((resolve) => {
            promiseCreator.resolve = resolve;
            if (this.runingTasks.length < MAX_TASK) {
                this.run(promiseCreator);
            } else {
                this.tasks.push(promiseCreator);
            }
        });
    }

    run(promiseCreator) {
        this.runingTasks.push(promiseCreator);
        promiseCreator().then((res) => {
            promiseCreator.resolve(res);
            this.move(promiseCreator);
            if (this.tasks.length) {
                this.run(this.tasks.shift());
            }
        });
    }

    move(promiseCreator) {
        let index = this.runingTasks.indexOf(promiseCreator);
        this.runingTasks.splice(index, 1);
    }
}
```

## 11. 实现一个 36 进制加法

```js
function add(a, b) {
    if (a < 0 || b < 0) return null;
    const list = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let i = a.length - 1,
        j = b.length - 1,
        temp = 0,
        result = [];

    while (i >= 0 || j >= 0) {
        let indexA = i >= 0 ? list.indexOf(a[i]) : 0,
            indexB = j >= 0 ? list.indexOf(b[j]) : 0,
            sum = indexA + indexB + temp;
        temp = 0;
        if (sum >= 36) {
            sum = sum - 36;
            temp = 1;
        }
        result.unshift(list[sum]);
        i--;
        j--;
    }
    if (temp == 1) result.unshift("1");
    return result.join("").replace(/^[0]+/g, "");
}
```
