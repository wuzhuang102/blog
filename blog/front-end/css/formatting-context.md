# CSS --- BFC、IFC、GFC、FFC

Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

## BFC
BFC 是一个独立的运行布局环境，其中的元素布局不受外界的影响。

### BFC布局规则
- 内部Box会在垂直方向，一个接一个地放置
- Box 垂直方向地距离由 margin 决定。属于同一个 BFC 地两个相邻地 Box 地margin会发生重叠
- 每个盒子的margin box 的左边，与包含的块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC 的区域不会与 float box 重叠
    ``` html
    <style>
        body {
            width: 300px;
            position: relative;
        }
        .aside {
            width: 100px;
            height: 150px;
            float: left;
            background-color: #f66;
        }
        .main {
            height: 200px;
            background-color: #fcc;
            /* overflow: hidden; */
        }
    </style>
    <body>
        <div class="aside"></div>
        <div class="main"></div>
    </body>
    ```
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
- 计算BFC高度时，浮动元素也参加计算
### BFC的创建
- float 的值不是none
- position 的值不是 static 或者 relative
- display 的值是 inline-block、table-cell、flex、table-caption 或者 inline-flex
- overflow 的值不是 visible

## IFC
IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC的Line box高度由其包含行内元素中最高的实际高度计算而来，不受竖直方向的 padding/margin 影响

## GFC

## FFC