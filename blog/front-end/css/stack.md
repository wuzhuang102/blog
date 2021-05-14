# CSS --- 层叠规则
[MDN Stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
## CSS的层叠上下文和层叠水平
### 层叠上下文
层叠上下文（stacking contenxt），是HTML中一个三维概念。如果一个元素含有层叠上下文，我们可以理解为这个元素在z轴上就“高人一等”
### 层叠水平
层叠水平（stacking level），决定了同一个层叠上下文中元素在z轴的显示顺序
::: tip 注意
需要注意的是，层叠水平和z-index并不是一回事
:::

## 如何产生层叠上下文
1. **天生派**：页面根元素具有层叠上下文，称为根层叠上下文
2. **正统派**：
    1. 元素 position 为 absolute 或 relative，并且z-index 不为 auto
    2. 元素 position 为 fixed 或 sticky(sticky for all mobile browsers, but not older desktop)
3. **扩招派**：一些CSS3属性
    1. 元素为 flex 布局（父元素 display:flex | inline-flex），同时 z-index 值不是 auto
    2. 元素的 opacity 值不是 1
    3. 元素的 transform 不为 none
    4. 元素的 mix-blend-mode 值不是 normal
    5. 元素的 filter 不是 none
    6. 元素的 isolation 值是 isolate
    7. 元素的 will-change 属性值为上面 2~6 的任意一个
    8. 元素的 -webkit-overflow-scrolling 设置为 touch

## 理解层叠顺序
层叠顺序（stacking order），表述元素发生层叠时有特定的垂直显示顺序
![](/css/stack-order.jpg)
1. 如果层叠上下文元素不依赖z-index数值，则其层叠顺序是z-index: auto
2. 如果层叠上下文元素依赖z-index数值，则其层叠顺序由z-index值决定

## 层叠规则与特性
### 规则
1. **谁大谁上**：当具有明显层叠水平的时候，在同一层叠上下文领域，层叠水平值大的那一个覆盖小的那一个
2. **后来居上**：当层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的覆盖前面元素
### 特性
1. 层叠上下文的层叠水平比普通元素高
2. **层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的层叠上下文**
3. 每个层叠上下文和兄弟元素独立
4. 每个层叠上下文是自成体系的，当元素发生层叠的时候，整个元素被认为是在父层叠上下文的层叠顺序中


## 一些demo
[代码地址](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context#Example)
``` html
<html>
    <div id="1"></div>
    <div id="2"></div>
    <div id="3">
        <div id="4"></div>
        <div id="5"></div>
        <div id="6"></div>
    </div>
</html>    
```
![](/css/stacking-demo-1.jpg)
1. DIV #4 is rendered under DIV #1 because DIV #1's z-index (5) is valid within the stacking context of the root element, while DIV #4's z-index (6) is valid within the stacking context of DIV #3. So, DIV #4 is under DIV #1, because DIV #4 belongs to DIV #3, which has a lower z-index value.


[博文参考](https://juejin.im/post/5b876f86518825431079ddd6#heading-8)，[博文参考](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)


