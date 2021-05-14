# 面试题总结

## 1. 移动端常见兼容问题

1. ios overflow:scroll 不流畅的问题
    ```css
    -webkit-overflow-scrolling: touch;
    // auto：滑动到的位置停止
    // touch：滑动到的位置还会继续滑动
    ```
2. 移动端 300ms 点击事件延迟
    - 可使用 `fastClick` 解决：原理是第一次 touch 时，js 模拟一个对应位置的点击事件
3. [1px 像素问题](/interview/html-css.html#_6-移动端-1px-解决方案)
4. ios 系统弹起软键盘时，固定定位失效

## 2. Vue 和 React 有什么区别

-   相同点
    1. 核心功能都在 UI 管理层
    2. 都使用了 Virtual Dom，提高重新绘制的性能
    3. 都是基于组件化的思想
-   不同点
    1. 数据流：Vue 是双向数据绑定，React 提倡单项数据流
    2. Virtual Dom：
        - Vue 的虚拟 Dom 不需要渲染整个组件树
        - React 状态改变时，整个子组件都会重新渲染，但可以通过 PureComponent/shouldComponentUpdate 来控制
    3. 组件化的模板不一样
    4. 监听数据变化的原理不一样
