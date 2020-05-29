## Cookie
Cookie大小限制4kb，它由一个名称（Name）、一个值（Value）和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成



## Cookie的设置

1. 客户端发送HTTP请求到服务器
2. 服务器接收到HTTP请求时，在响应头添加一个set-cookie字段
3. 浏览器接收到响应后保存Cookie
4. 之后对该服务器的请求都会通过Cookie头发送Cookie信息给服务器


## Cookie属性

### Name

### Value

### Domain
Domain 指定了Cookie可以发送的主机名，

- 假如没有指定，默认值为当前文档响应服务器的主机名；
    - 设置的时候没有指定Domain,删除的时候也不能指定Domain
- Domain 设置问题
    - 在二级域名下
        - 不能设置三级域名Cookie
        - 二级域名Cookie可以私有（不指定Domain）
    - 三级域名下
        - 三级域名能给自己以及二级域名下设置Cookie，无法给其他三级域名设置Cookie


### Path
Path 指定了一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部

### Expires
用于设置过期时间
``` http
Set-Cookie: token=7sd7as7das7d; Expires=Wed, 21 Oct 2020 10:10:10 GMT
```
- 当Expires缺省时，表示的是会话性Cookie,浏览器关闭时失效
- 设置日期时，是持久性Cookie，信息会保存在硬盘上，直至过期，这里的日期只与客户端有关，与服务端无关

### Max-Age
Cookie有效时间，单位是秒
``` http
Set-Cookie: token=assdsda; Max-Age: 1000
```
- Max-Age 可以为正数、负数以及0
    - 正数：持久性Cookie
    - 0: 会立即删除这个Cookie
    - 负数：会话性Cookie
- Max-Age 优先性大于 Expires

### Secure
标记为Secure的Cookie只会在Https协议加密通过后才会发送给服务器

### HTTPOnly
防止客户端修改Cookie，只能从http请求中修改（服务器修改），防XSS攻击

### SameSite

SameSite属性可以让Cookie在跨站请求时不发送，可以阻止跨站请求伪造攻击(CSRF)

#### 属性值 
1. Strict： 仅允许一方携带Cookie，只发送相同站点请求的Cookie，即当前网页URL与请求URL完全一致
2. Lax： 允许部分第三方请求携带Cookie
3. Mone： 无论是否跨站都会发送Cookie

之前默认None,Chrome 80 之后是Lax

#### 跨域与跨站

1. 跨站的判断：只要两个URL的 eTLD+1相同即可，反之则是跨站，不考虑协议和端口号，
    - eTLD 表示有效顶级域名（.com, .co.uk,  .github.io等）
    - www.a.taobao.com 和 www.b.taobao.com 是同站，a.github.io 和 b.github.io 是跨站
2. 跨域测判断：协议、主机名、端口相同，反之为跨域

#### 注意
1. HTTP不支持SameSite=none

如果想添加SameSite=none属性，那个必须同时设置Secure，只有Https协议下该Cookie才会被发送

2. 需要 UA 检测，部分浏览器不能加 SameSite=none

IOS 12 的 Safari 以及老版本的一些 Chrome 会把 SameSite=none 识别成 SameSite=Strict，所以服务端必须在下发 Set-Cookie 响应头时进行 User-Agent 检测，对这些浏览器不下发 SameSite=none 属性

#### 解决

解决方案就是设置 SameSite 为 none。




[博文参考 浏览器系列之 Cookie 和 SameSite 属性](https://github.com/mqyqingfeng/Blog/issues/157)