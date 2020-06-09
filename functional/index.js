var curry = require('loadsh').curry

var match = curry(function(what, str) {
    return str.match(what)
})

console.log(match(/o/g, 'Hello World'))
console.log(match(/o/g)('Hello World'))