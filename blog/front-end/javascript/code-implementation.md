## 001. async 函数实现
``` js
function asyncToGenerator(generatorFunc) {
    return function() {
      const gen = generatorFunc.apply(this, arguments)
      return new Promise((resolve, reject) => {
        function step(key, arg) {
          let generatorResult
          try {
            generatorResult = gen[key](arg)
          } catch (error) {
            return reject(error)
          }
          const { value, done } = generatorResult
          if (done) {
            return resolve(value)
          } else {
            return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
          }
        }
        step("next")
      })
    }
}
```

## 002. call  apply
``` js
// call
Function.prototype.call2 = function(context) {
    var context = context || window
    context.fn = this
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i ++) {
        args.push('arguments['+ i + ']')
    }
    var result = eval('context.fn(' + args + ')')
    delete context.fn
    return result
}

// apply
Function.prototype.apply2 = function(conetxt) {
    var context = context || window
    context.fn = this
    if(!arr) { result = context.fn() }
    else {
        var args = []
        for(var i = 0, len = arr.length; i < len; i ++) {
            arr.push('arr[' + i + ']')
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn
    return result   
}
```


## 003. bind
``` js
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      	throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```