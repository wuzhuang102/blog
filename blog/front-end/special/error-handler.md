# 技术解决方案 --- 异常监控与处理

## 1. 错误分类
JavaScript 错误主要分为两类：语法错误 和 运行时错误
### 1.1 语法错误
语法错误会导致程序的崩溃，但在编码阶段这个问题可被编辑器识别
``` js
try {
    var error = 'error'；   // 大写分号
} catch(e) {
    console.log('不会执行到这里，语法分析阶段直接崩溃报错了');
    console.log(e);
}
```
### 1.2 运行时错误
运行时的错误不会导致程序崩溃，但会使当前执行任务的终止
``` js
try{
    error
}catch(e) {
    console.log('会执行到这里，错误会被捕获')
    console.log(e)
}
```

## 2. 异常捕捉
### 2.1 try...catch
`try...catch` 的语法上面也提到过了，就是比较啰嗦，写多了代码看起来很丑陋，它能识别并捕获 `try` 中代码块的异常

`try...catch` 无法捕捉异步代码中的异常，除非 `try...catch` 在异步代码内
``` js
try {
    setTimeout(() => {
        error        // 异步错误
    })
} catch(e) {
    console.log('我感知不到错误');
    console.log(e);
} 
```

### 2.2 [window.onerror](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror)
`winodw.onerror` 捕获异常的能力比 `try...catch` 强点，无论是同步还是异步，他都能捕获
``` js
window.onerror = function (msg, url, row, col, error) {
    console.log('我知道错误了');
    console.log({
        msg,  url,  row, col, error
    })
    return true;  // 返回 true 时，异常才不会继续向上抛出，就不会打印在控制台
};
// 1. 同步
// error;

// 2. 异步
setTimeout(() => {
    error;
});
```

::: tip 注意
- window.onerror 需要写在所有脚本的最前面，写在最后异常是没办法正常获取的
- window.onerror 无法捕获网络异常错误，例如 `img`、`script` 404 时，因为网络请求异常事件不会冒泡
:::

### 2.3 window.addEventListener('error')
这种可以捕获到网络请求的问题，但具体什么问题（404,500）还需要配合后台日志分析

`window.onerror` 只处理运行时错误，`window.addEventListener('error')` 会处理加载和运行时错误，使用视情况而定
``` html
<script>
    window.addEventListener('error', (e) => {
        e.preventDefault()
        console.log('我知道 404 错误了');
        console.log(e);
    }, true);
</script>

<img src="./404.png" alt="">
```
### 2.4 window.addEventListener("unhandledrejection")
Promise 中的异常如果没有被 catch 的话， `onerror`、`try...catch` 也无法捕获，此时可以使用 `window.addEventListener("unhandledrejection")` 来捕获
``` js
window.addEventListener("unhandledrejection", function (e) {
    e.preventDefault()
    console.log(e.reason);
});
Promise.reject('promise error1');
new Promise((resolve, reject) => {
    reject('promise error2');
});
new Promise((resolve) => {
    resolve();
}).then(() => {
    throw 'promise error3'
});
```

## 3. 异常收集上报
### 3.1 fetch
### 3.2 通过 Ajax 上报处理
### 3.3 navigator.sendBeacon
sendBeacon() 方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能。也就是在页面空闲时间执行任务
### 3.4 通过 img 提交
Ajax 上传处理代价比较大，可以利用服务器的日志功能解决异常收集问题
``` js
function report(error) {
    var reportUrl = 'https://error.com/report';
    new Image().src = reportUrl + '?error=' + error;
}
```

## 4. JS生态中的相关问题
### 4.1 Vue 异常处理
Vue 中提供了异常处理api `Vue.config.errorHandler`，
``` js
Vue.config.errorHandler = function(err, vm, info) {

}
```
但它有个问题，就是无法处理异步中的错误，需要我们手动去在异步代码中 catch 这个错误并处理，但我们也可以使用 `window.onerror` ，
处理那些没有被捕获且冒泡到 window 层的

Vue如何处理异步异常，待我看完源码 // todo

### 4.2 source-map
开发环境配合 source-map ,上线环境需要关掉，或者配置内网才可以访问的路径，避免代码裸奔

## 5. 异常平台
- [https://sentry.io/welcome/](https://sentry.io/welcome/)
- [https://www.fundebug.com/](https://www.fundebug.com/)



<br>
<br>
<br>
<br>

**参考博文**
- [掘金 - 前端异常监控](https://juejin.im/post/6844903641619365902)