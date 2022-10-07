# 源码篇 --- React 源码解析

## 历史发展

### React 15

### React 16

### React 17

#### 对优先级的扩展

从指定一个优先级到指定一个连续的优先级区间

#### Scheduler（调度器）

调度任务的优先级，高优任务优先进入 reconciler

- **react 中的优先级**
  - 生命周期方法：同步执行
  - 受控的用户输入：比如输入框内输入文字，同步执行
  - 交互事件：动画，高优执行
  - 其它：数据请求，低优先级执行

## React Hooks

### useState

```js
export function useState<S>(initialState: (() => S) | S): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```

#### dispatchAction
- 每次 setState 一次
  - 创建一个 update，添加到 queue.pending 中
  - 提前计算出最新的 state，保存在 eagerState 中
  - 最后调用一次 scheduleWork，进一步调度，触发 function 重新执行一次
