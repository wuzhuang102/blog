# 源码篇 --- Redux源码解析

![](/front-end/js/redux-flux.png)
## Redux 核心思想
### 1. Redux 主要成员
1. **Store**：Store 维持着应用的 state tree 对象，一个 Redux 应用只有一个 Store
2. **State**：由store管理并由 `getState()` 方法获得，表示应用的全部状态
3. **Action**：
    - Action是把数据放入 store 的唯一路径，无论是 UI 事件、网络回调，最终都会被 dispatch 成 action
    - Action 只描述事情的发生，如何更新 state 由 reducer 完成
4. **Reducer**：
    - 指定了应用状态的变化如何响应 actions 并发送到 store 的
    - reducer 是一个[纯函数](/front-end/javascript/functional-programming)
5. **dispatch**：dispatch 函数负责发送 action 到 store

### 2. Redux运行流程
1. 用户访问View
2. View 发出（dispatch）用户的 Action
3. Dispatcher 收到 Action，经过 Middleware(主要用于处理异步数据), 要求 Store 进行相应的更新
4. Store 将修改任务下发给 Reducer,Reducer 负责处理产生新的 State
5. State 更新后再去更新 View

## 源码解析
### 1. createStore.js
createStore.js 文件主要用来创建 store ,接收几个参数 `reducer`、`initState`、`enhancer?`

createStore.js 中定义了以下几个方法
- getState()：返回当前 store 的 state
- subcribe()： 注册一个listener，state 变化时执行此 listener
- dispatch()：dispatch 向 store 发送 action
- replaceReducer()：用于 reducer 的重载
### 2. combineReducers.js
combineReducers 负责将 reducer 整合到一起

diaptch 出一个 action 之后，会遍历执行所有的 reducer
### 3. applyMiddleware.js
applyMiddleware 的作用主要是重写 dispatch, 在执行 oldDispatch 之前执行 middleware
### 4. compose.js
提供一个 [compose](/front-end/javascript/functional-programming.html#_3-3-函数组合-compose) 函数，负责组合函数列表 
### 5. bindActionCreators.js
把 action creators 转成拥有同名 keys 的对象，使用 dispatch 把每个 action creator 包围起来，这样可以直接调用它们


