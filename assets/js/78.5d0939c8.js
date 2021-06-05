(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{328:function(v,_,t){"use strict";t.r(_);var l=t(28),i=Object(l.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"前端原理-浏览器专题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前端原理-浏览器专题"}},[v._v("#")]),v._v(" 前端原理 --- 浏览器专题")]),v._v(" "),t("h2",{attrs:{id:"_1-浏览器中的进程与线程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-浏览器中的进程与线程"}},[v._v("#")]),v._v(" 1. 浏览器中的进程与线程")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("浏览器中的进程")]),v._v(" "),t("ol",[t("li",[t("strong",[v._v("浏览器主进程")]),v._v("：负责浏览器地址栏、书签栏、前进后退等")]),v._v(" "),t("li",[t("strong",[v._v("渲染进程")]),v._v("：一个 tab 内关于网页呈现的所有事情")]),v._v(" "),t("li",[t("strong",[v._v("GPU 进程")]),v._v("：GPU 相关任务")]),v._v(" "),t("li",[t("strong",[v._v("网络进程")]),v._v("：负责浏览器底层的一些不可见操作，网络请求、文件获取等")]),v._v(" "),t("li",[t("strong",[v._v("其它插件进程")]),v._v("：flash 等插件")])])]),v._v(" "),t("li",[t("p",[v._v("浏览器的渲染进程中拥有的线程")]),v._v(" "),t("ol",[t("li",[t("strong",[v._v("GUI 渲染线程")]),v._v(" "),t("ul",[t("li",[v._v("负责页面渲染，解析 HTML、CSS、DOM、Render Tree、Layout、Painting")]),v._v(" "),t("li",[v._v("Repaint、Reflow 时也触发")]),v._v(" "),t("li",[v._v("GUI 线程与 JS 线程是互斥的，JS 引擎线程优先级高于 GUI 线程")])])]),v._v(" "),t("li",[t("strong",[v._v("JS 引擎线程")]),v._v(" "),t("ul",[t("li",[v._v("负责处理和解析 JS 脚本")]),v._v(" "),t("li",[v._v("JS 引擎一直等待任务队列中的任务，render 进程中永远只会有一个 JS 线程在运行")]),v._v(" "),t("li",[v._v("注意：GUI 线程与 JS 引擎线程是互斥的，JS 执行时间长，页面就会渲染不连贯、卡顿")])])]),v._v(" "),t("li",[t("strong",[v._v("事件触发线程")]),v._v(" "),t("ul",[t("li",[v._v("归属于浏览器而不是 JS 引擎")])])]),v._v(" "),t("li",[t("strong",[v._v("定时器线程")]),v._v(" "),t("ul",[t("li",[t("code",[v._v("settInterval")]),v._v(" "),t("code",[v._v("setTimeout")]),v._v("所在的线程")]),v._v(" "),t("li",[v._v("浏览器计数不是由 JS 引擎完成的（如果是单线程的 JS 来完成，那么会卡死的）")])])]),v._v(" "),t("li",[t("strong",[v._v("异步 HTTP 线程")]),v._v(" "),t("ul",[t("li",[v._v("XMLHttpRequest 在连接后通过浏览器开启一个线程请求")]),v._v(" "),t("li",[v._v("状态变更时，如果有回调函数，一步线程就会产生状态变更事件，将这个回调放入事件队列中，由 JS 引擎执行")])])])])])]),v._v(" "),t("h2",{attrs:{id:"_2-浏览器解析-html-的过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-浏览器解析-html-的过程"}},[v._v("#")]),v._v(" 2. 浏览器解析 HTML 的过程")]),v._v(" "),t("ol",[t("li",[v._v("构建 DOM 树")]),v._v(" "),t("li",[v._v("样式计算，构建 CSSOM")]),v._v(" "),t("li",[v._v("布局\n"),t("ul",[t("li",[v._v("可见元素创建布局树 LayoutTree")])])]),v._v(" "),t("li",[v._v("分层\n"),t("ul",[t("li",[v._v("拥有层叠上下文、需要裁减的地方都会创建一个单独的图层")])])]),v._v(" "),t("li",[v._v("图层绘制")]),v._v(" "),t("li",[v._v("合成线程分块\n"),t("ul",[t("li",[v._v("合成线程将图层分为图块")])])]),v._v(" "),t("li",[v._v("栅格化\n"),t("ul",[t("li",[v._v("将合成线程中形成的图块转换为位图")]),v._v(" "),t("li",[v._v("栅格化过程会使用 GPU 加速生成，生成的位图也保存在GPU中")])])]),v._v(" "),t("li",[v._v("合成显示\n"),t("ul",[t("li",[v._v("所有图块栅格化完成，合成线程就会把内容提交给浏览器中的一个 viz 组件，它会将这些内容绘制到内存中，最后将内存显示在屏幕上")])])])]),v._v(" "),t("h2",{attrs:{id:"_3-javascript-事件流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-javascript-事件流"}},[v._v("#")]),v._v(" 3. "),t("a",{attrs:{href:"https://juejin.cn/post/6844903450493321223",target:"_blank",rel:"noopener noreferrer"}},[v._v("JavaScript 事件流"),t("OutboundLink")],1)]),v._v(" "),t("p",[v._v("web端 DOM 事件")]),v._v(" "),t("ol",[t("li",[v._v("DOM0级事件，绑定在 html 上，比如 onclick，只能绑定一个处理程序")]),v._v(" "),t("li",[v._v("DOM2级事件，通过 "),t("code",[v._v("addEventListener")]),v._v("、"),t("code",[v._v("removeEventListener")]),v._v("，可以注册多个，顺序执行，捕获事件、冒泡事件")]),v._v(" "),t("li",[v._v("DOM3事件，UI事件、焦点事件等")])])])}),[],!1,null,null,null);_.default=i.exports}}]);