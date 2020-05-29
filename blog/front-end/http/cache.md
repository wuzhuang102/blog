http缓存分两种 `强缓存` 与 `协商缓存`，主要作用是加快资源获取速度，提升用户体验，减少网络传输、降低服务器压力。

![http-cache](/http/http-cache.jpg)

## 强存缓
不需要发送请求到服务器，直接读取浏览器本地缓存，chrome中状态码为200；chrome中内存又分为Disk Cache 和 Memory Cache，存放的位置由浏览器控制，由`Expires` `Cache-Control`  `Pragma` 3个Header来控制

### Expires
Expires 是一个日期，浏览器发起请求时，会根据系统时间和Expires的值进行比较，超过了则缓存失效。由于计算机时间不准确的原因可能导致缓存失效， Expires 在三个中优先级最低。

### Cache-Control
请求头和响应头中都可以使用

- max-age: 单位秒，缓存的时间计算方式是距离发起的时间的秒数，超过间隔的秒数缓存失效
- no-cache: 不使用缓存，需要与服务器验证缓存是否新鲜
- no-store: 禁止使用缓存（包括协商缓存），每次都重新请求新资源
- private: 专用于个人的缓存，中间代理、CDN不能缓存此响应
- public: 响应可以被中间代理、CDN缓存
- must-revalidate: 缓存过期前可以使用，过期后必须向服务器验证


### pragma
只有一个属性值，就是no-cache,效果与Cache-Control中的no-cache一致，不使用强缓存，需要与服务器验证缓存是否新鲜，优先级最高



## 协商缓存
当浏览器的强缓存失效或者不走强缓存的时候，并且在请求头中设置可If-Modified-Since 或者 If-None-Match 的时候，会将这两个属性值到服务器去验证是否命中了协商缓存，如果命中，返回304，加载浏览器缓存，并且响应头会设置Last-Modified 或者 Etag。

- Etag 优先级 高于 Last-Modified

### Etag/If-None-Match
ETag 为 response header,  If-None-Match 为 request header

ETag/If-None-Match 的值是一串 hash 码，代表的是一个资源的标识符，当服务端的文件变化的时候，它的 hash码会随之改变，通过请求头中的 If-None-Match 和当前文件的 hash 值进行比较，如果相等则表示命中协商缓存。ETag 又有强弱校验之分，如果 hash 码是以 "W/" 开头的一串字符串，说明此时协商缓存的校验是弱校验的，只有服务器上的文件差异（根据 ETag 计算方式来决定）达到能够触发 hash 值后缀变化的时候，才会真正地请求资源，否则返回 304 并加载浏览器缓存。

### Last-Modified/If-Modified-Since
Last-Modified为response header, If-Modified-Since 为 request header

Last-Modified/If-Modified-Since 的值代表的是文件的最后修改时间，第一次请求服务端会把资源的最后修改时间放到 Last-Modified 响应头中，第二次发起请求的时候，请求头会带上上一次响应头中的 Last-Modified 的时间，并放到 If-Modified-Since 请求头属性中，服务端根据文件最后一次修改时间和 If-Modified-Since 的值进行比较，如果相等，返回 304 ，并加载浏览器缓存。

- 如果文件的修改频率在秒级以下，Last-Modified/If-Modified-Since 会错误地返回 304
- 如果文件被修改了，但是内容没有任何变化的时候，Last-Modified/If-Modified-Since 会错误地返回 304 


## 文件位置 size
1. 资源的大小           ---- 状态 200  或者304（协商缓存)
2. from disk cache      ----- 状态码200
3. from memory cache    ----- 可执行文件，已写入内存，关闭窗口，缓存失效
4. from ServiceWorker  ----- 表示此资源是取自 from ServiceWorker


## 刷新机制
1. 浏览器输入地址,会使用强缓存与协商缓存  是最快的
2. 点击刷新，chrome使用强缓存与协商缓存，firefox跳过强缓存，只使用协商缓存，不同浏览器实现不一样
3. hard reload, 删除本地缓存，全部请求新的服务器数据 



## 缓存为坑位

### 单页应用微信缓存问题

微信浏览器在未明确配置缓存策略时，使用的是强缓存策略，导致入口文件不更新，html的meta 缓存策略也是失效的

[单页应用微信缓存博文](https://cloud.tencent.com/developer/article/1353428)
```nginx
# 单页应用 入口文件 禁止缓存
location / {
    root   /mnt/dat1/test/tes-app;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
    #### kill cache
    add_header Last-Modified $date_gmt;
    add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
    if_modified_since off;
    expires off;
    etag off;
}

location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js)$ {
    root   /mnt/dat1/test/tes-app;
    access_log off;
    expires 30d;
}
```



[博文来源](https://juejin.im/post/5eb7f811f265da7bbc7cc5bd#comment)