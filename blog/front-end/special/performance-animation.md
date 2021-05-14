# 前端性能优化 --- 高性能动画

## 实现动画几种方式
1. Jquery animation , setTimeout
2. animation , transition , transform
3. JavaScript + Canvas/WebGL/SVG
4. requestAnimationFrame
5. GPU acceleration

## 浏览器渲染
- 渲染的三个阶段： Layout , Paint , Composite Layers
- 修改不同 CSS 属性会触发不同阶段 [https://csstriggers.com/](https://csstriggers.com/)
- 三个阶段越靠前，渲染代价越高

## GPU硬件加速
浏览器接收到页面文档后，会将文档中的标记语言解析为DOM树。DOM树和CSS结合后形成浏览器构建页面的渲染树。渲染树中包含了大量的渲染元素，每一个渲染元素会被分到一个图层中，每个图层又会被加载到GPU形成渲染纹理，而图层在GPU中transform 是不会触发 repaint 的，最终这些使用 transform 的图层都会由独立的合成器进程进行处理。
### 1. 独立复合图层
1. 3D 或者 CSS transform
2. \<video\> 和 \<canvas\> 标签
3. CSS filters
4. 元素覆盖时，比如使用了 z-index 属性

*独立复合图层中的元素一些属性改动后，不会引起整个页面的重排和重绘，从而提升性能*
### 2. 强制GPU渲染时机
1. transform
2. opacity
3. filter

3D 和 2D transform 的区别就在于，浏览器在页面渲染前为3D动画创建独立的复合图层，而在运行期间为2D动画创建。**2D transform 会在开始和结束时各发生一次 repaint**
### 3. GPU加速的问题
GPU加速不要滥用
1. 越多的GPU加速会占用更多的内存，一定要牢记不要让页面的每个元素都使用硬件加速。
2. 使用GPU渲染会影响字体的抗锯齿效果。这是因为GPU和CPU具有不同的渲染机制。即使最终硬件加速停止了，文本还是会在动画期间显示得很模糊。

## 优化 DOM Layout
尽量读写分离，减少 layout 次数
``` js
// 触发两次 layout
var newWidth = aDiv.offsetWidth + 10;   // Read
aDiv.style.width = newWidth + 'px';     // Write
var newHeight = aDiv.offsetHeight + 10; // Read
aDiv.style.height = newHeight + 'px';   // Write

// -------------- 优化一下  ---------

// 只触发一次 layout
var newWidth = aDiv.offsetWidth + 10;   // Read
var newHeight = aDiv.offsetHeight + 10; // Read
aDiv.style.width = newWidth + 'px';     // Write
aDiv.style.height = newHeight + 'px';   // Write


// 还可以使用 requestAnimationFrame
var newWidth = aDiv.offsetWidth + 10;   // Read
window.requestAnimationFrame(() => {
    aDiv.style.width = newWidth + 'px';     // Write
})
var newHeight = aDiv.offsetHeight + 10; // Read
window.requestAnimationFrame(() => {
    aDiv.style.height = newHeight + 'px';   // Write
})
```