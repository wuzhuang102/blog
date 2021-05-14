# HTML --- meta
HTML \<meta\> 元素表示那些不能由其它HTML元相关元素 (\<base\>, \<link\>, \<script\>, \<style\> 或 \<title\>) 之一表示的任何元数据信息。

- `name` 属性，meta属性提供的是文档级别的元数据，应用于整个页面
- `http-equiv` 属性，meta元素是编译指令，提供的信息与类似命名的HTTP头部相同
- `charset`属性，meta元素是一个字符集说明，告诉文档使用哪种字符编码
- `itemprop`属性，meta元素提供用户定义的元数据


## 1. 属性

::: warning 注意
全局属性 name 在 `<meta>` 元素中具有特殊的语义；另外， 在同一个 `<meta>` 标签中，name, http-equiv 或者 charset 三者中任何一个属性存在时，itemprop 属性不能被使用。
:::

### 1.1 charset
声明文档的字符编码，其值必须是与ASCII大小写无关（ASCII case-insensitive）的"`utf-8`"。

### 1.2 content
此属性包含http-equiv 或name 属性的值，具体取决于所使用的值


### 1.3 http-equiv
这个属性的值都是特定HTTP头的名称
- `content-security-policy` <br>
    定义当前页面内容策略，主要指允许的服务器源和脚本端点，有助于防止跨站点脚本攻击

- `content-type` <br>
    值只能是`text/html;charset=utff-8`，注意：该属性只能用于MIME type为 text/html 的文档，不能用于MIME类型为XML的文档。

- `x-ua-compatible`
    - 必须在（除 title 以及其他 meta 标签）之前
    - `content` 必须有值，可以为
        - `IE=edge`,以最新的IE引擎来渲染
        - `IE=edge,chrome=1`，chrome 激活 Chrome Frame
        - `IE=8`,不论版本是8、9、还是10，甚至更高，都以8来兼容显示

- `refresh`
    - 如果`content`为一个正整数，则是重载页面的时间间隔（秒）
    - 如果`content`是一个正整数和一个字符串`;url=****`,则是重定向到合法指定页面的间隔时间

- `content-security-policy`(CSP 内容安全策略)
    - `upgrade-insecure-requests`：页面中http请求都转换成https请求，适用于大量旧站http请求改造，[upgrade-insecure-requests](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/upgrade-insecure-requests)

- `cache-control`、`Pragma`、`Expires`
    - 兼容性不好，往往不会生效

### 1.4 name
`name`和`content`可以一起使用，`name`作为元数据的名称，`content`作为元数据的值

- `application-name`，定义正在运行在网页上的网络应用名称
    - title 标签也可以定义名称，但也可以定义其他信息
- `author`，文档作者名称
- `description`，其中包含页面内容的简短和精确的描述。 一些浏览器，如Firefox和Opera，将其用作书签页面的默认描述。
- `generator`，生成页面的软件标识符
- `keywords`，包含与逗号分隔的页面内容相关的单词
- `referrer`，控制所有从该文档发出的HTTP请求中HTTP头`Referer`的内容
    - `no-referrer`：不发送 HTTP Referer 头
    - `origin`：发送当前文档 origin
    - `no-referrer-when-downgrade`： 当请求是安全的(https -> https)，则发送origin 作为 referrer,当不安全时(https -> http)则不发送referrer，这是默认行为
    - `origin-when-crossorigin`：同源请求下发送完整的URL(不含查询参数),非同源下仅发送origin
    - `unsafe-URL`：同源请求下，发送完整URL(不含查询参数)
    ::: warning 注意：
    动态地插入\<meta name="referrer"\> (通过 document.write 或者 appendChild) 是不起作用的。同样注意如果同时有多个彼此冲突的策略被定义，那么 no-referrer 策略会生效。
    :::

- `viewport` 有关视口初始大小的提示，仅供移动端使用

| Content       | Value                     | desc                                        |
|:--------------|:--------------------------|:--------------------------------------------|
| width         | 正整数 或者 device-width  | 以像素为单位，定义viewport的宽度            |
| height        | 正整数 或者 device-height | 以像素为单位，定义viewport的高度            |
| initial-scale | 0.0 ~ 10.0                | 定义设备的宽度与视口大小之间的缩放比率      |
| maximum-scale | 0.0 ~ 10.0                | 定义缩放的最大值，必须大于等于minimum-scale |
| minimum-scale | 0.0 ~ 10.0                | 定义缩放的最小值 ,必须小于等于maximum-scale |
| user-scalable | yes 或 no                 | 默认为yes,为no时用户不能缩放网页            |


## 不同浏览器规范

``` html
<!-- 优先使用 IE 最新版本和 Chrome -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

<!-- 搜索引擎抓取 -->
<meta name="robots" content="index,follow"/>

<!-- 为移动设备添加 viewport -->
<meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">

<!-- 添加智能 App 广告条 Smart App Banner（iOS 6+ Safari） -->
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">

<!-- 设置苹果工具栏颜色 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black"/>

<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit">

<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- 不让百度转码 -->
<meta http-equiv="Cache-Control" content="no-siteapp" />

<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">

<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">

<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">

<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">

<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">

<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">

<!-- UC应用模式 -->
<meta name="browsermode" content="application">

<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">

<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">

<!-- 设置页面不缓存 -->
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
```



[MDN meta](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)