# 项目高光时刻

-   项目亮点寻找思路
    1. 比较复杂的场景方案设计；
    2. 系统稳定性保障方面的设计：限流、熔断、降级等（6 位数的密码保护 2 位数的存款）；
    3. 线上问题的排查和解决：死锁、宕机、Full GC 频繁等。

## 1. 错误监控平台

-   项目介绍
    -   全局监听页面错误、依据错误等级确定上传优先级（不占用主业务资源），后台依据 source-map 准确定位错误代码
-   项目技术
    -   监控全局错误、资源挂载错误、promise 错误
    -   依据优先级确定上传方式（fetch、xhr、navigator.sendBeacon、img 日志记录）
    -   依据第三方包 source-map 准确定位错误源代码（线上项目不可拥有 source-map，拥有 source-map 的代码需单独在局域网内部署一套）
-   项目代码参照老袁给的

### 项目说明

#### 项目模块

1. 错误收集

-   错误分级：error、warn、info
-   错误捕获：
    -   `try...catch`、`window.onerror`、`window.addEventListener('unhandledrejection')`
-   环境信息：业务信息、设备信息、网络信息和 SDK 信息
- 行为收集机制详解
    1. 点击行为
    2. 发送请求行为
    3. 页面跳转
    4. 控制台打印

2. 错误上报
3. 数据清洗
4. 数据持久化
5. 数据可视化

## 2. 错误回溯平台

-   项目介绍
    -   借助 rrweb 技术，实现用户页面操作录制、事件数据上传、后台回放，准确快速复现 bug
-   项目技术

## 3. 性能监控平台

[前端性能指标](/front-end/special/performance-index.html)、[性能优化文章](https://juejin.cn/post/6940574353926914084)

-   首屏优化
    -   long task 的拆分
-   技术亮点
    -   FCP 、CLS、FID、LCP、TTFB
    -   performance.timing、performanceObserver
    -   FPS 计算（配合 selenium-webdriver）
-   首屏时间的计算
    -   图片的加载、dom 的渲染

## 4. CI、CD 平台

-   **自动化构建**
-   **自动化测试**
    -   单元测试 （60% - 80%）
    -   e2e 测试
    -   视觉回归测试
    -   性能测试 （我么拥有自己的性能监控平台，下一步就是性能测试）
-   **自动化部署**
