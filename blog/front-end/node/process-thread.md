# Node中的进程与线程
## 进程与线程的概念
### 进程
1. 进程 `Process` 是计算机中程序关于某种数据集上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础
2. 进程是线程的容器
3. 进程是资源分配的最小单位（启动一个服务，运行一个实例都是开启一个服务进程）
4. 多进程就是进程的复制（fork），fork出来的每个进程都拥有自己的独立空间、数据栈，一个进程无法访问另外一个进程里定义的变量、数据结构，只有建立了IPC通信才可以
### 线程
1. 线程是操作系统进行运算调度的最小单位
2. 一个线程只能隶属于一个进程，但是一个进程可以拥有多个线程
3. **单线程**
    - 单线程就是一个进程只开一个线程
    - Node虽然是单线程，但它是基于事件驱动、异步非阻塞模式，可以应用于高并发场景。避免了线程创建、线程之间上下文切换所产生的资源开销
    - 单线程无法利用多核CPU，但可以使用第三方工具解决

## Node中的进程与线程
单核CPU之上我们采用的是 单进程 + 单线程 的模式开发，多核CPU之上，可以通过 `child_process.fork` 开启多进程（多进程 + 单线程）<br>
开启多进程不是为了解决高并发，主要是解决单进程模式下CPU利用率不足的问题
### 1. Process模块
Process 是 Node.js 中的一个全局变量
- `process.env`：环境变量
- `process.nextTick`：事件循环
- `process.pid`：当前进程id
- `process.ppid`：父进程id
- 事件：`process.on('uncaughtException', cb)`捕获异常、`process.on('exit',cb)`进程退出监听
- 三个输出流：`process.stdout`、`process.stdin`、`process.stderr`
### 2. child_process模块
- `child_process.spawn()`：启动一个子进程执行命令
- `child_process.exec()`：启动一个子进程执行命令，与spawn不同的是他有一个回调函数获知子进程情况
- `child_process.execFile()`：启动一个子进程来执行可执行文件
    - 文件首行必须添加 `#!/usr/bin/env node`
- `child_process.fork()`：衍生新的进程，进程之间相互独立，每个进程都有自己的V8实例、内存
``` js
const http = require('http')
const { fork } = require('child_process')

const server = http.createServer((req,res) => {
    if(req.url === '/wuzhuang') {
        const wuzhuang = fork('./wuzhuang.js')
        wuzhuang.send('开启一个子进程')

        wuzhuang.on('message', param => { // 监听子进程 process.send('messgae', param) 发出的数据
            console.log(param)
            wuzhuang.kill()
        })
    }
})
server.listen(3000, '0.0.0.0', () => { console.log('server is listening on port 3000') })
```
### 3. cluster 模块
- cluster 采用的主从模式(Master-Worker)，主进程(cluster.isMaster)不负责具体的业务，主要负责调度和管理
- cluster 只能创建管理一组相同的工作进程，但 child_process 不同，可以创建多个TCP服务
``` js
const http = require('http');
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');
if(cluster.isMaster){
    // fork workers
    for(let i= 0;i<numCPUs;i++){
        cluster.fork();
    }
}else{
    // Worker可以共享同一个TCP连接
    // 这里是一个http服务器
    http.createServer(function(req,res){
        res.writeHead(200);
        res.end('hello word');
    }).listen(8000);
}
```
### 4. 进程间通信
**IPC** 全称 Inter-Process Commmunication。进程间通信是为了让不同的进程能够相互访问资源并协调工作
#### IPC 的技术实现
Node 中的实现 IPC通道 是由管道(pipe)技术，此管道非彼管道，Node中的管道是个抽象层面的称呼，具体细节由libuv实现：**windows下由命名管道(named pipe)实现，\*nix系统下采用 Unix Domain Socket实现**
#### 进程间通信原理
父进程在实际创建子进程之前，会创建 IPC 通道并监听它，然后才真正创建出子进程，并通过环境变量(NODE_CHANNEL_FD)告诉子进程IPC通道的文件描述符。子进程在启动的过程中根据文件描述符去连接这个已经存在的IPC通道，从而完成父子进程之间的连接
#### 浏览器中的主线程与工作线程
HTML5提出了 WebWorker API，它允许主线程创建工作线程并在后台运行。在此之前，同步的任务很容易造成主线程阻塞(例如JS的执行与UI的渲染)
``` js
var worker = new Worker('worker.js)
worker.onmessage = function(event) {
    document.getElementById('result').textContent = event.data;
}

// worker.js     worker.js是一个很费时的操作
// ... 一系列费时操作
postMessage(data)
```
### 5. 句柄传递
- **句柄**：一种可以用来标识资源的引用，它的内部包含了指向对象的文件描述符.
    - 一个句柄可以用来标识一个服务端socket对象，一个客户端socket对象，一个UDP套接字、一个管道等

- **意义**：例如，主进程接收到socket请求后，将这个socket请求直接发送给工作进程，为不是重新与工作进程建立新的socket链接来转发数据（从而避免浪费文件描述符）

- 子进程对象`send()`可以发送的句柄类型
    - net.Socket：TCP 套接字
    - net.Server：TCP 服务器
    - net.Native：C++ 层面的TCP套接字或IPC管道
    - dgram.Socket：UDP 套接字
    - dgram.Native：C++ 层面的UDP套接字

send方法在将消息发送搭配IPC管道前，将消息组装成两个对象，一个参数是handle，另一个是message，message如下
``` js
{
    cmd: 'NODE_HANDLE',
    type: 'net.Server',
    msg: message
}
```
连接了IPC通道的子进程可以读取到父进程发来的消息，将字符串通过JSON.parse()解析还原为对象后，才触发message事件将消息传递给应用层使用，这一过程中消息对象还要进行过滤处理，<br>
message.cmd如果以NODE_为前缀，它将响应一个内部事件internalMessage。<br>
message.cmd如果为NODE_HANDLE，它将取出message.type值和得到的文件描述一起还原出一个对应的对象。
![](/node/sendhandle.png)

## 集群问题
### 进程事件
子进程除了send()方法和 message 事件外，还有一些如下事件
- error：当子进程无法被创建、无法被杀死、无法发送消息时会触发
- exit：子进程退出触发此事件；子进程如果是正常退出，则第一个参数是退出码，否则为null；子进程如果是通过kill方法被杀死的，那么第二个参数表示杀死进程时的信号
    - 在POSIX标准中，有一套完备的信号系统，可使用 `kill -l` 查看
- close：子进程中的标准输入输出流终止时触发该事件，参数与exit相同
- disconnect：父进程或者子进程中调用disconnect()方法触发该事件，方法调用时IPC通道关闭监听

父进程除了send()方法，还能使用kill()给子进程发送信息
``` js
child.kill([signal])

process.kill(pid, [signal])
```
### 自动重启
实现一个多进程自动重启逻辑
- 子进程异常退出时，要保证他能自动重启
``` JS
const { fork } = require('child_process')
const cpus = require('os').cpus()
const server = require('net').createServer()

server.listen(1337)

const limit = 10,
    during = 60000,
    restart = []

// 检测重启是否过于频繁
const isTooFrequently = function() {   
    let time = Date.now(),
        length = restart.push(time)
    if(restart.length > limit) {
        restart = restart.slice(limit * -1)
    }
    return restart.length >= limit && restart[restart.length -1] - restart[0] < during
}

let workers = {}

// 创建工作子进程
var createWorker = function() {
    if(isTooFrequently()) {
        process.emit('giveup', length, during)
        return
    }

    let worker = fork(__dirname, '/worker.js')
    worker.on('exit', function() {
        console.log(`Worker ${worker.pid} exit;`)
        delete workers[worker.pid]
    })
    worker.on('message', function(message) {
        if(message.act === 'suicide'){
            createWorker()
        }
    })
    worker.send('server', server)
    workers[worker.pid] = worker
    console.log(`Create Worker ${work.pid}`)
}
```
worker.js
``` js
var server = http.createServer(function(res, req){
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end(`Handled by child, pid is ${process.pid} \n`)
})

var worker
process.on('message', function(m,tcp) {
    if(m === 'server') [
        worker = tcp
        worker.on('connection', function(socket) {
            server.emit('connection', socket)
        })
    ]
})
process.on('uncaughtException',function(err) {
    // 记录日志 logger.error(err)
    process.send({act:'suicide'})
    worker.close(function() {
        process.exit(1)
    })
    setTimeout(function() { // 超时断开连接
        process.exit(1)
    },5000)
})
```

