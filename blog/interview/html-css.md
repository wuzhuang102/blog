# HTML/CSS

## 1. CSS 选择器及其优先级

**!important > 内联样式 > id 选择器 > class 选择器 > 标签选择器**

-   选择器
    -   相邻选择器：(h1+p)
        -   兄弟选择器 (h1 ~ h3)
    -   子选择器 （div > p）
    -   后代选择器 (div p)
    -   通配符 (\*)
    -   属性选择器 (a[rel="external"])
    -   伪类选择器 (a:hover)
-   浏览器内部计算规则
    -   d 选择器数量 = A
    -   class 选择器、属性选择器和伪类的数量 = B
    -   伪元素选择器和标签选择器数量 = C
    -   忽略通用选择器（注：还有关系选择器: +,>,~,' ',||等）
-   `S = A * N^2 + B * N^1 + C`：N 是一个足够大的数

## 2. flex 相关

-   flex: 1 是哪些 css 属性的简写
    ```css
    flex-grow: 1; // 规定项目相对于其他灵活项目进行扩展的量
    flex-shrink: 1; // 规定项目收缩规则：超出 flex-basis 的部分，按此值等比收缩
    flex-basis: auto; // 弹性伸缩盒的基准值
    ```
-   flex 还有哪些相关属性
    -   flex-direction: 方向
    -   flex-wrap: 规定是否换行或者换列
    -   flex-flow: 前两个的复合属性

## 3. 居中问题

#### 3.1 水平居中

-   行内元素：text-align: center;
-   flex 布局：justify-content: center;
-   block 元素，定宽：margin: 0 auto;

#### 不知宽高的 div 居中

-   flex 布局

```html
<div class="box">
    <div class="item">我在中间</div>
</div>
<style>
    .box {
        display: flex;
        height: 200px;
        justify-content: center;
        align-items: center;
    }
    .item {
        background-color: #ccc;
    }
</style>
```

-   position + transform
    -   推荐使用，transform 是独立的层，不会引起重回重排

```html
<div class="box">
    <div class="item">我在中间</div>
</div>
<style>
    .box {
        position: relative;
        height: 200px;
    }
    .item {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ccc;
    }
</style>
```

-   position + margin

```html
<div class="box">
    <div class="item">我在中间</div>
</div>
<style>
    .box {
        position: relative;
        height: 200px;
    }
    .item {
        position: absolute;
        width: 80px;
        height: 80px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-color: #ccc;
    }
</style>
```

## 4. CSS 盒模型

-   border-box：IE 中默认的盒模型，俗称怪异盒模型
    -   总宽度 = width + margin；设置宽度时，width = border + padding + content
-   content-box：
    -   总宽度 = width + padding + border + margin；设置的宽度 width = content
-   inherit

## 5. link 与 @import

-   link 是 XHTML，@import 属于 CSS 范畴，只能加载 CSS
-   link 在页面载入时同时加载，@miport 在页面完全载入之后才会加载
-   @import 是 css2.1 之后的，低版本有兼容问题
-   link 支持 javascript 控制 DOM 去改变样式， @import 不支持

## 6. 移动端 1px 解决方案

-   问题：
    -   移动端 window 对象有个 devicePixelRatio 属性，它表示设备物理像素和 css 像素的比例，逻辑像素 1px 得到的往往比预料中的大
    -   `<meta name="viewport"` 中定义的初始缩放值都为 1，并禁止用户缩放。1px 的逻辑像素在 retina 中可能就是 2px、3px
-   解决方案

    1.  小数写 px 值

        -   缺点：安卓与 iOS8 以下不支持

        ```css
        .border {
            border: 1px solid #999;
        }
        @media screen and (-webkit-min-device-pixel-ratio: 2) {
            .border {
                border: 0.5px solid #999;
            }
        }
        @media screen and (-webkit-min-device-pixel-ratio: 3) {
            .border {
                border: 0.333333px solid #999;
            }
        }
        ```

    2.  伪元素 + scale
    3.  viewport + rem 实现

        ```js
        var viewport = document.querySelector("meta[name=viewport]");
        //下面是根据设备像素设置viewport
        if (window.devicePixelRatio == 1) {
            viewport.setAttribute("content", "width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no");
        }
        if (window.devicePixelRatio == 2) {
            viewport.setAttribute("content", "width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no");
        }
        if (window.devicePixelRatio == 3) {
            viewport.setAttribute("content", "width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no");
        }
        var docEl = document.documentElement;
        var fontsize = 10 * (docEl.clientWidth / 320) + "px";
        docEl.style.fontSize = fontsize;
        ```

    4.  box-shadow

        ```html
        <style>
            box-shadow: 0 -1px 1px -1px red, 1px 0 1px -1px red, 0 1px 1px -1px red, -1px 0 1px -1px red;
        </style>
        ```

**新项目可以使用 viewport + rem ，老项目可以使用 伪元素 + scale + less/scss 配合**

## 7. 清除浮动的方式

1. 设置父元素高度
2. clear 属性
    ```css
    .clearfix::after {
        display: block;
        clear: both;
        content: "
    }
    ```
3. 利用 BFC 特性

## 8. link 加载的 css 会阻塞页面渲染吗，JS 会阻塞加载吗

-   **link 不会阻塞 DOM 解析但是阻塞 DOM 渲染**
    -   浏览器解析生成 DOM tree 和 CSS Tree，才会生成 Render Tree，页面才会渲染
-   **\<script\>会阻塞 DOM 的解析和渲染**
    -   \<script\>标签会阻塞 DOM 解析和渲染，但在阻塞的同时，会解析文档其余部分（预解析），找出并加载可能需要通过网络加载的其它资源
    -   预解析不会修改解析出来的 DOM 树，只会解析外部资源的引用
-   **JS 的执行需要等到之前的 CSSOM 构建完成**
-   优化
    -   合理放置脚本的位置
    -   预加载 link， preload
    -   DNS Prefetch
    -   script defer/async
        -   async 脚本会在加载完毕后执行。async 脚本的加载不计入 DOMContentLoaded 事件统计
        -   遇到设置了 defer 的脚本，就会在后台进行下载，但是并不会阻止文档的渲染，当页面解析&渲染完毕后。会等到所有的 defer 脚本加载完毕并按照顺序执行，执行完毕后会触发 DOMContentLoaded 事件

## 9. 重绘、重排

-   什么是重绘、重排
    -   **重排**：当我们改变一个元素的尺寸、位置属性时，会进行样式重新计算、布局、绘制等过程
    -   **重绘**：改变颜色时
-   触发因素
    -   页面首次进入渲染
    -   页面 resize
    -   元素尺寸发生变化
    -   可见元素的增删
    -   内容发生变化
    -   字体
    -   伪类激活时
-   如何优化
    -   布局、绘制和 JS 执行都在主线程执行； 如果 JS 执行时间过长，就会导致在下一帧开始时 js 没有及时归还主线程，导致下一帧动画没有及时渲染，就会出现卡顿。
    1. **RequestAnimatoinFrame**：通过 API 回调，把 JS 任务分成更小的任务块，每一帧事件用完前暂停 js 执行归还主线程
    2. 栅格化的整个流程不占用主线程，只在合成线程和栅格线程中运行。

## 10. css3 画环形进度条

-   核心思想：左右两个半环，旋转产生视觉上上的进度条

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>图片懒加载</title>
        <style>
            .demo1-bg2-1,
            .demo1-bg2-2 {
                margin: 0;
                padding: 0;
                flex: 1;
                height: 80px;
                background: #fff;
                border: 10px solid grey;
            }
            .demo1-bg2-1 {
                border-radius: 50px 0 0 50px;
                border-color: grey transparent grey grey;
                transform-origin: 100% 50%;
                z-index: 1;
                transform: rotate(45deg);
            }
            .demo1-bg2-2 {
                border-radius: 0 50px 50px 0;
                /* border-color: grey grey grey transparent; */
                border-color: red red red transparent;
                transform-origin: 0 50%;
                z-index: 2;
                transform: rotate(0);
            }
            .demo1-bg1 {
                width: 100px;
                height: 100px;
                display: flex;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 0 10px red inset;
            }
        </style>
    </head>

    <div class="demo1-bg1">
        <div id="J_bg2_1" class="demo1-bg2-1"></div>
        <div id="J_bg2_2" class="demo1-bg2-2"></div>
    </div>
</html>
```

## 11. CSS 画矩形

1. vw, 1vw == 1% 视口

```css
width: 50%;
height: 50vw;
```

2. padding：百分比的 padding 是依据父元素计算的

```css
width: 50%;
padding-bottom: 100%;
```
