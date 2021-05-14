# 网络/安全 专题

## 1. TCP/UDP 区别

-   **区别**

1. TCP 面向连接；UDP 是无连接的，发送数据之前不需要建立连接
2. TCP 提供可靠的服务；UDP 尽力交付，但不保证可靠
3. TCP 面向字节流；UDP 面向报文的，且没有拥塞控制
4. TCP 是点对点的；UDP 可以多对多
5. TCP 开销比较大，首部有 20 字节，UDP 首部只有 8 字节
6. TCP 是可靠的全双工通道；UDP 是不可靠的

-   **TCP 怎样保证数据的正确性**
    -   校验和：发送数据报的二进制相加然后取反，检测数据在传输过程中有没有被修改
    -   确认应答 + 序列号：TCP 的每个包都是有编号的，接收方会进行排序
    -   超时重传
    -   拥塞控制
    -   流量控制：固定的缓冲大小，接收方来不及处理发送方的数据的时候，会提示发送方降低发送速率，防止丢包

*   基于 TCP 的协议
    -   HTTP、FTP、SSH、SMTP
*   基于 UDP 的协议
    -   DNS、TFTP、NTP

使用场景

-   UDP 适用于网络负担重、反映速度快、多为短消息、安全没有过多要求、多 client 的场景

## 2. DNS 解析的过程

1. 浏览器检测自身缓存中有没有被解析过的这个域名对应的 ip 地址，有则结束，没有继续下一步
2. 浏览器 DNS 缓存未命中，浏览器检测操作系统缓存中有没有对应的已解析过的结果
3. 仍未命中，请求本地域名服务器（LDNS）解析这个域名。（这个服务器不会距离我们很远，大约 80%的域名解析到这就完成了）
4. 如果 LDNS 仍未命中，直接跳到 Root Server 域名服务器请求解析
5. Root Server 返回给 LDNS 一个所查询域的主域名服务器（gTLD Server，国际顶尖域名服务器，如 `.com`,`.cn`）
6. 此时 LDNS 再发送请求给上一步返回的 gTLD
7. 接受请求的 gTLD 查找并返回这个域名对应的 Name Server 的地址（就是网站注册的域名服务器）
8. Name Server 根据映射关系表找到目标 ip，返回给 LDNS
9. LDNS 缓存这个域名对应的 ip
10. LDNS 把解析的结果返回给用户，用户根据 TTL 值缓存到本地系统中，至此结束
    <img class="zoom-img" src="/interview/dns.png">

## 3. CDN 原理

-   **域名解析方式**
    -   **A 记录**：即 Adress 记录，可以把它理解为一种指向关系，（域名 www.bestwuzhuang.com -> 111.111.111.111）
    -   **cname 记录**：别名记录，多个域名都可指向同一个域名 （static.1234.com -> www.bestwuzhuang.com）
    -   **NS 记录**（Name Server）：指定负责记录域名的服务器
-   **CDN 流程**
    -   将网站的内内容发布到最接近用户的网络边缘，使用户可以就取得所需的内容，解决 Internet 网络拥塞状况，提高用户访问网站的响应速度
-   **CDN 是怎么优化的**
    -   **负载均衡**：CDN 负载均衡设备会为用户选择一台合适的缓存服务器提供服务
    -   **缓存**：缓存服务器响应用户请求
-   **CDN 的好处**
    -   提升网页加载速度
    -   处理高流量负载
    -   减少带宽消耗
    -   多台服务器均衡负载
    -   使网站免于 DDos 攻击

## 4. 跨域问题

-   **解决方法**
    -   jsonp 跨域
    -   跨域资源共享[cors](http://www.ruanyifeng.com/blog/2016/04/cors.html)
    -   代理 --- nginx、node
    -   以下几种了解即可
        -   `document.domain` + `iframe` 跨域：前提是两者的一级域名是相同的
            -   `news.baidu.com(news.html)` 中有一个 iframe `map.baidu.com(map.html)`，两者使用 `document.domain = 'baidu.com'`,两者就可以相互操作了
        -   `location.hash` + `iframe`
        -   `window.name` + `iframe`
        -   `postMessage`
        -   websocket

## 5. 运营商劫持

-   **劫持方式**
    -   DNS 劫持：这种劫持会把你重新定位到其它网站，我们所熟悉的钓鱼网站就是这个原理。但是因为它的违法性，现在被严厉的监管起来，已经很少见
    -   HTTP 劫持：当运营商发现你的是 HTTP 请求时，就会在里面插入一些奇奇怪怪的广告
    -   HTTPS 劫持：
        -   伪造证书，通过病毒或者其他方式将伪造证书的根证书安装在用户系统中
        -   代理有客户的证书与秘钥，或者与代理认证的时候不校验合法性
-   **防劫持措施**
    -   全站 HTTPS
    -   防劫持代码
    -   记录 Log，提交工信部
-   **防劫持代码**

    -   [代码](https://github.com/lgwebdream/FE-Interview/issues/1056)

    ```html
    <script>
        // 核心 - MutationObserver 提供了监视对DOM树所做更改的能力
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
            observeMutationSupport = !!MutationObserver;
        var html = document.getElementsByTagName("html")[0];
        function mutationHandler(record) {
            // 检验 script、 iframe 源是否在白名单之中
        }
        if (observeMutationSupport) {
            new MutationObserver(mutationHandler).observe(html, {
                childList: true,
                subtree: true,
            });
        }
    </script>
    ```

## 6. Cookie、Session、Token

都是一种用户认证凭证，只是在存储、使用、有效时间上有一些差别

-   **Cookie**
    -   由服务器产生，发送给浏览器，浏览器把 cookie 以 key-value 的形式存在某个目录下的文本文件内，下次请求同一网站时会把该 cookie 发送给服务器
-   **Session**
    -   同 Cookie，只是存储的用户的信息是临时的，用户离开网站后 session 会被销毁；这种更安全，但是应对负债均衡就很尬
-   **Token**
    -   **优势**
        1. 无状态
        2. 安全性：可以防止 CSRF
        3. 可扩展：创建与其他程序共享权限的程序
        4. 多平台

## 7. 浏览器加载一个页面的流程

1. [浏览器接收 url 到开启网络请求线程](/front-end/special/browser.html#_1-浏览器中的进程与线程)
2. 开启网络线程到发出一个完整的 http 请求（[DNS 查询](/interview/network.html#_2-dns-解析的过程)、tcp/ip 、五层因特尔网络协议栈）
3. 服务器接受到请求的处理（负载均衡、安全拦截、后台处理）
4. http 交互（http 头、响应码、报文结构、cookie 及优化、gzip）
5. [缓存问题](/front-end/http/cache.html)（强缓、协商缓存）
6. [浏览器接受到 http 数据后的解析过程](/front-end/special/browser.html#_2-浏览器解析-html-的过程)（html 词法分析生成 DOM、预扫描器、CSSOM、render 树、layout、painting、复合图层合成、GPU 绘制）
7. CSS 单独讲一下（CSS 渲染规则、[BFC、IFC](/front-end/css/formatting-context.html)）
8. [JS 引擎执行过程](/front-end/css/formatting-context.html)（解释阶段、预处理阶段、执行阶段、VO、作用域、回收机制-新生代老生代）
9. 其它知识模块（[跨域](/interview/network.html#_4-跨域问题)、安全）

## 8. [Http2.0](/front-end/http/#_7-http2-0) [Http3.0](/front-end/http/#_8-http3-0)

## 9. ajax/axios/fetch 的区别

-   ajax 是对原生 xhr 的封装
    -   是针对 MVC 的编程，不符合 MVVM 的浪潮
    -   基于 xhr 的开发，xhr 架构不清晰，已经有了 fetch 的替代方案
-   axios 本质是也是 xhr 的封装，只不过是 Promise 的实现版本
    -   node 端也可使用
    -   支持 Promise API
    -   客户端支防止 CSRF（每个请求都从 cookie 中拿到 key，根据浏览器的同源策略，假冒的网站是拿不到 cookie 中的 key 的）
    -   支持并发请求接口
-   fetch 是 ajax 的替代品
    -   简洁、更加语义化
    -   基于 Promise 实现，支持 async/await
    -   更加底层。提供的 API 更丰富（request、response）
    -   脱离了 xhr，是 ES 新规范

## 10. HTTPS 的加密过程

HTTPS 加密过程发生在 TCP 三次握手之后

1. 服务端请求服务器，告诉服务器自己的版本协议、支持的加密算法，并生成一个随机数（第一个）一同发送
2. Server 把配置好的公钥证书(public key certificate)（第二个） 返回给客户端
3. 客户端验证公钥证书：证书是否需有效，验证中间证书、验证根证书
4. 客户端使用伪随机数（第三个）生成加密所使用的的对称秘钥，然后使用公钥加密这个对称秘钥，发送给 Server
5. Server 使用自己的私钥去解密这个消息，获得第三个随机数，利用三个随机数生成最终的“对话秘钥”
6. 服务器端使用对称秘钥加密“明文内容 A”，发送给客户端 ---> 客户端使用对称秘钥解密秘文得到“明文内容 A”

-   非对称加密得到“对话秘钥”，实际传输的数据采用这个秘钥进行对称加密

## 11. 进程与线程

-   **进程**：进程是资源分配的最小单位
-   **线程**：操作系统能够运算调度的最小单位

1. 进程需要分配一大部分的内存，线程只需要分配一部分栈就可以了
2. 一个程序至少有一个进程，一个进程至少有一个线程
3. 进程是资源分配的最小单位，线程是程序执行的最小单位
4. 一个线程可以创建和撤销另一个线程，同一个进程中的多线程可以并发

## 12. WebSocket、Http2 与 Socket

-   WebSocket 是为了解决基于浏览器的程序需要拉取资源时必须发起多个 HTTP 请求和长时间的轮训的问题……而创建的
-   socket 是对 TCP/IP 的封装，本质上只是一个调用接口

-   Websocket 与 http
    -   相同点
        -   都是基于 TCP 的应用层协议
        -   都是使用 Request/Response 模型建立的链接
        -   建立链接的阶段，都会返回相同的 状态码
    -   不同点
        -   WS 使用 HTTP 来建立连接，但是定义了一套新的 header
        -   WS 是全双工的，
        -   WS 建立连接后，数据都使用帧来传递，不再使用 request

## 13. XSS 攻击

-   什么是 CSS 攻击
    -   攻击者向页面写入他的恶意代码获取用户的敏感信息
-   XSS 攻击种类
    -   存储型 XSS：通过漏洞将恶意代码提交到服务器数据库，用户请求时就会执行这段代码
    -   反射型 XSS：放在 URL 地址的参数上
    -   DOM 型 XSS：不涉及服务器，通过各种恶意手段将脚本注入到页面中
-   预防 XSS 攻击策略
    -   用户输入永不信任：过滤用户输入的信息
    -   利用 CSP（内容安全策略）
    ```
    default-sr：配置默认的
    script-src：外部脚本
    style-src：样式表
    img-src：图像
    media-src：媒体文件（音频和视频）
    font-src：字体文件
    object-src：插件（比如 Flash）
    child-src：框架
    frame-ancestors：嵌入的外部资源（比如<frame>、<iframe>、<embed>和<applet>）
    connect-src：HTTP 连接（通过 XHR、WebSockets、EventSource等）
    worker-src：worker脚本
    manifest-src：manifest 文件
    ```
    -   cookie 设置 HTTPOnly，只能从服务器修改 cookie

## 14. CSRF

-   什么是 CSRF
    -   跨站请求伪造，原理就是攻击者构造一个后端请求，诱导用户点击或者通过钓鱼网站发起请求
-   如何预防
    -   对于第三方站点发起的请求，可以通过设置 sameSite，禁止向第三方发送 cookie
    -   验证请求来源，通过 Referer、Origin 判断来源，规避第三方请求
    -   添加 CSRF-Token
