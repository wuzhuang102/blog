# 源码篇 --- Vue3 源码解析

老规矩，通过测试文件来反推 Vue3 的功能

## 写在前面

- [Vue3 在线编译器](https://vue-next-template-explorer.netlify.app/)
- 源码的相关说明都写在源码里面了，详情请戳 [vue3 源码注释](https://github.com/wuzhuang102/blog/tree/source-code/vue-next)

## 整体流程

![](/front-end/js/vue3-structure.png)

<!-- <img class="zoom-img" src="/front-end/js/vue3-structure.png" /> -->

## 目录结构

核心代码都在 `packages` 中，通过 [lerna](https://github.com/lerna/lerna) 进行多包管理

```
├── compiler-core           # 编译器 AST
├── compiler-dom            # AST ==> render 函数
├── compiler-sfc            # 解析 .vue 文件
├── compiler-ssr            # 服务器渲染处理
├── global.d.ts
├── reactivity              # 数据响应系统 proxy
├── runtime-core            # 与平台无关的运行时
├── runtime-dom             # 与端接触时的运行时
├── runtime-test
├── server-renderer
├── shared
├── size-check
├── template-explorer       # 模版在线编译代码
└── vue
```

## Reactivity

reactivity 项目目录结构

```
├── __tests__
│   ├── collections
│   ├── computed.spec.ts
│   ├── effect.spec.ts
│   ├── reactive.spec.ts
│   ├── reactiveArray.spec.ts
│   ├── readonly.spec.ts
│   ├── ref.spec.ts
│   └── shallowReactive.spec.ts
├── index.js
└── src
    ├── baseHandlers.ts
    ├── collectionHandlers.ts
    ├── computed.ts
    ├── effect.ts
    ├── index.ts
    ├── operations.ts
    ├── reactive.ts
    └── ref.ts
```

### 1. reactive.ts

相关的文件与测试文件
[reactive.ts](https://github.com/wuzhuang102/blog/blob/source-code/vue-next/packages/reactivity/src/reactive.ts)
[reactive.spec.ts](https://github.com/wuzhuang102/blog/blob/source-code/vue-next/packages/reactivity/__tests__/reactive.spec.ts)

本库的核心方法，传递一个 object 类型的原始数据，通过 Proxy，返回一个代理数据。在这过程中，劫持了原始数据的任何读写操作。进而实现改变代理数据时，能触发依赖其的监听函数 effect。

### 2. effect.ts

相关的文件与测试文件
[effect.ts](https://github.com/wuzhuang102/blog/blob/source-code/vue-next/packages/reactivity/src/effect.ts)
[effect.spec.ts](https://github.com/wuzhuang102/blog/blob/source-code/vue-next/packages/reactivity/__tests__/effect.spec.ts)

effect：接受一个函数，返回一个新的监听函数 reactiveEffect 。若监听函数内部依赖了 reactive 数据，当这些数据变更时会触发监听函数。

- **绑定阶段**
  - effect 函数会包含传入的方法变成一个 effect 对象，并在绑定阶段的最后执行一遍传入的方法（初始化）
- **收集阶段**
  - effect 传入的方法内部，有 reactive 对象参与计算，将触发 get 操作，会执行 `track` 方法
  - track 方法的重点是将 reactive 对象改变的 target 与绑定阶段的 effect 对象一一对应起来，这两个阶段是同步执行的（activeReactiveEffectStack 协调），值会存在全局的 targetMap
- **触发阶段**
  - 当 reactive 对象 set 时，会触发 `trigger` 方法，它会从 targetMap 拿到 target 对应的 effects，并遍历执行

```ts
// 收集依赖：存储在 targetMap 中（订阅）
function track(target: object, type: OperationTypes, key?: unknown) {}

// reactive 对象 set 时，触发 trigger（发布）,然后执行 effect 中的 fn
function trigger(target: object, type: OperationTypes, key?: unknown, extraInfo?: DebuggerEventExtraInfo) {}

function run(effect: ReactiveEffect, fn: Function, args: unknown[]): unknown {
  if (!effect.active) {
    return fn(...args)
  }
  if (!effectStack.includes(effect)) {
    //effectStack中没有包含effect时，才走这一步
    cleanup(effect) //处理监听函数中可能有逻辑判断，导致有的数据不需要获取，所以可以避免每次更新
    /**
     * 执行effect --> 把effect放入到栈中 -->
     * 执行fn，触发get --> 触发track -->
     * 触发effectStack[effectStack.length-1]，收集依赖 -->
     * 添加dep（[effect]）到effect.deps --> 执行完fn，effectStack出栈
     */
    try {
      effectStack.push(effect)
      return fn(...args)
    } finally {
      effectStack.pop()
    }
  }
}
```

```js
// 一些数据的数据结构
// targetMap -> target -> depsMap { key1 -> dep : [ effect1, effect2, ... ] } }
proxy
targetMap
{
    {a:1} :{
        a:[effect()]
    }
}

effect==>
1.首先会执行一次对应监听的函数
2.修改对应监听函数内使用的响应式数据，对应的监听函数就会重新执行，重新执行的过程就会获取到新的数据

effect(fn)
    ==> createReactiveEffect==warpFn==>lazy ==Effect()==> run(effect, fn, args)
    ==> effectStack(维护一个堆栈)
    ==> effectStack.push (Effect)
    ==> fn()
    ==> get ==> track(target,get,'key')==> {
        target:{
            key:[Effect]
        }
    }
```

### 3. baseHandlers.ts

相关的文件[baseHandlers.ts](https://github.com/wuzhuang102/blog/blob/source-code/vue-next/packages/reactivity/src/baseHandlers.ts)

baseHandlers 中定义了 Proxy state 中的 get 与 set 方法

```ts
// getter 处理
function createGetter(isReadonly: boolean) {
  track(target, OperationTypes.GET, key)
  return isObject(res)
    ? isReadonly
      ? // need to lazy access readonly and reactive here to avoid circular dependency
        readonly(res)
      : reactive(res)
    : res
}

// setter 处理
function set(target: object, key: string | symbol, value: unknown, receiver: object): boolean {
  if (target === toRaw(receiver)) {
    // 如果是原始数据原型链上自己的操作，就不触发
    if (__DEV__) {
      /* ... */
    } else {
      // 属性新增，触发 ADD 枚举
      if (!hadKey) {
        trigger(target, OperationTypes.ADD, key)
      } else if (hasChanged(value, oldValue)) {
        // 当新值与旧值不相等时
        // 属性修改，触发 SET 枚举
        trigger(target, OperationTypes.SET, key)
      }
    }
  }
}
export const mutableHandlers: ProxyHandler<object> = {}
export const readonlyHandlers: ProxyHandler<any> = {}
```

### 4. ref.ts

相关的文件与测试文件
[ref.ts](https://github.com/wuzhuang102/blog/blob/source-code/vue-next/packages/reactivity/src/ref.ts)
[ref.spec.ts](https://github.com/wuzhuang102/blog/blob/source-code/vue-next/packages/reactivity/__tests__/ref.spec.ts)

### 小结

1. 原始数据 origin 经过 reactive 方法生成响应式数据 proxy state，拥有 setter 和 getter
2. 函数 fn 经过 effect 方法生成一个 effect 对象，立即执行 fn 一次，再通过 run 方法
   - 触发 proxy state 的 getter，通过 track 方法收集 effect 依赖
   - 将 effect 对象存入 effectStack 中，为了依赖收集
3. proxy state 数据更新时，触发对应 key 的 setter，后续工作交给 trigger 方法
   - 先执行 computedEffects、再执行 scheduleRun

![](/front-end/js/vue3-reactivity.png)

## runtime-core

### 1. vnode.ts

Vue3 针对 vnode 也进行了优化

```jsx
// ---- 一段普通的 vue 代码
;<div>
  <p>foo</p>
  <p>{{ bar }}</p>
</div>

// ---- vue 解析生成的 vnode
const vnode = {
  tag: 'div',
  children: [
    { tag: 'p', children: 'foo' },
    { tag: 'div', children: [{ tag: 'p', children: ctx.bar }] },
  ],
  // v3会增加一个，动态节点添加到dynamicChildren，之后diff直接对比这里
  // 这样在 diff 的时候，就不需进行深层遍历
  dynamicChildren: [{ tag: 'p', children: ctx.bar }],
}
```

<br/>
<br/>

**博文参考**

- [Vue 的响应系统](http://www.mamicode.com/info-detail-2861150.html)
