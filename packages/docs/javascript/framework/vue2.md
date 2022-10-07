# 源码篇 --- Vue2 源码解析

本文相关源码的注释 --- [Vue2.x 源码注释](https://github.com/wuzhuang102/blog/tree/source-code/vue-dev/)

## 1. Vue 源码整体流程

## 2. Vue 模块详解

### 1. observer 模块

普通的 JavaScript 对象传入 Vue 实例的`data`时，Vue 将遍历对象的所有 property，并使用`Object.defineProperty`将属性全部转为`getter/setter`，这是 IE8 及以下浏览器不支持的一个属性

#### 1. observer 模块核心部分

- **[Observer](https://github.com/vuejs/vue/blob/v2.1.10/src/core/observer/index.js#L39-L53)**：数据的观察者，让数据对象的读写操作都处于监督之下
- **[Watcher](https://github.com/vuejs/vue/blob/dev/src/core/observer/watcher.js#L45-L96)**：数据的订阅者，数据的变化会通知到 Watcher 然后进行相应的操作，例如更新视图
- **[Dep](https://github.com/vuejs/vue/blob/dev/src/core/observer/dep.js#L18-L21)**：Observer 与 Watcher 的纽带，数据变化时，被 Observer 观察到，然后由 Dep 通知到 Watcher

#### 2. 依赖收集

依赖收集是通过属性的 getter 函数完成的， Observer 与 Dep 是一对一的关系， Dep 与 Watcher 是多对多的关系。依赖收集完成后，当属性变化会执行 Observer 的 dep.notify，这个方法会遍历订阅者列表向其发送消息，Watcher 执行 run 方法去更新视图（见下图）
![](/front-end/js/vue-reactive.jpg)

##### 依赖收集过程

1. 初始化状态 `initState`，期间通过 `defineReactive` 将数据变成响应式对象，其中 `getter` 部分用来收集依赖
2. 初始化至 `mounted` 过程，会实例化 `Watcher` ，就会执行 `get` 方法，调用 `pushTarget()` ，将 `Dep.target` 指向当前的 `Watcher`
3. 每个对象的 `getter` 都有一个 `dep`，`getter` 触发时也会调用 `dep.depend()`，执行`Dep.taregt.addDep(this)` --> `dep.addSubs(this)`， 将当前 `Watcher` 添加到 dep 中
   - **Watcher** 的种类
     - `render watcher`
     - `computed watcher`
     - `watch watcher`

![](/front-end/js/vue-dependency.jpg)

#### 3. 代码部分

```
src/core/observer/
├── array.js
├── dep.js
├── index.js
├── scheduler.js
├── traverse.js
└── watcher.js
```

1. **array.js**
   由于 JavaScript 的限制， Vue 不能检测数组的变化，于是作者在数组增强方法中对 Array 的 ‘push’, ‘pop’, ‘shift’, ‘unshift’, ‘splice’, ‘sort’, ‘reverse’ 方法做了增强实现，具体实现可以看源码 [`/src/core/observer/array.js`](https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js) ，这也是 Vue.js 中数组操作只能使用这几个方法的原因。
2. **dep.js**
   一个 Observer 实例对应一个 Dep 实例，这个 Dep 实例存出多个相关的 Watcher 实例，Observer 发现数据变更时，由 Dep 通知各个订阅数据的 Watcher
3. **index.js (Observer)**
   - 首先创建一个 Dep 对象实例
   - 把自身 this 添加到 value 的 \_\_ob\_\_ 属性上
   - 最后对 value 进行类型判断，如果是数组就观察数组（数组使用 array.js 重写的方法），否则观察单个元素（这是一个递归的过程）

**observeArray**对数组进行遍历，递归调用**obeserve**方法，最终调用**walk**方法，walk 方法递归调用 **defineReactive** 将属性值转化为 getter/setter

4. **scheduler.js**
5. **traverse.js**
6. **watcher.js**

### 2. instance 模块

`src/core/instance` 中的代码是代码在 new Vue 发生的一系列操作，initLifecyle、initEvents、initRender、initInjections、initState、initProvide

#### 代码部分

```
├── render-helpers/
├── events.js
├── index.js
├── init.js
├── inject.js
├── lifecycle.js
├── proxy.js
├── render.js
└── state.js
```

1. **index.js**：入口文件，Vue 函数就在这里
2. **init.js**：
   - 初始化文件，每个 new Vue 的实例都会执行 init.js 中的 \_init() 函数来初始化，下面就是 \_init()中的一段代码
   ```js
   initLifecycle(vm);
   initEvents(vm);
   initRender(vm);
   callHook(vm, 'beforeCreate');
   initInjections(vm); // resolve injections before data/props
   initState(vm);
   initProvide(vm); // resolve provide after data/props
   callHook(vm, 'created');
   ```
3. **lifecycle.js**
   - 定义实例的生命周方法：$forceUpdate、$destroy
4. **event.js**
   - 定义实例的方法：$on、$once、$off、$emit
5. **render.js**
   - render.js 中的 \_render 负责把实例渲染成虚拟 Node
6. **inject.js**
7. **state.js**

### 3. vdom 模块

#### 代码部分

```
├── create-component.js
├── create-element.js
├── create-functional-component.js
├── helpers
│   ├── extract-props.js
│   ├── get-first-component-child.js
│   ├── index.js
│   ├── is-async-placeholder.js
│   ├── merge-hook.js
│   ├── normalize-children.js
│   ├── normalize-scoped-slots.js
│   ├── resolve-async-component.js
│   └── update-listeners.js
├── modules
│   ├── directives.js
│   ├── index.js
│   └── ref.js
├── patch.js
└── vnode.js
```

##### 1. vnode.js

定义 VNode 类，和一些创建 VNode 的方法

```js
export default class VNode {
  /* ... */
}
export const createEmptyVNode = (text: string = '') => {
  /*...*/
};
export function createTextVNode(val: string | number) {
  /*...*/
}
export function cloneVNode(vnode: VNode): VNode {
  /*...*/
}
```

##### 2. create-component.js

##### 3. create-element.js

##### 4. create-functional-component.js

##### 5. patch.js

patch.js 中存放着 DOM Diff 的核心代码，主要思想就是循环判断，判断每个更新的 vnode 的修改情况

这里只是判断 vnode 修改的具体情况，修改真实 DOM 的代码在 [/platforms/\*/runtime/node-ops.js](https://github.com/wuzhuang102/blog/blob/source-code/vue-dev/src/platforms/web/runtime/node-ops.js)，实现了一些跨平台的封装

- **patch()**
  - 判断两个节点是否值得比较(`sameVnode()`)，值得比较就执行 `patchVnode()`
  - 不值得比较就用 `Vnode` 替换 `oldVnode`
  ```js
  if (isUndef(oldVnode)) {
    // oldVnode 未定义的时候，也就是 root 节点，创建一个新的节点
    isInitialPatch = true;
    createElm(vnode, insertedVnodeQueue);
  } else {
    // oldVnode 是否有 nodeType，是否是真实 element
    const isRealElement = isDef(oldVnode.nodeType);
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      // patch existing root node
      // 是同一个节点就进行 patchVnode
      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
    } else {
      // ...
      // 替代现有节点
      const oldElm = oldVnode.elm;
      const parentElm = nodeOps.parentNode(oldElm);
      createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));
      // 遍历更新组件根节点，包含 destroy 和 create 声明周期
      if (isDef(vnode.parent)) {
      }
      if (isDef(parentElm)) {
        removeVnodes([oldVnode], 0, 0);
      } else if (isDef(oldVnode.tag)) {
        invokeDestroyHook(oldVnode);
      }
    }
  }
  ```
- **sameVnode()**：sameVnode 的判断依据
  ```js
  function sameVnode(a, b) {
    return (
      a.key === b.key &&
      a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)
    );
  }
  function sameInputType(a, b) {
    if (a.tag !== 'input') return true;
    let i;
    const typeA = isDef((i = a.data)) && isDef((i = i.attrs)) && i.type;
    const typeB = isDef((i = b.data)) && isDef((i = i.attrs)) && i.type;
    return typeA === typeB;
  }
  ```
- **patchVnode()**：`sameVnode`的节点需要进行深层次的 patch
  ```js
  function patchVnode() {
    const oldCh = oldVnode.children;
    const ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      if (isDef((i = data.hook)) && isDef((i = i.update))) i(oldVnode, vnode);
    }
    // 1. 如果新 vnode 没有 text 文本时
    if (isUndef(vnode.text)) {
      // 1.1 新老 vnode 都有 children 节点时，则对子节点进行 diff，updateChildren
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        // 1.2 oldVnode 没有子节点，新的vnode有子节点，先清空文本，再添加子节点
      } else if (isDef(ch)) {
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '');
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        // 1.3 oldVnode 有子节点，新 vnode 没有子节点，清空子节点
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
        // 1.4 都没有子节点，就进行文本替换
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
      // 2. 文本替换
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    // 调用postpatch钩子
    if (isDef(data)) {
      if (isDef((i = data.hook)) && isDef((i = i.postpatch))) i(oldVnode, vnode);
    }
  }
  ```
- **updateChildren()**
  ```js
  function updateChildren() {
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
        // 四种key相同的情况，直接进行patchVnode环节，后两种情况需要移动真实 DOM 的位置
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        // 生成odlChildren的 key 与 index 对应的哈希表
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        // newStartVnode 在 odlChildren 中对应的 index
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        // 没有key 或者在 old 里面没找到这个 key 就创建新节点
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          // 获取同 index 的老节点，如果两个节点是 sameVnode 则进行 patchVnode ,同时清除老节点，插入新节点
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
            // 两个节点不一样就创建新的
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    // oldStartIdx > oldEndIdx 说明老节点已经遍历完了，新节点比老节点多，多出来的节点加入到真实 DOM 中
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      // 这时新节点遍历完了，老节点可能还没有，直接把老节点移除就行了
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }
  ```

### 4. compiler 模块

```
├── codeframe.js
├── codegen
│   ├── events.js
│   └── index.js
├── create-compiler.js
├── directives
│   ├── bind.js
│   ├── index.js
│   ├── model.js
│   └── on.js
├── error-detector.js
├── helpers.js
├── index.js
├── optimizer.js
├── parser
│   ├── entity-decoder.js
│   ├── filter-parser.js
│   ├── html-parser.js
│   ├── index.js
│   └── text-parser.js
└── to-function.js
```

#### 代码部分

##### 1. codegen/\*.js

- index.js

  ```js
  // 将AST语法树转换成 render 及 staticRenderFns 字符串
  export function generate(ast: ASTElement | void, options: CompilerOptions): CodegenResult {
    const state = new CodegenState(options);
    const code = ast ? genElement(ast, state) : '_c("div")';
    return {
      render: `with(this){return ${code}}`,
      staticRenderFns: state.staticRenderFns,
    };
  }

  // 这两个方法用来将 AST 转成 render 函数中的主体内容
  export function genElement(el: ASTElement, state: CodegenState): string {
    // static、v-once、for、if、template、slot
  }
  export function genData(el: ASTElement, state: CodegenState): string {
    // key、ref、refInFor、pre、component、attr、props、events、nativeEvents、
    // slotTarget、scopedSlots、model、inline-template、bind、on
  }
  ```

- events.js

  - 定义了兼容的 keyCodes 和 keyNames，并将 模版中的 vue 事件打包进 render 中

  ```js
  const keyCodes: { [key: string]: number | Array<number> } = {};
  const keyNames: { [key: string]: string | Array<string> } = {};
  const modifierCode: { [key: string]: string } = {};

  // 负责事件绑定操作的具体实现
  export function genHandlers(events: ASTElementHandlers, isNative: boolean): string {}
  function genHandler(handler: ASTElementHandler | Array<ASTElementHandler>): string {}
  ```

##### 2. directives/\*.js

v-bind、v-on、v-model

##### 3. parser/\*.js

- index.js

```js
export const onRE = /^@|^v-on:/; /*匹配@以及v-on，绑定事件 */
export const dirRE = /^v-|^@|^:/; /*匹配v-、@以及:*/
export const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/; /*匹配v-for中的in以及of*/
export const forIteratorRE =
  /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/; /*v-for参数中带括号的情况匹配，比如(item, index)这样的参数*/
const argRE = /:(.*)$/; /* 取参数值 */
const bindRE = /^:|^v-bind:/; /*匹配v-bind以及:*/
const modifierRE = /\.[^.]+/g; /*根据点来分开各个级别的正则，比如a.b.c.d解析后可以得到.b .c .d*/

// HTML 转 AST
export function parse(template: string, options: CompilerOptions): ASTElement | void {}
```

- filter-parser.js

```js
// 循环 exp ,解析出模版中的 expression 和 filters
export function parseFilters(exp: string): string {}
// filter 函数输出成 render 函数想要的样子
function wrapFilter(exp: string, filter: string): string {}
```

- text-parser.js

```js
// 解析匹配 {{}} 中的变量 --- defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
// {{}} 是默认的字符串模版，可在初始化时自定义
export function parseText(text: string, delimiters?: [string, string]): TextParseResult | void {}
```

// todo

## 3. Vue 组件

### 1. keep-alive

keep-alive 主要用于保持组件状态，避免组件重复创建

```js
// 更新 keep-alive 中的 cache
function pruneCache(keepAliveInstance: any, filter: Function) {}
// 清除 cache 指定 key 的 vnode
function pruneCacheEntry(cache: VNodeCache, key: string, keys: Array<string>, current?: VNode) {}

// keep-alive 组件，主要逻辑在 render 函数中
// --- 1. 使用 getFirstComponentChild 取出 keep-alive 组件下面第一个子组件
// --- 2. 白黑名单校验，看是否是会被缓存的组件
// --- 3. 子组件在 cache 中，就直接取出返回 vnode，不在 vnode中，就存入 vnode,并校验最大缓存数
export default {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes, // 缓存白名单
    exclude: patternTypes, // 缓存黑名单
    max: [String, Number], // 缓存实例上限
  },
  render() {
    const slot = this.$slots.default;
    const vnode: VNode = getFirstComponentChild(slot); // 找到第一个子组件对象
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions);
      const { include, exclude } = this;
      if ((include && (!name || !matches(include, name))) || (exclude && name && matches(exclude, name))) {
        return vnode;
      }

      const { cache, keys } = this;
      const key: ?string =
        vnode.key == null
          ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
          : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }
      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0]);
  },
};
```

## 4. Vue 工具函数

### 1. nextTick()

```js
let timerFunc;
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
    if (isIOS) setTimeout(noop);
  };
  isUsingMicroTask = true;
} else if (
  !isIE &&
  typeof MutationObserver !== 'undefined' &&
  (isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]')
) {
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true,
  });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}
```

## Vue 源码目录

- **dist**<br />
  - **esm**：es 规范，**common**：commonjs 规范，**browsers**：用于浏览器的， **其它**：UMD 规范
  - **runtime**：
  ```
  ├── dist
  │   ├── README.md
  │   ├── vue.common.dev.js
  │   ├── vue.common.js
  │   ├── vue.common.prod.js
  │   ├── vue.esm.browser.js
  │   ├── vue.esm.browser.min.js
  │   ├── vue.esm.js
  │   ├── vue.js
  │   ├── vue.min.js
  │   ├── vue.runtime.common.dev.js
  │   ├── vue.runtime.common.js
  │   ├── vue.runtime.common.prod.js
  │   ├── vue.runtime.esm.js
  │   ├── vue.runtime.js
  │   └── vue.runtime.min.js
  ```
- **src**：Vue 源代码核心目录

  ```
  src
  ├── compiler                            # 编译模版
  │   ├── codeframe.js
  │   ├── codegen
  │   ├── create-compiler.js
  │   ├── directives
  │   ├── error-detector.js
  │   ├── helpers.js
  │   ├── index.js
  │   ├── optimizer.js
  │   ├── parser
  │   └── to-function.js
  ├── core                                # 是Vue的核心
  │   ├── components                      # keep-alive
  │   ├── global-api                      # 全局api  .use  .mixin  .extend
  │   ├── instance                        # 生命周期
  │   ├── observer                        # 双向数据绑定逻辑
  │   ├── util                            #
  │   └── vdom                            # 虚拟dom构建、比较等
  ├── platforms                           # 跨平台的vue代码
  │   ├── web
  │   └── weex
  ├── server                              # 处理服务器渲染的
  │   ├── bundle-renderer
  │   ├── create-basic-renderer.js
  │   ├── create-renderer.js
  │   ├── optimizing-compiler
  │   ├── render-context.js
  │   ├── render-stream.js
  │   ├── render.js
  │   ├── template-renderer
  │   ├── util.js
  │   ├── webpack-plugin
  │   └── write.js
  ├── sfc                                 # 处理 .vue 文件
  │   └── parser.js
  └── shared                              # 提供到全局的工具函数
     ├── constants.js
     └── util.js
  ```

- **benchmarks**：Vue 用来做跑分用的，展示 Vue 在 svg、big table、uptime 时的页面性能
- **examples**：Vue 使用的 hello world
- **flow**：flow.js 是一个 js 库，作静态类型检
- **packages**：单独打出来的一些包
- **scripts**：存放可执行的脚本，用来打包项目
- **test**：测试文件目录
- **types**：一些基本的 ts 规则校验

#### 博文参考

- [Vue2.0 源码阅读：响应式原理](http://zhouweicsu.github.io/blog/2017/03/07/vue-2-0-reactivity/)
- [learnVue --- vue 全家桶源码解析](https://github.com/answershuto/learnVue)
- [Vue2.x 在线编译](https://template-explorer.vuejs.org/)
- [VirtualDOM 与 diff(Vue 实现).MarkDown](<https://github.com/answershuto/learnVue/blob/master/docs/VirtualDOM%E4%B8%8Ediff(Vue%E5%AE%9E%E7%8E%B0).MarkDown>)
