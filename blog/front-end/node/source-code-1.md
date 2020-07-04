# Node 源码浅析 --- （基本篇）

::: tip 再见
算了，为时过早，干不动
:::

## 文件目录
```
| -- benchmark/
| -- deps/
| -- doc/
| -- lib/
|   | -- assert/
|   | -- dns/
|   | -- fs/
|   | -- internal/              不对外暴露的方法，包装提供给api使用
|   | -- timers/
|   | -- _http_agent.js         node http分两个模块：agent基于客户端，提供一些代理功能
|   | -- _http_client.js                            client发请求的
|   | -- _http_incoming.js      node把所有消息分为两类：incoming对应 request
|   | -- _http_outgoing.js                          outgoing对应 response
|   | -- _http_server.js        server就是把incoming 和 outgoing 两个类串起来做一些解析
|   | -- _stream_duplex.js      可读 && 可写，拥有双工的作用
|   | -- _stream_passthrough.js 
|   | -- _stream_readable.js    可读流
|   | -- _stream_transform.js
|   | -- _stream_wrap.js        一个基类，readable、writeable、uplex、transform都是基于这个基础类实现的
|   | -- _stream_writable.js    可写流
|   | -- _tls_common.js         用于 ssl 接口暴露的实现，很多方法在 c++ 中实现
|   | -- _tls_wrap.js           同上
|   | -- **.js                  **---这些都是node对外提供的api---**
| -- src/                       基于 c++ 的封装
| -- test/
| -- tools/
```
## C++ 与 JS交互

## 一些概念
### 1. Libuv
| 分类 | 操作             | 时间成本     |
|:-----|:-----------------|:-------------|
| 缓存 | L1缓存           | 1 ns         |
|      | L2 缓存          | 4 ns         |
|      | 主存储器         | 100 ns       |
|      | SSD堆积读取      | 16,000ns     |
| I/O  | 往返同一数据中心 | 500,000 ns   |
|      | 物理磁盘寻道     | 4,000,000 ns |
即便是SSD的访问相对于高速版的CPU，仍然是慢速，于是基于事件驱动的IO就出现了，解决高速设备同步等待慢速设备或访问的问题。libuv一统了网络访问、文件访问，做到了跨平台。

#### libuv 架构
![node](/node/libuv.jpg)
Linux上的epoll，OSX和BSD类OS上的kqueue，SunOS上的event ports以及Windows上的IOCP机制。

### 2. V8
现在 JS 引擎的执行过程大致是：源代码 --->抽象语法树 --->字节码 --->JIT--->本地代码。


