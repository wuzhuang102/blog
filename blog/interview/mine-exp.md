---
sidebar: auto
---

# 我的面试经历

此次面试历时近一个月，前半个月真的很煎熬，话都说不圆，好几个一面都挂了，晚上睡觉都在自我怀疑。<br>
后续依次拿了猫眼、商汤、美团优选、字节视频云的offer，最后对比一下拿了字节的offer

## 1. 认真面的

### 1. 英语流利说

#### 一面 - 电话 (2021-04-09)

-   var、let、const 的区别
-   Vue DomDiff 过程
-   协商缓存 以及其使用场景
-   有哪些方法创建一个异步任务
-   场景：给你 100 个用户的首屏数据，你怎么去分析
-   详细说明一下 eventloops
-   场景：实时录制实时上传的过程
-   你具体在项目中做过的优化

### 2. 任意门（Soul）

#### 1. 一面 （2021-04-12）

面试官人不错，耐心讲解

1. 说说你在 Vue 方面具体做的优化
2. 讲讲你对 keep-alive 组件的理解
3. 快慢数组的问题
    - fixedArray
    - 快慢数组的变化，hash 的实现，内存中具体是如何操作的
    - 你可以先看看 quickjs，没必要直接看 V8
    - 快慢数组复杂度都是 O(1)，哪里慢
4. Map、Object 的具体实现，Object 为什么比 Map 慢
5. SCP、SCI 策略
6. eventLoop
    - requestAnimation：不在异步队列里面
7. 你的数据是怎么存储的
8. source-map 框架的底层实现时怎样的、rrweb 的实现
9. git 想修改上次的 commit message 怎么办
10. 性能优化篇章：一些原生 api 没有提供的性能数据怎么获取
11. 生成器有什么作用

#### 2. 二面 （2021-04-16）

全是项目问题

面试官人不错，但是感觉他希望你能给他提供各种场景的技术解决方案以及优化方向，而不是对你个人技术能力的评估

1. 说说你最近有在做好玩的项目
2. 你们的数据请求鉴权怎么做的、传输层数据压缩怎么做的
3. 你有说道性能优化，一个 div 我修改他的 margin、width ，怎样才能使它实现更少的重载
4. CI、CD 的具体流程
    1. 线上 bug 需要版本回滚你们怎么做、还能优化吗、再想想
5. 你们产品路线的整体技术架构
6. 接口的签名验证是怎么做的
7. 最新有在看的新技术
    - webassembly 的使用场景
    - Docker 的使用场景

### 3. 喜马拉雅

#### 1. 一面 （2021-04-13）

还行，聊了一个小时

-   Vue
    -   双向绑定数据原理
    -   Vue Dom diff 过程
    -   Vue 的优化使用经验
    -   Vue 指令的优先级、写过自定义指令吗
    -   vue 在监听数组的时候是怎么做的
    -   Vue 传值的方式
    -   如果让你做一个全局状态管理的工具，你会怎么做
-   Array.prototype.reduce 你怎么实现
-   异步方法怎么同步执行
-   跨域你们是怎么处理的
-   H5 的实践上有哪些坑
-   webpack loader plugin，差别，执行顺序
    -   webpack css treeking 是怎么做到的
    -   你的 webpack 具体提示怎么分包的
    -   babel 的理解
-   Promise
    -   Promise 有哪些方法
    -   Promise 有哪些方法
    -   Promise.all 使用注意的地方
-   ajax/fetch 的区别
-   了解 SSR 吗，有做过同构吗
-   讲讲你对 Https、http2.0 的了解
-   websocket 了解过吗，单方面断开怎么办，全双工的方式还有其他的解决方案吗
-   websocket 大量频繁的使用数据的时候怎么处理
-   Hybrid App 有哪些了解
-   你的性能监控平台是怎么做的

### 4. 猫眼娱乐

#### 一面 （2021-04-18）

-   http1.0 和 http2.0 的区别
-   手撕 compose
-   手撕 Promise.all
-   link 标签中的 async、defer 的区别

#### 二面 （2021-04-18）

-   try...catch 能否捕获 promise 中的错误
-   webpack 的具体拆包机制怎么样,hash 值有哪些、使用场景
-   前端渲染 10 万条数据具体怎么去做
-   怎么判断链表有环、怎么判断环节点在哪
-   你们 node 层性错误监控怎么做的

#### hr 面 （2021-04-18）

-   给他们介绍公司的产品，产品功能、产品竞争力（为了后面压你工资作准备，确实给工资也抠抠搜搜）

### 5. 商汤

上海 AI 教育这边前端团队大概 5 人，node 用的少，前端异步交互很多且复杂，

#### 一面 (2021-04-19)

-   水平垂直居中
-   position 有哪些、区别
-   Vue
    -   computed、watcher 的区别
    -   vuex 状态管理、里面有什么
    -   vue 的 dom diff
-   Promise.all()有什么问题
-   为什么会有 async、await
-   JS 的原型问题
-   this 指向的一道题
-   var、let、const 的区别
-   说一下你对事件循环的理解，外加一套题
-   localstorage 有什么问题
-   你们深拷贝的问题怎么写的，实现一个
-   webpack loader 与 plugin 的区别
-   你们的前端优化是怎么做的
-   font-size: 10px 怎么实现
-   实现一个快排

#### 二面 （2021-04-21）

二面挺狠的，全程手撸代码，直接面了两小时 -\_-||

-   一个基于回调函数的 api,使用 async/await 的方式去封装 `fs.read(df, option, callback(err, bytesRead, buffer))`
    -   首先要确定输入和输出是什么，在次基础上去不断优化
-   聊 jsx 原理，vue 支持吗，浏览器认识吗，怎样能让浏览器认识呢
-   Vue 中的 key 是用来做什么的，然后举了一个具体的例子问你会用什么作为 key
-   react 了解吗，redux 呢，那你说说 Vuex 里面具体有哪些东西
-   说说你最复杂的一个页面中组件的设计吧，用代码实现一下
    -   对于这种静态不会变的数据有什么优化策略吗
    -   Vue 中 component 这个组件的实现逻辑是什么样子的，让你去做你会怎么做（v-if、Map 等）
    -   让你设计一个库去操作你的前端数据表结构，你会怎么设计，写一下你的代码
-   你希望和一群什么样人的人去共事，对未来几年的规划是什么样子的
    -   你觉得一个技术能力强的人应该是什么样的，具备什么样的素质

#### 三面 (2021-04-23)

三面主要是对个人综合实力的考察，对职位的定性

-   介绍做过的项目，然后深挖技术的技术点
    -   你提到 JS 的单线程，你能说一下线程、进程底层的一些知识吗

### 6. 美团优选

美团优选这边一直在问小程序的问题，虽然面试没有硬性要求，但是个人不是很喜欢

#### 一面 （2021-04-20）

-   小程序做过吗
-   Vue
    -   Vue2.x 和 3.0 的双向绑定原理
    -   Vue 中的 虚拟 DOM 你是怎么理解的，有了数据劫持为什么还要进行虚拟 DOM 的计算
    -   DOM Diff 算法
-   页面中捕获错误的方法、错误上报的方式，细说一下
-   你做的优化还是蛮多的，你是怎么做的，秒开率怎么算的
-   dns-prefetch 和 preconnect 的区别
-   代码题：解析一个 url 上面的参数，输出一个对象

#### 二面 (2021-04-22)

-   无限怼项目
-   为什么做 SSR、SSR 的的流程及原理、具体实现的
    -   SSR 的项目到前端，Vue 是怎么接管的
-   前端错误的捕获、数据上报、数据存储的问题
-   你具体做了哪些性能优化
    -   你们的 webpack 拆包机制具体是什么样的
-   前端的性能监控具体的参考指标、为什么用这个指标、这个指标的计算逻辑、怎么监控页面的变化、怎么确定页面中有需要的元素已经加载完成
-   source-map 的原理、rrweb 的原理
-   node 层的 BFF 层具体做了哪些事，GraphQL 是搭在哪里的，使用的时候有没有什么问题
-   算法题：数组中找出三数之和为 0

#### 三面（）

三面是一个小姐姐问工作经验的问题，主要是给她讲解自己做过什么，没问技术细节

更多是职业规划，求职意向

### 7. 字节视频云

#### 一面（2021-04-21）

一面都是基础知识

-   CSS 垂直居中、CSS 盒模型、CSS 定位、CSS 实现正方形、CSS 实现等比例矩形
-   cookie 有哪些属性
-   cookie、sessionStorage、localstorage 区别
-   setTimeout 中的函数是准时按时间执行得吗
-   JS 原型、继承问题 - 代码运行结果
    ```js
    function Person(name) {
        this.name = name;
        this.age = 18;
        this.fn = () => {
            console.log(this.name);
        };
    }

    Person.speak = function () {};
    Person.prototype.say = function () {};

    let per1 = new Person("jack"),
        per2 = new Person("rose");

    console.log(per1.fn === per2.fn);
    console.log(per1.speak === per2.speak);
    console.log(per1.say === per2.say);
    ```
-   event-loop 运行结果
    ```js
    console.log("script start");
    setTimeout(() => {
        console.log("0");
    });

    new Promise((resolve) => {
        console.log("1");
        for (let i = 0; i < 9999; i++) {
            if (i === 9998) {
                resolve();
            }
        }
        console.log("2");
    }).then(() => {
        console.log(3);
    });
    console.log("script end");
    ```
-   算法题：输入是一个四位数的数字和一个 count，四位数用来重新组合，返回其中最大的数减最小的数，count 是计算的次数

#### 二面 （2021-04-22）

-   全程怼项目，what？how？why？
-   介绍一下你以前做过的项目、使用的技术栈、项目亮点
-   错误预警中错误的具体捕捉方式、错误的分级、错误的警告通知
-   性能优化方面做了哪些
    -   webpack 具体的执行流程，以及 loader、plugin 具体在其中担任的角色
    -   你提到了 AOP，AOP 是什么 ，IOC 又是什么
    -   getBoundingClientRect() 会重排吗
-   做过小程序吗，了解他的这种运行机制吗，和这个混合 APP 的机制有什么不同
-   http1.x 与 http2.0 的区别，基于 2.0 对开发来说有什么可以改变的地方
-   算法题：给一个二叉树，返回他所有的路径
-   一道 CSS 题，显示什么颜色，为什么
    ```html
    <style>
        .class1 .class2 {
            color: red;
        }
        .class3 {
            color: blue;
        }
    </style>

    <div class="class1">
        <p class="class3 class2"></p>
    </div>
    ```

#### 三面（2021-04-23）

三面因为无效的工作方式、低质量的工作产出被怼的很惨，以至于后面的算法题都没心思写了。<br>
但是态度 ok，面试官还是给过了，一脸懵逼。

-   前两面中有哪些你觉得回答的不好的问题
-   你的错误监控的捕获是怎么做的，有调研过成熟的解决方案吗，为什么不调研？你这么做不严谨啊
-   你们的服务是怎么保证稳定运行的？崩了怎么办？你们的负责人不管吗？
-   代码题：异步调度器，最大并发 2
-   代码题：给一个数据，遍历输出真实的DOM结构

后续问了面试官为什么给过了，面试官说主要有两点：
1. 你对业务的有一定深度的理解
2. 你的态度 ok，能及时认识到自己的问题，并积极的寻找解决的方法

## 2. 练手面的

### 1. [城域医疗](https://www.zhipin.com/job_detail/4266ea7646d32a3e1nRz3dm8EVBY.html?ka=geek_chat_job_detail) (2021-04-07 16:00)

创业新公司，没什么技术积累，主要使用 uni-app 、 vue 全家桶

1. canvas 是怎么做测试的

### 2. 华为 OD

#### 一面 - 线上 （2021-04-08）

主要问了 Vue 的基础知识

-   v-show、v-if 的区别
-   key 的作用
-   页面初始化的钩子
-   computed 与 watch 的区别
-   父子组件数据通信

#### 二面 - 线上

忘了面啥了，都是基础问题以及做过的项目

#### hr面
给不了想要的工资，后续不了了之

### 3. 韩创

#### 一面 - 线上 (2021-04-09)

-   [es6 的模块语法 和 commonjs 的区别](/interview/base2.html#_5-commonjs、esmodule、amd、cmd)
-   Map 与 Object 的区别，什么时候应该用 Map
-   [Promise 中 .then 的第二参数与 .catch 有什么区别](/interview/base1.html#_12-1-promise-的第二个参数和-catch-有什么区别)
-   Vue 中组件之间传值的方法有哪些
-   状态提升了解过吗
-   Vue 中常见的生命周期钩子函数有哪些
-   为什么 Vue 组件中 data 必须是一个函数
-   Vue 中 computed 和 watch 有什么区别
-   \$nextTick 是什么
-   Vue 的双向数据绑定原理是什么
-   虚拟 DOM 做了哪些优化

#### 二面
现场面试，太远了，拒了

### 4. 平安健康

前端团队十几人，跟业务走

#### 一面 - 线上(2021-04-14)

-   说说你做过的项目，用到的技术
-   移动端多端适配怎么做的，兼容问题有哪些
-   css
    -   css 定位
    -   css 那些元素可继承，哪些不可以
    -   常用的 inline、block 元素，有什么区别
    -   inline-flex 的特性
-   Vue
    -   讲一讲 Vue 的 Dom diff
    -   v-if v-show
    -   vue 的生命周期
    -   vue3 的改变
-   js
    -   js 中数组常用的方法
    -   map、forEach 的区别
    -   for、for...in、for...of 的区别和性能
-   Vue 和 react 有哪些区别
-   最近在看什么新技术

## 3. 常问的问题

### 1. 自我介绍

-   如果按照 4 分钟自我介绍的话，时间大致可以这样分配：
    1. 个人资料：一句话，占比 5％左右
    2. 学习技能：半分钟~一分钟，占比 20％左右
    3. 项目和经历：一分钟左右，占比 45％左右
    4. 工作体会：半分钟，占比 15％左右
    5. 一句话左右：职业规划，占比 10％左右
    6. 一句话：兴趣占比，占比 5％左右

```
面试官你们好，我是吴壮，从事前端开发将近四年的时间
现在职于一家做股票投研的互联网创业公司，担任 H5 以及 混合 APP 的开发，技术栈主要是 Vue + Koa2（项目与技能）,并且深入了解过Vue的原理
除此我个人在错误监控、性能优化以及自动化构建与部署方面也有一定的研究（特长），在当前这家公司也有一定的技术沉淀
```

### 2. 你常关注的技术网站有哪些

1. [stackoverflow.com/questions](https://stackoverflow.com/questions) 技术问答网站
2. [dev.to](https://dev.to/) 博客网站，对标国内的掘金，博文都很高质量
3. [www.sitepoint.com](https://www.sitepoint.com/) 偏向移动端的技术网站
4. [www.tutorialspoint.com](https://www.tutorialspoint.com/) 工具网站，在线编码、图片压缩、JSON 序列化
5. [developers.google.com](https://developers.google.com/) 永远的神
6. [web.dev](https://web.dev/)

### 3. 最近在关注的新技术

-   flutter 2.0
-   webAssembly：在浏览器端执行其他语言代码的技术
    -   复杂运算的功能呢可以交给其他语言去做
-   Kubernetes：管理云平台中多个主机上的容器化的应用

### 4. 你的职业生涯规划是什么

我的职业生涯规划可能分两个方向：一个是技术专家方向，一个是产品方向

### 5. 项目中有什么难点

1. 项目的数据管理
    - 添加 BFF 层，管理后端数据、管理第三方数据
    - 数据的异常管理（第三方数据，不保真、需要异常监控）

### 6. 项目中做过哪些优化

1. 开发层
2. 网络传输层
3. 代码层
    1. 多接口组合 BFF 层
    2. 防抖、节流
