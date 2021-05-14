# Web Worker
## 1. 概述
Web Worker 是一个使得 Web 应用程序可以在与主执行线程分离的后台进程中运行脚本操作的技术。

这样做的好处就是主线程可以把计算密集型或者高延迟的任务交给 worker 线程执行，这样主线程就会变得轻松，不会被阻塞或拖慢。但这并不意味着JS语言本身支持了多线程能力，而是浏览器作为宿主环境提供了JS一个多线程运行的环境

[web worker兼容性](https://caniuse.com/?search=webworker)
## 2. 使用
### 2.1 使用
#### 2.1.1 基本API
``` js
const myWorker = new Worker(jsUrl, options)
```
- 主线程中的api,worker 是 Worker 的实例
    - `worker.postMessage`：主线程向 worker 线程发送消息
    - `worker.terminate`：主线程关闭 worker 线程
    - `worker.onmessage`：接收 worker 线程的消息, 或者 `worker.addEventListener('message', cb)`
    - `worker.onerror`：指定线程发生错误的回调，或者 `worker.addEventlistener('error', cb)`
- worker 线程中全局对象为 self，这时的 this 指向 self
    - `self.postMessage`：向主线程发送消息
    - `self.close`：关闭自己
    - `self.onmessage`：接收主线程发送的消息, 或者 `self.addEventListener('message', cb)`
    - `self.onerror`：自己发生错误的回调，或者 `self.addEventlistener('error', cb)`

#### 2.1.2 demo
``` html
<!-- index.html -->
<div>
    Worker 输出内容：<span id='app'></span>
    <input type='text' title='' id='msg'>
    <button onclick='sendMessage()'>发送</button>
    <button onclick='stopWorker()'>stop!</button>
</div>

<script type='text/javascript'>
    if (typeof (Worker) === 'undefined')	// 使用Worker前检查一下浏览器是否支持
        document.writeln(' Sorry! No Web Worker support.. ')
    else {
        window.w = new Worker('worker.js')
        window.w.onmessage = ev => {
            document.getElementById('app').innerHTML = ev.data
        }

        window.w.onerror = err => {
            w.terminate()
            console.log(error.filename, error.lineno, error.message) // 发生错误的文件名、行号、错误内容
        }

        function sendMessage() {
            const msg = document.getElementById('msg')
            window.w.postMessage(msg.value)
        }

        function stopWorker() {
            window.w.terminate()
        }
    }
</script>
```

``` js
// worker.js
let i = 1
function simpleCount() {
    i++
    self.postMessage(i)
    setTimeout(simpleCount, 1000)
}
simpleCount()
self.onmessage = ev => {
    postMessage(ev.data + ' 呵呵~')
}
```
### 2.2 注意事项
- worker 线程执行的脚本必须和主线程的脚本文件同源
- worker 线程无法读取本地文件，索价在的脚本必须来源于网络
- DOM 操作限制：worker 线程与主线程运行的全局上下文是不一样的，无法读取主线程所在网页的 DOM 对象、document、window 等，但是可以获取 navigator、location、CMLHttpRequest、setTimeout 等
- worker 线程与主线程必须通过 postMessage 通信


## 3. 使用场景
1. 加密数据
2. 预取数据
3. 预渲染
4. 复杂数据处理
5. 预加载图片


<br>
<br>
<br>

**参考博文**
- [https://juejin.im/post/6844903638431694862](https://juejin.im/post/6844903638431694862)