# 程序设计

## 1. 图片懒加载

-   **实现方案**
    1. 在 img 元素上，自定义一个 data-src 属性，存放图片地址
    2. 获取屏幕可视区域尺寸
    3. 获取元素到窗口边缘的距离
    4. 判断元素是否在可视区域内，若在就将 data-src 值赋给 src
-   **使用的技术**
    1. IntersectionObserver 异步观察目标元素与顶级文档 viewport 的交集中的变化方法
    2. requestIdleCallback() 浏览器空闲时间会调用
-   **判断是否在可视区域的方式**
    1. 屏幕可视区域的高度 + 滚动距离 > 元素到文档顶部距离
    ```js
    var imgs = document.querySelectorAll("img");
    function lazyLoad1(imgs) {
        //offsetTop是元素与offsetParent的距离，循环获取直到页面顶部
        function getTop(e) {
            var T = e.offsetTop;
            while ((e = e.offsetParent)) {
                T += e.offsetTop;
            }
            return T;
        }
        var H = document.documentElement.clientHeight; //获取可视区域高度
        var S = document.documentElement.scrollTop || document.body.scrollTop;
        Array.from(imgs).forEach(function (img) {
            // +100 提前100个像素就开始加载
            // 并且只处理没有src即没有加载过的图片
            if (H + S + 100 > getTop(img) && !img.src) {
                img.src = img.dataset.src;
            }
        });
    }
    const throttleLazyLoad1 = throttle(lazyLoad1, 200);
    ```
    2. getBoundingClientRect() 获取元素大小和位置
    ```js
    function lazyLoad2(imgs) {
        function isIn(el) {
            var bound = el.getBoundingClientRect();
            var clientHeight = window.innerHeight;
            return bound.top <= clientHeight + 100;
        }
        Array.from(imgs).forEach(function (img) {
            if (isIn(img) && !img.src) {
                img.src = img.dataset.src;
            }
        });
    }
    const throttleLazyLoad2 = throttle(lazyLoad2, 200);
    ```
    3. IntersectionObserver 自动观察

## 2. localstorage 超出限制怎么办

1. localstorage 在同一个域下最大限制一般为 5M，超过我们可以使用 PostMessage 实现跨域存储
2. 接收方使用 iframe 创建一个 window，通过监听 message 事件获取消息

-   业务站点

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>

    <body>
        <iframe src="http://127.0.0.1:8081/C.html" id="ifr1" frameborder="0" scrolling="no"></iframe>

        <button onclick="setLocalStorage()">set</button>
        <button onclick="getLocalStorage()">get</button>
        <button onclick="removeLocalStorage()">remove</button>
    </body>
</html>

<script>
    var iframeDOM = document.getElementById("ifr1");
    // iframe加载完毕后再发送消息，否则子页面接收不到message
    // iframeDOM.onload = function () {
    // }

    // 将 localStorage 存储到 iframe 中
    function setLocalStorage() {
        iframeDOM.contentWindow.postMessage(JSON.stringify({ type: "SET", key: "key", value: "value" }), "*");
    }

    // 获取 iframe 中的localStorage
    function getLocalStorage() {
        window.addEventListener(
            "message",
            function (event) {
                if (iframeDOM.contentWindow != event.source) {
                    return;
                }
                console.log("post", event);
            },
            false
        );
        iframeDOM.contentWindow.postMessage(JSON.stringify({ type: "GET", key: "key" }), "*");
    }

    // 删除 iframe 中的 localstorage
    function removeLocalStorage() {
        iframeDOM.contentWindow.postMessage(JSON.stringify({ type: "REM", key: "key" }), "*");
    }
</script>
```

-   postmessage 接收数据一方

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>

    <body></body>
</html>

<script>
    (function (doc, win, undefined) {
        var fn = function () {};
        fn.prototype = {
            /*本地数据存储*/
            setLocalCookie: function (k, v, t, domain) {
                typeof window.localStorage !== "undefined"
                    ? localStorage.setItem(k, v)
                    : (function () {
                          t = t || 365 * 12 * 60 * 60;
                          domain = domain ? domain : ".zss.com";
                          document.cookie = k + "=" + v + ";max-age=" + t + ";domain=" + domain + ";path=/";
                      })();
            },
            getLocalCookie: function (k) {
                k = k || "localDataTemp";
                return typeof window.localStorage !== "undefined"
                    ? localStorage.getItem(k)
                    : (function () {
                          var all = document.cookie.split(";");
                          var cookieData = {};
                          for (var i = 0, l = all.length; i < l; i++) {
                              var p = all[i].indexOf("=");
                              var dataName = all[i].substring(0, p).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                              cookieData[dataName] = all[i].substring(p + 1);
                          }
                          return cookieData[k];
                      })();
            },
            clearLocalData: function (k) {
                k = k || "localDataTemp";
                typeof window.localStorage !== "undefined"
                    ? localStorage.removeItem(k)
                    : (function () {
                          document.cookie = k + "=temp" + ";max-age=0";
                      })();
            },
            init: function () {
                this.bindEvent();
            },
            bindEvent: function () {
                var _this = this;
                win.addEventListener(
                    "message",
                    function (event) {
                        if (win.parent != event.source) {
                            return;
                        }
                        var options = JSON.parse(event.data);
                        if (options.type == "GET") {
                            var data = tools.getLocalCookie(options.key);
                            win.parent.postMessage(data, "*");
                        }
                        options.type == "SET" && _this.setLocalCookie(options.key, options.value);
                        options.type == "REM" && _this.clearLocalData(options.key);
                    },
                    false
                );
            },
        };
        var tools = new fn();
        tools.init();
    })(document, window);
</script>
```

## 3. setTimeout 与 setInterval 定时不准确

JS 是单线程执行的，异步事件只有在线程空闲时才会被调度

1. 动态计算时差

```js
let count = 0,
    runtime,
    startTime = performance.now();
function func() {
    runtime = performance.now();
    ++count;
    let time = runtime - (startTime + count * 1000);
    t = setTimeout(func, 1000 - time);
}
```

2. 使用 web worker

web worker 是 JS 创建多线程的手段，允许主线程创建 Worker 线程，worker 线程中就不会因为 eventloop 的缘故而计时不准确，然后通过 onmessage、postMessage 传输数据

```js
// worker 解决方案
let worker = new Worker("worker.js");

worker.onmessage = function (event) {
    console.log("Received message " + event.data);
    // doSomething();
};

// worker.js
var count = 0;
var runTime;
var startTime = performance.now();
setInterval(function () {
    runTime = performance.now();
    ++count;
    console.log("worker任务", count + " --- 延时：" + (runTime - (startTime + 1000)) + " 毫秒");
    startTime = performance.now();
}, 1000);
```
