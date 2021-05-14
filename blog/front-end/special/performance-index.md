# 前端性能优化 --- 前端性能指标

[前端性能优化指南[7]--Web 性能指标](https://juejin.im/post/5eb95c53e51d454d94536074)

![](/front-end/special/browser-render.jpg)

| 重要指标 | 计算方式                   |                                                                                                                                  |     |
| :------- | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------- | --- |
| rs       | 准备新页面耗时             | fetchStart - navigationStart                                                                                                     |
| rdc      | 重定向时间                 | redirectEnd - redirectStart                                                                                                      |
| dns      | DNS 解析耗时               | domainLookupEnd - domainLookupStart                                                                                              |
| tcp      | TCP 连接耗时               | connectEnd - connectStart                                                                                                        |
| ssl      | SSL 安全连接耗时           | connectEnd - secureConnectionStart 只在 HTTPS 下有效                                                                             |
| ttfb     | Time to First Byte（TTFB） | responseStart - requestStart TTFB 有多种计算方式，ARMS 以 Google Development 定义为准                                            |
| trans    | 数据传输耗时               | responseEnd - responseStart                                                                                                      |
| dom      | DOM 解析耗时               | domInteractive - responseEnd                                                                                                     |
| res      | 资源加载耗时               | loadEventStart - domContentLoadedEventEnd 表示页面中的同步加载资源                                                               |
| fbt      | 首包时间                   | responseStart - domainLookupStart                                                                                                |
| fpt      | First Paint Time           | 首次渲染时间 / 白屏时间 responseEnd - fetchStart 从请求开始到浏览器开始解析第一批 HTML 文档字节的时间差"                         |
| tti      | Time to Interact           | 首次可交互时间（非准确，仅做参考） domInteractive - fetchStart 浏览器完成所有 HTML 解析并且完成 DOM 构建，此时浏览器开始加载资源 |
| load     | 页面完全加载时间           | loadEventStart - fetchStart load = 首次渲染时间 + DOM 解析耗时 + 同步 JS 执行 + 资源加载耗时                                     |

## 文档加载

### 1. Time to First Byte（TTFB）

浏览器从请求页面到接收到第一个字节的时间，这个时间段内容包括 DNS 查找， TCP 连接和 SSL 连接

### 2. DomContentLoaded（DCL）

DomContentLoaded 事件触发，当 HTML 文档被完全加载和解析完成之后（此事件的触发无需等待样式表、图像和子框架加载完成）

### 3. Load（L）

onLoad 事件触发。页面所有资源加载完成后，此事件才会被触发

## 内容呈现

```js
let t = performance.timing,
    performanceEntries = performance.getEntriesByType("paint") || [];
console.log("DNS查询耗时 ：" + (t.domainLookupEnd - t.domainLookupStart));
console.log("TCP链接耗时 ：" + (t.connectEnd - t.connectStart));
console.log("request请求耗时 ：" + (t.responseEnd - t.responseStart));
console.log("解析dom树耗时 ：" + (t.domComplete - t.domInteractive));
console.log("白屏时间 ：" + (t.responseStart - t.navigationStart));
console.log("domready时间 ：" + (t.domContentLoadedEventEnd - t.navigationStart));
console.log("onload时间 ：" + (t.loadEventEnd - t.navigationStart));
if ((t = performance.memory)) {
    console.log("js内存使用占比 ：" + ((t.usedJSHeapSize / t.totalJSHeapSize) * 100).toFixed(2) + "%");
}
performanceEntries.forEach((entry) => {
    if (entry.name === "first-paint") {
        console.log("first-paint：" + entry.startTime);
    } else if (entry.name === "first-contentful-paint") {
        console.log("first-contentful-paint：" + entry.startTime);
    }
});
```

### 1. First Paint（FP）

从开始加载到浏览器首次绘制像素到屏幕上的时间，也就是页面在屏幕上首次发生视觉变化的时间。

但此变化可能是简单的背景色更新或不引人注意的内容，它并不表示页面内容完整性，可能会报告没有任何可见的内容被绘制的时间

First Paint 不包括默认的背景绘制，但包括非默认的背景绘制

### 2. First Contentful Paint（FCP）

 浏览器首次绘制 DOM 内容的时间，内容必须是文本、图片（包含背景图）、非白色 canvas 或 SVG，也包括带有正在加载中的 Web 字体的文本

这是用户第一次看到页面内容，但不一定是有用的内容。字体加载是影响 FCP 的一个重要因素，字体通常是需要一段时间才能加载的大文件，有些浏览器在加载字体之前会隐藏文本。为了确保在 webfont 加载期间文本保持可见，可以临时显示系统字体。

### 3. First Meaningful Paint（FMP）

页面的主要内容绘制到屏幕上的时间

在 Lighthouse 6.0 中已不推荐使用 FMP，建议使用 [Largest Contentful Paint](https://web.dev/lcp/) 代替。

### 4. Largest Contentful Paint（LCP）

可视区中最大的内容元素呈现到屏幕上的时间，用以估算页面的主要内容对用户的可见时间

```js
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log("LCP candidate:", entry.startTime, entry);
    }
}).observe({ type: "largest-contentful-paint", buffered: true });
```

### 5. Speed Index（SI）

这是一个表示页面可视区域中内容的填充速度的指标，可以通过计算页面可见区域内容显示的平均时间来衡量。

### 6. First Screen Paint（FSP）

页面从开始加载到首屏内容全部绘制完成的时间，用户可以看到首屏的全部内容

如果说 LCP 是用户看到有效内容的最近似的时间，那么在 FSP 这个时间点用户已经看到了可视区域内完整的内容，可以说是衡量用户视觉体验最合适的指标。

## 交互响应

### 1. Cumulative Layout Shift（CLS）

累计布局偏移。测量在页面的整个生命周期中发生的每个意外的样式移动所造成的布局偏移分数的总和

```js
let cls = 0;
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
            cls += entry.value;
            console.log("Current CLS value:", cls, entry);
        }
    }
}).observe({ type: "layout-shift", buffered: true });
```

### 2. Time to Interactive（TTI）

表示网页第一次达到可交互状态的时间。完全达到可交互状态的时间点是在最后一个长任务（Long Task）完成的时间, 并且在随后的 5 秒内网络和主线程是空闲的。

**Long Task**：长任务是需要 50 毫秒以上才能完成的任务

### 3. First CPU Idle（FCI）

页面第一次可以响应用户输入的时间。

FCI 和 TTI 都是页面可以响应用户输入的时间。FCI 发生在用户可以开始与页面交互时；TTI 发生在 用户完全能够（可持续） 与页面交互时。

### 4. First Input Delay（FID）

从用户第一次与页面交互（例如单击链接、点击按钮等）到浏览器实际能够响应该交互的时间

第一次输入延迟通常发生在第一次内容绘制（FCP）和可持续交互时间（TTI）之间，因为页面已经呈现了一些内容，但还不能可靠地交互。

所以对于 FID 这个指标，我们需要关注的是整体的 FID 值分布，而不是单一值。

Google 提供了一个 JS 库 [github.com/GoogleChrom…](https://github.com/GoogleChromeLabs/first-input-delay) 用于测量 FID。

手动实现一个

```js
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        const delay = entry.processingStart - entry.startTime;
        console.log("FID candidate:", delay, entry);
    }
}).observe({ type: "first-input", buffered: true });
```

### 5. Frames Per Second（FPS）

帧率是视频设备产生图像（或帧）的速率，用每秒可以重新绘制的帧数（Frames Per Second，FPS）表示。

**测量方式**<br>
FPS 的测量方式可以参考阿里淘系技术部的这篇 [无线性能优化：FPS 测试](https://fed.taobao.org/blog/taofed/do71ct/measuring-fps)。

在页面重绘前，浏览器会执行传入 requestAnimationFrame 的入参函数，此函数一般用来实现连贯的逐帧动画。 但我们可以在此函数中通过计算获得页面的绘制频率，从而你计算出 FPS

```js
// 代码示例来自：《无线性能优化：FPS 测试》
var lastTime = performance.now();
var frame = 0;
var lastFameTime = performance.now();

var loop = function (time) {
    var now = performance.now();
    var fs = now - lastFameTime;
    lastFameTime = now;
    var fps = Math.round(1000 / fs);
    frame++;
    if (now > 1000 + lastTime) {
        var fps = Math.round((frame * 1000) / (now - lastTime));
        frame = 0;
        lastTime = now;
    }
    window.requestAnimationFrame(loop);
};
window.requestAnimationFrame(loop);
```
