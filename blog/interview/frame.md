# 框架专题

## 1. Vue 问题汇总

### 1.1 虚拟 DOM

-   什么是 Virtual DOM
    -   本质上，虚拟 DOM 是一个 JavaScript 对象，通过对象的方式来表示 DOM 结构，将页面的状态抽象为 JS 对象的形式，配合不同的渲染工具，使跨平台渲染成为可能。
    -   通过事物处理机制，将多次 DOM 修改的结果一次性的更新到页面上，从而**有效的减少页面渲染的次数，减少修改 DOM 的重绘重排次数，提高渲染性能**。
-   为什么使用 Virtual DOM
    -   保证性能下限，在不进行手动优化的情况下，提供过得去的性能
    -   跨平台
        -   虚拟 DOM 本质上是 JS 对象，可以很方便的跨平台操作，比如服务器渲染、uniapp 等
-   Virtual DOM 的问题
    -   首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，会比 innnerHTML 插入慢

### 1.2 Vue Dom Diff 算法

1. 算法复杂度
    - 两棵树的完全 Dom diff 时间复杂度度在 O(n^3)，但是 Vue 它只进行同层级的 Dom diff，只有 O(n)
2. diff 算法的两个特点
    - 只会同级比较，不跨层级
    - diff 比较循环两边往中间靠拢
3. [比较过程](/front-end/javascript/source-code/vue.html#_5-patch-js)
    - 新旧 Vnode 进行开始位置和结束位置的标记
        ```js
        let oldStartIdx = 0;
        let newStartIdx = 0;
        let oldEndIdx = oldCh.length - 1;
        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIdx];
        let newEndIdx = newCh.length - 1;
        let newStartVnode = newCh[0];
        let newEndVnode = newCh[newEndIdx];
        ```
    - 循环处理节点
        1. 如果当前 oldStartVnode 和 newStartVnode 节点相同，会复用老节点，进行 patchVnode，更新 oldStartVnode、newStartVnode，odlStartIndex++、newStartIndex++
        2. 如果当前 oldEndVnode 和 newEndVnode 节点相同，直接复用老节点，进行 patchVnode，更新 oldEndVnode、newEndVnode，oldEndIndex--、newEndIndex--
        3. 如果当前 oldStartVnode 和 newEndVnode 节点相同，直接复用老节点，进行 patchVnode，将老节点移动到 odlEndVnode 之后，更新 oldStartVnode、newEndVnode，oldStartIndex++、newEndIndex--
        4. 如果当前 oldEndVnode 和 newStartVnode 节点相同，直接复用老节点，进行 patchVnode，将老节点移动到 oldStartVnode 之前，更新 oldEndVnode、newStartVnode，oldEndIndex--，newStartIndex++
        5. 如果都不满足相同则没有相同节点复用，进行 key 对比(老节点依据 key 生成一个字典)。满足的进行 patchVnode，就将对应的节点移动到 oldStartVnode 之前，更新 newStartVnode，newStartIndex++
        6. 循环结束，oldStartIdx > oldEndIdx 的话就清除剩下的老节点， newStartIdx > newEndIdx 的话就直接插入对应的位置

<img class="zoom-img" src="/interview/vue-dom-diff.png">

### 1.3 双向数据绑定/v-model

```js
Object.defineProperty();
```

### 1.4 数组监听

Vue 通过原型拦截的方式重写了数组的 7 个方法，首先获取到这个数组的 ob （它的 Observer 对象），如果有新值，就调用 observeArray 对新的值进行监听，然后手动调用 notify，通知 render watcher，执行 update

```js
// https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
const methodsToPatch = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"];

methodsToPatch.forEach(function (method) {
    const original = arrayProto[method];
    def(arrayMethods, method, function mutator(...args) {
        // ..
        ob.dep.notify();
        return result;
    });
});
```

### 1.5 computed、methods 区别

-   computed 是响应式的， methods 不是
-   computed 定义的成员像属性一样访问，methods 定义的成员必须以函数的方式访问
-   computed 带缓存的
-   computed 可以只定义一个函数作为只读属性，也可以定义 get/set 变成读写属性
-   computed 不支持异步

### 1.6 nextTick 原理

由于 Vue 的更新是异步执行的，并且缓存在同一事件循环中，等同一数据循环中的所有数据变化完成后，再统一进行视图更新

核心利用了 Promise、MutationObserver、setImmediate、setTimeout 模拟宏/微任务

### 1.7 keep-alive 原理

本质就是 LRU 算法

1. 获取 keep-alive 下第一个子组件的实例对象，然后获取这个组件的组件名
2. 通过组件名去匹配 include、exclude，判断是否需要缓存，不需要缓存就直接返回当前组件的实例 vNode
3. 需要缓存则更新缓存中对应组件的 LRU 位置，超出长度就删除最远距离的哪个组件

### 1.8 [依赖收集](/front-end/javascript/source-code/vue.html#依赖收集过程)

### 1.9 父子组件，非父子组件通信方式

#### 1. 父组件向子组件传值

-   Props 传值
-   \$parent 获取父组件的方法或属性

#### 2. 子组件向父组件传值

-   通过 \$emit 触发自定义事件
-   \$children 获取子组件实例
-   使用 ref 获取子组件实例

#### 3. 兄弟组件传值

#### 4. 跨组件

-   $attrs、$listeners
-   project、inject
-   vuex

## 2. Vue3 相关

### 2.1 Vue3 新特性

#### 2.1.1 Composition API

组合 API、为了实现基于函数式编程的机制而生

1. **声明变量**
    - 通过 reactive 声明变量
2. **生命周期的变更**
    ```js
    import { onMounted } from "vue";
    export default {
        setup() {
            onMounted(() => {
                console.log("component is mounted!");
            });
        },
    };
    ```

#### 2.1.2 performance 优化

1. **编译模板的静态标记**：重构了虚拟 DOM，保持兼容性，使 DOM 脱离模板渲染，Dom Diff 时提升性能

    ```html
    <div id="app">
        <p>周一呢</p>
        <p>明天就周二了</p>
        <div>{{week}}</div>
    </div>
    ```

    - vue2 编译结果

    ```js
    function render() {
        with (this) {
            return _c(
                "div",
                {
                    attrs: {
                        id: "app",
                    },
                },
                [_c("p", [_v("周一呢")]), _c("p", [_v("明天就周二了")]), _c("div", [_v(_s(week))])]
            );
        }
    }
    ```

    - vue3 编译结果，只有 `_createVNode` 的四个参数不为空时，才会遍历

    ```js
    import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue";

    export function render(_ctx, _cache) {
        return (
            _openBlock(),
            _createBlock("div", { id: "app" }, [_createVNode("p", null, "周一呢"), _createVNode("p", null, "明天就周二了"), _createVNode("div", null, _toDisplayString(_ctx.week), 1 /* TEXT */)])
        );
    }
    ```

2. **事件侦听器缓存**
   默认条件下事件是动态追踪的，Vue3 中将事件缓存在缓存中

3. **静态提升**
   静态节点放在了 render 函数的外部，避免每次 render 都会生成一次静态节点

#### 2.1.3 Tree-shaking

打包时自动去除了没有用到的 Vue 模块

#### 2.1.4 更好的 ts 支持

-   类型定义提示
-   tsx 语法
-   class 组件

#### 2.1.5 全家桶

vite 的绑定

### 2.2 Vue2 与 Vue3 响应式对比

-   Vue2：Object.defineProperty
-   Vue3：Proxy、Reflect

1. Object.defineProperty 只能劫持对象属性，Proxy 代理整个对象
2. Object.defineProperty 对新增对象需要手动 Observe (vm.\$set())
3. Proxy 最大问题是兼容，而且 polyfill 也无法抹平

## 3. Vuex 原理

<img src="/interview/vuex.png" class="zoom-img">

### 3.1 Vuex 工作流程

1. Vue Components 中会 触发（dispatch）一些事件或动作，也就是 Actions。
2. Acions 中一般是异步操作，操作结果提交（commit）至 Mutations 中，Vuex 中的数据更新操作集中在 Mutations 中。
3. Mutations 接受到就去改变 State 中的值。
4. 当 State 中的数据改变之后，对应的 View 就会被更新。

### 3.2 几个重要的概念

1. Vue Components
2. Actions
3. dispatch
4. Mutations
5. commit
6. state
7. getters

### 3.3 为什么使用 Vuex/Redux

传参对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力，父子组件直接引用或者通过事件来变更状态的模式会变得非常脆弱，且代码不好维护。

将组件需要共享的状态抽取出来，以一个全局单例模式管理，这种模式下的组件树构成了一个巨大的视图，不管在树的哪个位置，任何组件都能获取状态或者触发行为。

### 3.4 Vuex 与 Redux 的区别

1. Vuex 中使用 Mutation 代替了 Redux 中的 Reducer（通过 switch 改变 state 中的值）
2. Vuex 由于 Vue 自动重新渲染的特性，只要生成新的 state 就可以

## 4. Webpack 执行流程

webpack 是基于事件流的，通过一系列的插件来运行，利用 tapable 库提供各种钩子来实现对于整个构建流程各个步骤的控制

1. 创建 Compiler 实例，用于控制构建流程，compiler 实例包含 webpack 基本环境信息
2. 根据配置项转换成对应内部插件，并初始化 options 配置项
3. 执行 compiler.run
4. 创建 Compilation 实例，每次构建都会创建一个 Compilation 实例，包含这次构建的基本信息
5. 从 entry 开始递归分析依赖，对每个依赖模块进行 buildModule，通过 Loader 将不同类型的模块转换成 Webpack 模块
6. 调用 Parser.parse 将上面的结果转换成 AST 树
7. 遍历 AST 树，收集依赖 Dependency，并保存在 Compilation 实例的 dependencies 中
8. 生成 Chunks，不同 entry 生成不同 chunk，动态导入也会生成自己的 chunk，生成的 chunk 后还会进行优化
9. 使用 Template 基于 Compilation 的数据生成结果代码

## 5. Webpack 做过哪些优化

-   **优化构建速度**
    -   多线程构建：`thread-loader`
    -   缩小打包作用域
        -   exclude/include
        -   resolve.extensions(文件扩展名)、resolve.modules(第三方模块路径)
        -   module.noParse：这些文件不解析，但是也会打包进去
        -   IgnorePlugin
    -   缓存
        -   `babel-loader`：开启缓存
        -   `terser-webpack-plugin`：开启缓存(webpack5 已内置)
    -   DLL
        -   DllPlugin 进行分包，使用 DllreferencePlgin 对 mainfest.json 引用， 对基本不变的资源限行打包成静态资源，避免反复编译浪费时间。
-   **优化 Webpack 打包体积**

    -   代码压缩
        -   `uglifyjs-webpack-plugin`：压缩 js
        -   `mini-css-extract-plugin`：提取 chunk 中的 css 到单独文件
        -   `optimize-css-assets-webpack-plugin`：开启 cssnano 压缩 css
    -   提取页面公共资源
        -   `html-webpack-externals-plugin`：基础包通过 CDN 引入，不打入 bundle
        -   `split-chunks-plugin`：公共资源分离公用(webpack4 以上内置)
    -   tree-shaking
        -   `purgecss-webpack-plugin`：去除无用 css，建议配合 `mini-css-extract-plugin` 配合使用
        -   webpack 已内置 tree-shaking，基于 ES6 的
    -   Scope Hoisting
        -   `webpack.optimize.ModuleConcatenationPlugin()`：闭包合并优化
    -   图片压缩
        -   `image-webpack-loader`：图片压缩
    -   动态 Polyfill
        -   polyfill-service 只返回给用户需要的 polyfill
        -   `@babel/preset-env`：通过 `useBuiltlns:'usage'`参数动态加载 polyfill

-   **打包结果分析**
    -   `speed-measure-webpack-plugin`：分析打包过程中 Loader 和 Plugin 的耗时，找出构建过程的性能瓶颈

```

```
