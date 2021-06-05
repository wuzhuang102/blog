(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{338:function(a,t,_){"use strict";_.r(t);var v=_(28),s=Object(v.a)({},(function(){var a=this,t=a.$createElement,_=a._self._c||t;return _("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[_("h1",{attrs:{id:"前端性能优化-雅虎军规"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#前端性能优化-雅虎军规"}},[a._v("#")]),a._v(" 前端性能优化 --- 雅虎军规")]),a._v(" "),_("p",[_("img",{attrs:{src:"/front-end/special/yahoo.jpg",alt:""}})]),a._v(" "),_("h2",{attrs:{id:"页面内容"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#页面内容"}},[a._v("#")]),a._v(" 页面内容")]),a._v(" "),_("h3",{attrs:{id:"_1-减少http请求数"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-减少http请求数"}},[a._v("#")]),a._v(" 1. 减少HTTP请求数")]),a._v(" "),_("p",[a._v("Web 前端 80% 的响应时间花在图片、样式、脚本等资源下载上。最直接的方式是减少页面所需资源或者请求的数量")]),a._v(" "),_("ul",[_("li",[_("strong",[a._v("文件合并")]),a._v("：合并JS/CSS文件")]),a._v(" "),_("li",[_("strong",[a._v("CSS Sprite")]),a._v("：多图片合成单一图片")]),a._v(" "),_("li",[_("strong",[a._v("行内图片")]),a._v("(Base64编码)：使用Data URI scheme 将图片嵌入HTML或者CSS中，或者直接将CSS、JS、图片内嵌HTML中。但也可能产生浏览器兼容问题")])]),a._v(" "),_("h3",{attrs:{id:"_2-减少dns查询"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-减少dns查询"}},[a._v("#")]),a._v(" 2. 减少DNS查询")]),a._v(" "),_("p",[a._v("一次DNS耗费的时间为20-120ms，基于性能考虑，ISP、局域网、操作系统、浏览器都会有相应的DNS缓存机制")]),a._v(" "),_("p",[a._v("减少不同的主机名可减少DNS查找，减少不同主机名的数量同时也减少了页面能够并行下载的组件数量")]),a._v(" "),_("p",[a._v("为了减少DNS查询时间并同时保证页面并行下载的数量，原则上是把组件分散在"),_("strong",[a._v("2到4个")]),a._v("主机下")]),a._v(" "),_("h3",{attrs:{id:"_3-避免重定向"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-避免重定向"}},[a._v("#")]),a._v(" 3. 避免重定向")]),a._v(" "),_("p",[a._v("重定向会拖慢用户体验，在用户和HTML文档之间插入重定向会延迟页面上所有东西，页面无法渲染，组件无法开始下载，直到HTML被送到浏览器")]),a._v(" "),_("ul",[_("li",[a._v("有一种常见的重定向：就是URL尾部缺少一个斜线的时候，"),_("code",[a._v("http://astrology.yahoo.com/astrology")]),a._v(" 将被301重定向到 "),_("code",[a._v("http://astrology.yahoo.com/astrology/")])]),a._v(" "),_("li",[a._v("重定向最常见的用途是把旧站点连接到新的站点\n"),_("ul",[_("li",[a._v("如果是因为域名变化而使用了重定向，就可以创建一条CNAME（创建一个指向另一个域名的DNS记录作为别名）结合Alias或者mod_rewrite指令。")])])])]),a._v(" "),_("h3",{attrs:{id:"_4-缓存ajax请求"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-缓存ajax请求"}},[a._v("#")]),a._v(" 4. 缓存Ajax请求")]),a._v(" "),_("p",[a._v("如有尚未过期的Expires 或者 Cache-control HTTP 头，那么之前的资源就可以从缓存中读取")]),a._v(" "),_("p",[a._v("可以通过给资源的Ajax URL里添加一个表明用户资源最后修改时间的时间戳来实现")]),a._v(" "),_("h3",{attrs:{id:"_5-延迟加载"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_5-延迟加载"}},[a._v("#")]),a._v(" 5. 延迟加载")]),a._v(" "),_("p",[a._v("页面在初始加载事非必须的资源都可以使用延迟加载技术")]),a._v(" "),_("ul",[_("li",[a._v("非首屏使用的数据、样式、脚本、图片等")]),a._v(" "),_("li",[a._v("用户交互时才会显示的内容")])]),a._v(" "),_("h3",{attrs:{id:"_6-预加载"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_6-预加载"}},[a._v("#")]),a._v(" 6. 预加载")]),a._v(" "),_("p",[a._v("预加载利用浏览器空闲时间请求将要使用的资源，以便用户访问下一页面时更快的响应")]),a._v(" "),_("ul",[_("li",[_("strong",[a._v("无条件预加载")]),a._v("：页面完成加载（onLoad）后，立马获取其他资源")]),a._v(" "),_("li",[_("strong",[a._v("有条件预先加载")]),a._v("：根据用户行为预判用户去向，预加载相关资源")]),a._v(" "),_("li",[_("strong",[a._v("有预谋预加载")]),a._v("：页面即将上线新版本前预先加载缓存新版内容")])]),a._v(" "),_("h3",{attrs:{id:"_7-减少dom元素数量"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_7-减少dom元素数量"}},[a._v("#")]),a._v(" 7. 减少DOM元素数量")]),a._v(" "),_("p",[a._v("复杂的页面不仅要下载更多的字节，DOM操作时也会更慢")]),a._v(" "),_("ul",[_("li",[a._v("尽量减少表格布局\n"),_("ul",[_("li",[a._v("更多的标签，增加文件大小")]),a._v(" "),_("li",[a._v("不易维护，无法响应式")]),a._v(" "),_("li",[a._v("默认表格布局算法会产生大量重绘")])])]),a._v(" "),_("li",[a._v("更多的 "),_("code",[a._v("div")]),a._v(" 仅是为了处理布局问题？也许有更好、更语义化的标记。")]),a._v(" "),_("li",[a._v("能用伪类元素的功能，就没必要添加额外元素")])]),a._v(" "),_("div",{staticClass:"language-js extra-class"},[_("pre",{pre:!0,attrs:{class:"language-js"}},[_("code",[_("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 查看页面DOM数量")]),a._v("\ndocument"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),_("span",{pre:!0,attrs:{class:"token function"}},[a._v("getElementsByTagName")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),_("span",{pre:!0,attrs:{class:"token string"}},[a._v("'*'")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("length"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),_("h3",{attrs:{id:"_8-划分内容到不同域名"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_8-划分内容到不同域名"}},[a._v("#")]),a._v(" 8. 划分内容到不同域名")]),a._v(" "),_("p",[a._v("浏览器会限制每个域的并行线程（一般6个，甚至更少），使用不同的域名可以最大化下载线程，注意保持在2-4个，避免DNS查询消耗")]),a._v(" "),_("p",[a._v("不同域名还能减少Cookie传输，从而减少文件传输大小")]),a._v(" "),_("h3",{attrs:{id:"_9-尽量减少iframe的使用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_9-尽量减少iframe的使用"}},[a._v("#")]),a._v(" 9. 尽量减少iframe的使用")]),a._v(" "),_("ul",[_("li",[a._v("iframe的优点\n"),_("ul",[_("li",[a._v("用来加载较慢的第三方资源，如广告、徽章")]),a._v(" "),_("li",[a._v("可以做安全沙箱")]),a._v(" "),_("li",[a._v("可以并行下载脚本")])])]),a._v(" "),_("li",[a._v("iframe的缺点\n"),_("ul",[_("li",[a._v("加载昂贵，即使是空页面")]),a._v(" "),_("li",[a._v("阻塞页面onLoad事件触发（safari、Chrome中动态设置iframe可避免这个问题）")]),a._v(" "),_("li",[a._v("缺乏语义")])])])]),a._v(" "),_("h3",{attrs:{id:"_10-避免404错误"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_10-避免404错误"}},[a._v("#")]),a._v(" 10. 避免404错误")]),a._v(" "),_("p",[a._v("HTTP请求很昂贵。一些404页面有利于提高用户体验，但还是浪费服务器资源")]),a._v(" "),_("p",[a._v("尤其是糟糕的外部脚本返回404，不仅阻塞其他资源下载，浏览器还会把404页面当作JavaScript解析，消耗更多资源")]),a._v(" "),_("h2",{attrs:{id:"服务器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#服务器"}},[a._v("#")]),a._v(" 服务器")]),a._v(" "),_("h3",{attrs:{id:"_1-使用cdn"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-使用cdn"}},[a._v("#")]),a._v(" 1. 使用CDN")]),a._v(" "),_("p",[a._v("用户与服务器的物理距离对响应时间也有影响，把内容部署在多个地理位置分散的服务器上能让用户更快地载入页面")]),a._v(" "),_("p",[a._v("网站80-90%响应时间消耗在资源下载上，减少资源下载时间是性能优化的黄金法则。相比分布式架构的复杂和巨大投入，静态内容分发网络（CDN）可以以较低的投入，获得加载速度有效提升")]),a._v(" "),_("p",[a._v("内容分发网络（CDN）是一组分散在不同地理位置的web服务器，用来给用户更高效地发送内容。典型地，选择用来发送内容的服务器是基于网络距离的衡量标准的。")]),a._v(" "),_("h3",{attrs:{id:"_2-添加expires或cache-control响应头（强制缓存）"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-添加expires或cache-control响应头（强制缓存）"}},[a._v("#")]),a._v(" 2. 添加Expires或Cache-Control响应头（强制缓存）")]),a._v(" "),_("ul",[_("li",[a._v("静态内容：设置Expires响应头为将来很远的时间，实现一种“永不过期”的策略")]),a._v(" "),_("li",[a._v("动态内容：设置Cache-Control ，让浏览器有条件的发起请求")])]),a._v(" "),_("h3",{attrs:{id:"_3-启用gzip"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-启用gzip"}},[a._v("#")]),a._v(" 3. 启用Gzip")]),a._v(" "),_("p",[a._v("Gzip压缩通常可以减少70%的响应大小，对某些文件更可能高达90%，比Deflate更高效，并且主流浏览器都支持")]),a._v(" "),_("p",[a._v("图片和pdf文件不需要使用Gzip，它们本身已经压缩过了，使用只会浪费CPU资源")]),a._v(" "),_("h3",{attrs:{id:"_4-配置etag（协商缓存）"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-配置etag（协商缓存）"}},[a._v("#")]),a._v(" 4. 配置Etag（协商缓存）")]),a._v(" "),_("p",[a._v("一个ETag是一个字符串，作为一个组件某一具体版本的唯一标识符")]),a._v(" "),_("div",{staticClass:"language-sh extra-class"},[_("pre",{pre:!0,attrs:{class:"language-sh"}},[_("code",[_("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# response header")]),a._v("\nHTTP/1.1 "),_("span",{pre:!0,attrs:{class:"token number"}},[a._v("200")]),a._v(" OK\n    Etag: "),_("span",{pre:!0,attrs:{class:"token string"}},[a._v('"10c24bc-4ab-457e1c1f"')]),a._v("\n\n"),_("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# request header")]),a._v("\nGET /i/yahoo.gif HTTP/1.1\n    If-None-Match: "),_("span",{pre:!0,attrs:{class:"token string"}},[a._v('"10c24bc-4ab-457e1c1f"')]),a._v("\n")])])]),_("h3",{attrs:{id:"_5-尽早输出缓冲"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_5-尽早输出缓冲"}},[a._v("#")]),a._v(" 5. 尽早输出缓冲")]),a._v(" "),_("p",[a._v("用户请求页面时，服务器通常需要花费200 ~ 500毫秒来组合 HTML 页面。在此期间，浏览器处于空闲、等待数据状态")]),a._v(" "),_("p",[a._v("较理想的清空缓冲区的位置是HEAD后面，因为HTML的HEAD部分通常更容易生成，并且允许引入任何CSS和JavaScript文件，这样就可以让浏览器在后台还在处理的时候就开始并行获取组件。")]),a._v(" "),_("h3",{attrs:{id:"_6-ajax请求使用get方法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_6-ajax请求使用get方法"}},[a._v("#")]),a._v(" 6. Ajax请求使用GET方法")]),a._v(" "),_("p",[a._v("浏览器执行XMLHttpRequest POST请求时分成两步，先发送Http Header，再发送data，而GET只使用一个TCP数据包发送数据")]),a._v(" "),_("p",[a._v("根据HTTP规范，GET用于获取数据，POST则用于向服务器发送数据，所以Ajax请求数据时使用GET更符合规范。")]),a._v(" "),_("h3",{attrs:{id:"_7-避免图片src为空"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_7-避免图片src为空"}},[a._v("#")]),a._v(" 7. 避免图片src为空")]),a._v(" "),_("p",[a._v("src属性为空字符串时，但浏览器仍然会向服务器发送一个HTTP请求")]),a._v(" "),_("ul",[_("li",[a._v("给服务器造成额外的流量负担")]),a._v(" "),_("li",[a._v("浪费服务器计算资源")]),a._v(" "),_("li",[a._v("可能会报错")])]),a._v(" "),_("p",[a._v("空href可能也会存在这种问题")]),a._v(" "),_("h2",{attrs:{id:"cookie"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#cookie"}},[a._v("#")]),a._v(" Cookie")]),a._v(" "),_("h3",{attrs:{id:"_1-减少cookie大小"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-减少cookie大小"}},[a._v("#")]),a._v(" 1. 减少Cookie大小")]),a._v(" "),_("p",[a._v("Cookie用于身份验证、个性化设置等诸多用途。Cookie通过Http头在服务器和浏览器间来回传送，减少Cookie大小可以降低其对响应速度的影响")]),a._v(" "),_("ul",[_("li",[a._v("去除不必要的Cookie")]),a._v(" "),_("li",[a._v("尽量压缩Cookie大小")]),a._v(" "),_("li",[a._v("设置Cookie的domain，如无必要，不要影响 sub-domain")]),a._v(" "),_("li",[a._v("设置合适的过期时间")])]),a._v(" "),_("h3",{attrs:{id:"_2-静态资源使用无cookie域名"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-静态资源使用无cookie域名"}},[a._v("#")]),a._v(" 2. 静态资源使用无Cookie域名")]),a._v(" "),_("p",[a._v("静态资源一般无需使用Cookie，可以把它们放在使用二级域名或者专门域名的无Cookie服务器上，降低Cookie传送的造成的流量浪费，提高响应速度。")]),a._v(" "),_("h2",{attrs:{id:"css"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#css"}},[a._v("#")]),a._v(" CSS")]),a._v(" "),_("h3",{attrs:{id:"_1-样式表放在-head-中"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-样式表放在-head-中"}},[a._v("#")]),a._v(" 1. 样式表放在"),_("code",[a._v("<head>")]),a._v("中")]),a._v(" "),_("p",[a._v("把样式表放在"),_("code",[a._v("<head>")]),a._v("中可以让页面渐进渲染，尽早呈现视觉反馈，给用户加载速度很快的感觉")]),a._v(" "),_("h3",{attrs:{id:"_2-不要使用css表达式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-不要使用css表达式"}},[a._v("#")]),a._v(" 2. 不要使用CSS表达式")]),a._v(" "),_("p",[a._v("CSS表达式只在 IE5-IE7支持，并且会超出预期的频繁执行，页面滚动、鼠标移动时都会不断执行，带来很大的性能损耗")]),a._v(" "),_("h3",{attrs:{id:"_3-使用-link-代替-import"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-使用-link-代替-import"}},[a._v("#")]),a._v(" 3. 使用 "),_("code",[a._v("<link>")]),a._v("代替"),_("code",[a._v("@import")])]),a._v(" "),_("h3",{attrs:{id:"_4-不要使用filter"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-不要使用filter"}},[a._v("#")]),a._v(" 4. 不要使用filter")]),a._v(" "),_("p",[a._v("这里说的不是 CSS3 的 Filter，是IE5.5 - IE8 专有的")]),a._v(" "),_("h2",{attrs:{id:"javascript"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#javascript"}},[a._v("#")]),a._v(" JavaScript")]),a._v(" "),_("h3",{attrs:{id:"_1-脚本放在页面底部"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-脚本放在页面底部"}},[a._v("#")]),a._v(" 1. 脚本放在页面底部")]),a._v(" "),_("p",[a._v("浏览器下载脚本时，会阻塞其他资源并行下载")]),a._v(" "),_("p",[a._v("一些特殊场景无法将脚本放到页面底部的，可考虑 script 的属性")]),a._v(" "),_("ul",[_("li",[a._v("defer属性：defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前执行。")]),a._v(" "),_("li",[a._v("H5的 async属性：script脚本异步的加载并在允许的情况下执行，谁先加载完谁先执行")])]),a._v(" "),_("h3",{attrs:{id:"_2-使用外部-javascript-和-css"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-使用外部-javascript-和-css"}},[a._v("#")]),a._v(" 2. 使用外部 JavaScript 和 CSS")]),a._v(" "),_("p",[a._v("外部JavaScript和CSS文件可以被浏览器缓存，在不同页面间重用，也能降低页面大小。")]),a._v(" "),_("h3",{attrs:{id:"_3-压缩-javascript-和-css"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-压缩-javascript-和-css"}},[a._v("#")]),a._v(" 3. 压缩 JavaScript 和 CSS")]),a._v(" "),_("p",[a._v("压缩代码可以移除非功能性的字符（注释、空格、空行等），减少文件大小，提高载入速度。可以在webpack等打包工具中进行")]),a._v(" "),_("h3",{attrs:{id:"_4-移除重复脚本"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-移除重复脚本"}},[a._v("#")]),a._v(" 4. 移除重复脚本")]),a._v(" "),_("p",[a._v("重复的脚本不仅产生不必要的HTTP请求，而且重复解析执行浪费时间和计算资源")]),a._v(" "),_("h3",{attrs:{id:"_5-减少dom操作"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_5-减少dom操作"}},[a._v("#")]),a._v(" 5. 减少DOM操作")]),a._v(" "),_("p",[a._v("JavaScript 操作 DOM 很慢，尤其是 DOM 节点很多时")]),a._v(" "),_("ul",[_("li",[a._v("缓存已经访问过的元素")]),a._v(" "),_("li",[a._v("使用 DocumentFragment 暂存 DOM，整理好以后再插入 DOM 树")]),a._v(" "),_("li",[a._v("操作 className， 而不是多次读写 style，")]),a._v(" "),_("li",[a._v("避免使用 JavaScript 修复布局")])]),a._v(" "),_("h3",{attrs:{id:"_6-使用高效的事件处理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_6-使用高效的事件处理"}},[a._v("#")]),a._v(" 6. 使用高效的事件处理")]),a._v(" "),_("ul",[_("li",[a._v("减少绑定事件监听的节点，如通过事件委托")]),a._v(" "),_("li",[a._v("尽早处理事件，DOMContentLoaded即可进行，不用等到load以后")]),a._v(" "),_("li",[a._v("不要在Spirite的图像中间留有较大空隙。减少空隙虽然不太影响文件大小，但可以降低用户代理把图片解压为像素图的内存消耗，对移动设备更友好。")])]),a._v(" "),_("h2",{attrs:{id:"图片"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#图片"}},[a._v("#")]),a._v(" 图片")]),a._v(" "),_("h3",{attrs:{id:"_1-优化图片"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-优化图片"}},[a._v("#")]),a._v(" 1. 优化图片")]),a._v(" "),_("p",[a._v("尝试把GIF格式转换成PNG格式，看看是否节省空间")]),a._v(" "),_("h3",{attrs:{id:"_2-优化-css-sprite"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-优化-css-sprite"}},[a._v("#")]),a._v(" 2. 优化 CSS Sprite")]),a._v(" "),_("ul",[_("li",[a._v("水平排列 Sprite 中的图片，垂直会增加图片大小")]),a._v(" "),_("li",[a._v("Sprite 中把颜色较近的组合在一起可以降低颜色数，理想状况是低于256色以适用PNG8格式")]),a._v(" "),_("li",[a._v("不要在Spirite的图像中间留有较大空隙。减少空隙虽然不太影响文件大小，但可以降低用户代理把图片解压为像素图的内存消耗，对移动设备更友好。")])]),a._v(" "),_("h3",{attrs:{id:"_3-不要在html中缩放图片"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-不要在html中缩放图片"}},[a._v("#")]),a._v(" 3. 不要在HTML中缩放图片")]),a._v(" "),_("p",[a._v("图片多大，就应请求多大的图片")]),a._v(" "),_("p",[a._v("设定图片的宽高，以免浏览器按默认的宽高给图片保留区域，和实际的宽高产生差异，产生重绘")]),a._v(" "),_("h3",{attrs:{id:"_4-适用体积小、可缓存的favicon-ico"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-适用体积小、可缓存的favicon-ico"}},[a._v("#")]),a._v(" 4. 适用体积小、可缓存的favicon.ico")]),a._v(" "),_("p",[a._v("favicon.ico一般存放在网站根目录下，无论是否在页面中设置，浏览器都会尝试请求这个文件。")]),a._v(" "),_("ul",[_("li",[a._v("避免404")]),a._v(" "),_("li",[a._v("尽量小，最好小于1k")]),a._v(" "),_("li",[a._v("设置较长的过期时间")])]),a._v(" "),_("h2",{attrs:{id:"移动端"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#移动端"}},[a._v("#")]),a._v(" 移动端")]),a._v(" "),_("h3",{attrs:{id:"_1-保证所有组件小于25k"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-保证所有组件小于25k"}},[a._v("#")]),a._v(" 1. 保证所有组件小于25K")]),a._v(" "),_("p",[a._v("这个限制是因为iPhone不能缓存大于25K的组件，注意这里指的是未压缩的大小。这就是为什么缩减内容本身也很重要，因为单纯的gzip可能不够。")]),a._v(" "),_("h3",{attrs:{id:"_2-打包内容为分段（multipart）内容"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-打包内容为分段（multipart）内容"}},[a._v("#")]),a._v(" 2. 打包内容为分段（multipart）内容")]),a._v(" "),_("p",[a._v("把各个组件打包成一个像有附件的电子邮件一样的复合文档里，可以用一个HTTP请求获取多个组件")]),a._v(" "),_("p",[a._v("用这种方式的时候，要先检查用户代理是否支持（iPhone就不支持）")]),a._v(" "),_("h2",{attrs:{id:"总结"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),_("p",[a._v("性能优化主要从以下三个方面入手")]),a._v(" "),_("ul",[_("li",[a._v("资源本身大小的压缩优化（想办法减少资源的体积）")]),a._v(" "),_("li",[a._v("网络请求的全过程（从url地址栏输入发送请求开始到返回响应包的每个环节）")]),a._v(" "),_("li",[a._v("浏览器渲染的全过程（拿到资源后浏览器渲染的每个环节）")])]),a._v(" "),_("p",[_("a",{attrs:{href:"https://juejin.im/post/5b73ef38f265da281e048e51#heading-41",target:"_blank",rel:"noopener noreferrer"}},[a._v("博文参考"),_("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=s.exports}}]);