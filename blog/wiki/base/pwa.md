# PWA

## 1. 介绍

### 1.1 定义

运用现代的 Web API 以及传统的渐进式增强策略来创建跨平台 Web 应用程序

### 1.2 PWA 的优势

-   可访问：即使看起来像个本地应用，但本质仍是一个网站
-   渐进式：Service Workers 可以让离线工作成为可能，同时提高网站的体验，但是也要考虑不支持时网站也能稳定运行
-   响应式

### 2.3 PWA 的问题

-   兼容性不高：ios 很少部分支持，IE 不支持,chrome 还行
-   各大产商未明确支持 PWA
-   微信小程序的竞争

## 2. 关键技术

### 2.1 MainFest 实现添加至主屏幕

-   index.html

```html
<head>
    <title>Minimal PWA</title>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <link rel="manifest" href="manifest.json" />
    <link rel="stylesheet" type="text/css" href="main.css" />
    <link rel="icon" href="/e.png" type="image/png" />
</head>
```

-   mainfest.json

```json
{
    "name": "Minimal PWA", // 必填 显示的插件名称
    "short_name": "PWA Demo", // 可选  在APP launcher和新的tab页显示，如果没有设置，则使用name
    "description": "The app that helps you understand PWA", //用于描述应用
    "display": "standalone", // 定义开发人员对Web应用程序的首选显示模式。standalone模式会有单独的
    "start_url": "/", // 应用启动时的url
    "theme_color": "#313131", // 桌面图标的背景色
    "background_color": "#313131", // 为web应用程序预定义的背景颜色。在启动web应用程序和加载应用程序的内容之间创建了一个平滑的过渡。
    "icons": [
        // 桌面图标，是一个数组
        {
            "src": "icon/lowres.webp",
            "sizes": "48x48", // 以空格分隔的图片尺寸
            "type": "image/webp" // 帮助userAgent快速排除不支持的类型
        },
        {
            "src": "icon/lowres",
            "sizes": "48x48"
        },
        {
            "src": "icon/hd_hi.ico",
            "sizes": "72x72 96x96 128x128 256x256"
        },
        {
            "src": "icon/hd_hi.svg",
            "sizes": "72x72"
        }
    ]
}
```

### 2.2 Service Worker 实现离线缓存

Service Worker 像是一个服务器与浏览器之间的拦截器，能够拦截进出的 HTTP 请求，从而完全控制你的网站

-   在页面注册并安装成功后，运行于浏览器后台，不受刷新影响
-   必须是 HTTPS
-   不能操作 DOM，但可以通过事件机制处理
