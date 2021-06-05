(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{325:function(a,t,s){"use strict";s.r(t);var r=s(28),v=Object(r.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"内存与垃圾回收"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存与垃圾回收"}},[a._v("#")]),a._v(" 内存与垃圾回收")]),a._v(" "),s("h2",{attrs:{id:"node内存与整体架构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node内存与整体架构"}},[a._v("#")]),a._v(" Node内存与整体架构")]),a._v(" "),s("h3",{attrs:{id:"内存结构分配"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存结构分配"}},[a._v("#")]),a._v(" 内存结构分配")]),a._v(" "),s("p",[a._v("V8下，"),s("strong",[a._v("64位系统下大约为1.4G，32位系统下大约为0.7G")]),a._v("。")]),a._v(" "),s("ul",[s("li",[a._v("表层原因：是为JavaScript在浏览器打造的，不太可能遇到大量使用内存的场景，所以可以申请的最大内存就没设置太大")]),a._v(" "),s("li",[a._v("深层原因：是V8垃圾回收机制的限制\n"),s("ul",[s("li",[a._v("以1.5G的堆内存为例，V8做一次小的垃圾回收需要50ms以上，做一次非增量式的垃圾回收需要1s以上。大内存分配必然导致性能的直线下降")]),a._v(" "),s("li",[a._v("但也可以打开这种限制（单位kb），需要在程序执行前设置，没办法动态设置")])]),a._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("!")]),a._v("-- 老生代 --"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\nnode --max-old-space-size"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1700")]),a._v(" app.js  \n\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("!")]),a._v("-- 新生代 --"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("  \nnode --max-new-space-size"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1200")]),a._v(" app.js\n")])])])])]),a._v(" "),s("p",[a._v("node中查看内存信息")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("$ node\n> process.memoryUsage()\n{\n  rss: 23035904,\n  heapTotal: 5484544,\n  heapUsed: 2991216,\n  external: 1509499,\n  arrayBuffers: 9395\n}\n")])])]),s("h3",{attrs:{id:"整体架构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#整体架构"}},[a._v("#")]),a._v(" 整体架构")]),a._v(" "),s("p",[a._v("Node.js主要分为四大部分，Node Standard Library，Node Bindings，V8，Libuv，\n"),s("img",{attrs:{src:"/node/node-framework.jpg",alt:"node架构"}})]),a._v(" "),s("ul",[s("li",[s("strong",[a._v("Node Standard Library")]),a._v("：node提供的标准库")]),a._v(" "),s("li",[s("strong",[a._v("Node Bindings")]),a._v("：js 和 c++ 的通讯桥梁，封装v8 和 libuv，向上提供API")]),a._v(" "),s("li",[a._v("底层：C++实现层\n"),s("ul",[s("li",[s("strong",[a._v("v8")]),a._v("： JavaScript引擎，提供JavaScript运行环境")]),a._v(" "),s("li",[s("strong",[a._v("libuv")]),a._v("：node封装库， 提供跨平台的异步IO能力；linux上使用epoll,OSX和BSD上使用kqueue,windows上使用IOCP。")]),a._v(" "),s("li",[a._v("C-ares：异步处理 DNS 的能力")]),a._v(" "),s("li",[a._v("http_parser、OpenSSL、zlib...：http解析、SSL、数据压缩等")])])])]),a._v(" "),s("h2",{attrs:{id:"v8垃圾回收策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#v8垃圾回收策略"}},[a._v("#")]),a._v(" V8垃圾回收策略")]),a._v(" "),s("h3",{attrs:{id:"_1-新生代"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-新生代"}},[a._v("#")]),a._v(" 1. 新生代")]),a._v(" "),s("p",[a._v("新生代内存分配：64位是32M，32位是16M。")]),a._v(" "),s("p",[a._v("V8的垃圾回收策略主要基于分代式垃圾回收机制。在GC的演变过程中，人们发现没有一种垃圾回收算法能够胜任所有场景。"),s("br"),a._v(" "),s("strong",[a._v("V8中内存分为新生代和老生代")]),a._v("，新生代存活时间较短（一些变量），老生代存活时间较长(window、DOM、Web API等)。"),s("br"),a._v("\n主垃圾回收器-Major GC负责老生代的垃圾回收 "),s("br"),a._v("\n副垃圾回收器-Minor Gc负责新生代的垃圾回收，基于Scavenge算法")]),a._v(" "),s("h4",{attrs:{id:"scavenge-算法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#scavenge-算法"}},[a._v("#")]),a._v(" Scavenge 算法")]),a._v(" "),s("p",[a._v("新生代采用 Scavenge 垃圾回收算法，算法实现时主要采用cheney算法。"),s("br"),a._v("\ncheney算法讲内存一分为二，叫做semispace，一块处于使用状态(from空间)，一块处于闲置状态(to空间)。")]),a._v(" "),s("p",[a._v("讲解一下scavenge流程\n"),s("img",{attrs:{src:"/node/scavenge.jpg",alt:"scavenge算法"}})]),a._v(" "),s("ol",[s("li",[a._v("from空间中声明变量 a、b，并调用了a变量。")]),a._v(" "),s("li",[a._v("GC进来判断 "),s("code",[a._v("var a; alert(a);")]),a._v(" 存在调用，会将活跃变量 a 复制进入 to 空间。")]),a._v(" "),s("li",[a._v("清空 from 空间中的全部内存，此时b被清除。")]),a._v(" "),s("li",[a._v("交换 from 和 to 空间，开始下一轮。")])]),a._v(" "),s("p",[a._v("由于Scavenge是典型的牺牲空间换取时间的算法，所以无法大规模的应用到所有的垃圾回收中。但我们可以看到，Scavenge非常适合应用在新生代中，因为新生代中对象的生命周期较短，恰恰适合这个算法。")]),a._v(" "),s("h4",{attrs:{id:"晋升"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#晋升"}},[a._v("#")]),a._v(" 晋升")]),a._v(" "),s("p",[a._v("对象从新生代移动到老生代的过程叫做晋升")]),a._v(" "),s("p",[a._v("晋升条件")]),a._v(" "),s("ol",[s("li",[a._v("如果一个对象是第二次经历from空间到to空间的复制，那么它将会被移动到老生代中。")]),a._v(" "),s("li",[a._v("一个对象从from复制到to空间时，如果to空间已经使用了25%，那这个对象将移动到老生代中。")])]),a._v(" "),s("h3",{attrs:{id:"_2-老生代"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-老生代"}},[a._v("#")]),a._v(" 2. 老生代")]),a._v(" "),s("p",[a._v("老生代内存分配：64位是1.4G，32位是0.7G。")]),a._v(" "),s("p",[a._v("老生代中的对象存活时间较长，继续使用Scavenge算法会浪费一半的内存空间。"),s("br"),a._v("\nV8老生代中主要使用 Mark-Sweep 和 Mark-Compact相结合的方式进行垃圾回收。")]),a._v(" "),s("h4",{attrs:{id:"mark-sweep-mark-compact"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mark-sweep-mark-compact"}},[a._v("#")]),a._v(" Mark-Sweep & Mark-Compact")]),a._v(" "),s("ul",[s("li",[a._v("Mark-Sweep\n"),s("ul",[s("li",[s("strong",[a._v("过程")]),a._v("： Mark-Sweep在标记阶段遍历堆内存中的所有对象，并标记活着的对象，在随后的阶段，只清除没有被标记的对象。")]),a._v(" "),s("li",[s("strong",[a._v("缺点")]),a._v("： Mark-Sweep最大的问题就是进行一次垃圾回收之后，内存空间会出现不连续的情况。这种内存碎片会对后续内存分配造成问题。")])])]),a._v(" "),s("li",[a._v("Mark-Compact\n"),s("ul",[s("li",[a._v("Mark-Compact是为了解决Mark-Sweep的内存碎片问题。")]),a._v(" "),s("li",[s("strong",[a._v("过程")]),a._v("：Mark-Compact 在标记完存活对象以后，会将标记的对象向内存空间的一端移动，移动完成之后，直接清理掉边界以外的所有内存。")])])])]),a._v(" "),s("p",[a._v("前两步是Mark-Sweep，后两步是Mark-Sweep + Mark-Compact\n"),s("img",{attrs:{src:"/node/mark-sweep&mark-compact.jpg",alt:"mark"}}),a._v("\n由于Mark-Compact需要移动对象，它的执行速度就不可能很快。在取舍上，V8主要基于Mark-Sweep，在空间不足以对新生代中晋升过来的对象进行分配时才使用Mark-Compact。")]),a._v(" "),s("h2",{attrs:{id:"垃圾回收机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收机制"}},[a._v("#")]),a._v(" 垃圾回收机制")]),a._v(" "),s("p",[a._v("Scavenge、Mark-Sweep、Mark-Compact说明了V8中的内存是如何分配和回收的，那如何判断一个对象是可以被回收的呢？")]),a._v(" "),s("h3",{attrs:{id:"_1-标记清除"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-标记清除"}},[a._v("#")]),a._v(" 1. 标记清除")]),a._v(" "),s("ol",[s("li",[a._v("垃圾收集器在运行时会给存储在内存中的所有变量都加上标记")]),a._v(" "),s("li",[a._v("然后去掉运行环境中的变量以及被运行环境变量所引用的变量的标记")]),a._v(" "),s("li",[a._v("依然被标记的变量就是需要被回收删除的变量。垃圾收集器完成内存清除工作，销毁被标记的值并回收它们所占用的内存空间")])]),a._v(" "),s("h3",{attrs:{id:"_2-引用计数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-引用计数"}},[a._v("#")]),a._v(" 2. 引用计数")]),a._v(" "),s("ul",[s("li",[a._v("当声明一个变量并将一个引用类型的值赋给该变量时，这个值的引用次数就是1")]),a._v(" "),s("li",[a._v("如果同一个值赋给另一个变量，那么该值的引用次数加1，相反，如果该值的引用变量改变了对象引用，该值的引用次数减1")]),a._v(" "),s("li",[a._v("垃圾回收器下次运行时，就会释放引用次数为0的的值所占用的内存")])]),a._v(" "),s("hr"),a._v(" "),s("p",[s("img",{attrs:{src:"/node/increment-mark.jpg",alt:"增量更新"}}),a._v("\n左上常规标记，左下增量标记，右边是并行、并发")]),a._v(" "),s("p",[a._v("主线程停下来进行GC叫全停顿(Stop-The-World)，为了解决停顿带来的卡顿。V8内部还有并行、并发、增量等垃圾回收技术")]),a._v(" "),s("h3",{attrs:{id:"_3-增量标记"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-增量标记"}},[a._v("#")]),a._v(" 3. 增量标记")]),a._v(" "),s("p",[a._v("垃圾回收器将标记工作分解为更小的块，并且穿插在主线程不同任务之间执行。")]),a._v(" "),s("h3",{attrs:{id:"_4-并行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-并行"}},[a._v("#")]),a._v(" 4. 并行")]),a._v(" "),s("p",[a._v("在执行一个完整的垃圾回收过程中，垃圾回收会使用多个辅助线程来并行执行垃圾回收。")]),a._v(" "),s("h3",{attrs:{id:"_5-并发"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-并发"}},[a._v("#")]),a._v(" 5. 并发")]),a._v(" "),s("p",[a._v("回收线程在执行JavaScript的过程中，辅助线程能够在后台完成执行垃圾回收的操作。")]),a._v(" "),s("h2",{attrs:{id:"v8三色标记法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#v8三色标记法"}},[a._v("#")]),a._v(" V8三色标记法")]),a._v(" "),s("ul",[s("li",[a._v("三色\n"),s("ul",[s("li",[a._v("黑色：表示这个节点被GC Root引用到了，而且子节点都已标记完成")]),a._v(" "),s("li",[a._v("白色：表示节点没有被访问到，如果在本轮遍历结束时还是白色，那么这块数据就会被回收")]),a._v(" "),s("li",[a._v("灰色：表示这个节点被GC Root引用到，但子节点还没被垃圾回收器标记处理")])])]),a._v(" "),s("li",[a._v("写屏障\n"),s("ul",[s("li",[s("strong",[a._v("写屏障机制会强制将被引用的白色节点变成灰色")]),a._v("。这样就保证了黑色节点不能指向白色节点的约束条件")])])])]),a._v(" "),s("p",[s("img",{attrs:{src:"/node/tricolor.jpg",alt:""}})]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\nwindow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("b "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\nwindow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("c "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// GC扫了一遍之后")]),a._v("\nwindow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("b "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),s("ol",[s("li",[a._v("声明a、a.b、a.b.c")]),a._v(" "),s("li",[a._v("GC标记一遍以后")]),a._v(" "),s("li",[a._v("执行 a.b = [],此时[]对应图中的d,GC未标记到，本应是白色，但写屏障将d直接标记为灰色，这样下次增量标记时可以直接从灰色节点开始标记。")])])])}),[],!1,null,null,null);t.default=v.exports}}]);