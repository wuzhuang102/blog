# HTTP 头
[MDN HTTP Header](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)

## 通用头
通用首部字段是指请求报文和响应报文双方都会使用的
### Cache-Control
见[Cache-Control](/front-end/http/cache.html#cache-control)
### Connection
- Connection头具备的两个作用
    - 控制不再转发给代理的首部字段
    - 管理持久连接
    ``` 
    Connection: close | Keep-Alive
    ```
HTTP/1.1 版本HTTP默认都是持久连接的。
HTTP/1.1 之前的HTTP默认都是非持久连接，如果想持续连接，需要指定Connection字段值为 Keep-Alive。
### Date
表示创建HTTP报文的日期和时间
### Pragma
Pragma 是 HTTP/1.1 之前版本的历史遗留字段，仅作为与HTTP/1.0 的向后兼容而定义的
[Pragma](/front-end/http/cache.html#pragma)
### Trailer
Trailer会事先说明在报文主体记录了哪些首部字段，该首部字段可应用在HTTP/1.1 版本分块传输编码时。
### Transfer-Encoding
规定传输报文主体时采用的编码方式。HTTP/1.1 的传输编码方式仅对分块传输编码有效。
```
Transfer-Encoding: chunked
```
### Upgrade
Upgrade用于检测HTTP协议及其他协议可否使用更高的版本进行通信，其参数值可以用来指定一个完全不同的通信协议。
```
Upgrade : TLS/1.0
Connection: Upgrade
```
Upgrade 首部字段产生作用的 Upgrade 对象仅限于客户端和邻接服务 器之间。因此，使用首部字段 Upgrade 时，还需要额外指定 Connection:Upgrade。
### Via
使用Via是为了追踪客户端与服务器之间的请求和响应报文的传输路径。

以下一个cdn的via头，协议名称（默认HTTP）｜协议版本号｜公共代理及端口号｜内部代理名称或别名
```
via: 1.1 f21642bbc2373b9b5d45ec5808228da0.cloudfront.net (CloudFront) 
```
### Warning
该首部通常会告知用户一些与缓存相关的问题的警告


## 请求头
请求头是从客户端往服务端发送请求报文所使用的字段，用于补充请求的附加信息、客户端信息、对响应内容相关的优先级信息
### Accept
该首部可通知服务器，用户代理能够处理的媒体类型及媒体类型的优先级,q用来指定权重。
```
Accept: Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0
```
### Accept-Charset
该首部字段用来通知服务器用户代理能够支持的字符集及字符集的相对优先顺序。q指定权重
``` 
Accept-Charset: iso-8859-5, unicode-1-1;q=0.8
```
### Accept-Encoding
该首部字段用来告知服务器用户代理能够支持的内容编码及内容编码的优先顺序。
```
Accept-Encoding: gzip, deflate
```
### Accept-Language
用来告知服务器用户代理能够处理的自然语言集及优先级。q表示优先级
```
Accept-Language: zh-cn,zh;q=0.7,en-us,en;q=0.3
```
### Authorization
存放用户代理的认证信息
### Expect
客户端使用首部字段 Expect 来告知服务器，期望出现的某种特定行为
### From
首部字段 From 用来告知服务器使用用户代理的用户的电子邮件地址
### Host
**Host 首部字段在 HTTP/1.1 规范内是唯一一个必须被包含在请 求内的首部字段。**
该字段会告诉服务器，请求的资源所处的互联网主机名和端口号。
### If-Match
形如 If-xxx 这种样式的请求首部字段，都可称为条件请求。服务器接 收到附带条件的请求后，只有判断指定条件为真时，才会执行请求。

还可以使用星号(*)指定 If-Match 的字段值。针对这种情况，服务 器将会忽略 ETag 的值，只要资源存在就处理请求。

### If-Modified-Since
[协商缓存 If-Modified-Since](/front-end/http/cache.html#last-modified-if-modified-since)
### If-None-Match
[协商缓存 If-None-Match](/front-end/http/cache.html#etag-if-none-match)
### Referer
告诉服务器请求的原始资源URI
### User-Agent
该头表示浏览器的种类及版本

## 响应头
### ETag
首部字段 ETag 能告知客户端实体标识。它是一种可将资源以字符串 形式做唯一性标识的方式。
#### 强 ETag 值
不论实体发生多么细微的变化都会改变其值
#### 弱 ETag 值
弱 ETag 值只用于提示资源是否相同。只有资源发生了根本改变，产生差异时才会改变 ETag 值，这时，会在字段值最开始处附加 W/。
### Location
引导至某个与请求URI位置不同的资源，一般搭配状态码 3xx 使用，提供的是重定向URI。
### Retry-After
告知客户端应该在多久之后在此发起请求。
### Server
告诉客户端当前服务器安装的HTTP服务器应用程序的信息。
```
Server: Apache/2.2.6 (Unix) PHP/5.2.5
```
### WWW-Authenticate
用于HTTP访问认证，该头必须被包含在401（未授权）响应消息中。

## 实体头
### Allow
用于通知客户端能够支持Request-URI指定资源的所有方法，如果以不支持的方法请求会返回 405 Method Not Allowed
### Content-Encoding
首部字段 Content-Encoding 会告知客户端服务器对实体的主体部分选 用的内容编码方式。
``` 
Content-Encoding: gzip
```
### Content-Language
告知客户端，实体主体使用的自然语言
### Content-Length
表示实体主体大小 <br>
对实体主体进行内容编码传输时，不能再使用Content-Length
### Content-Type
首部字段 Content-Type 说明了实体主体内对象的媒体类型。
### Expires
过期时间，具体缓存策略参见[http 缓存](/front-end/http/cache.html#强存缓)
### Last-Modified
最后修改时间，配合缓存使用。具体缓存策略参见[http 缓存](/front-end/http/cache.html#强存缓)
