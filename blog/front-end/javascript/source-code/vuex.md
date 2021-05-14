# 源码篇 --- Vuex

## Vuex 实现

### 简单版本 Vuex

- 核心还是要使 Vue 封装的那套双向数据绑定逻辑

```js
let Vue;
class Store {
    constructor(options) {
        const { state, mutations, actions, getters } = options;
        this._mutations = mutations;
        this._actions = actions;

        this._vm = new Vue({
            data: {
                $$store: state,
            },
        });

        if (getters) this.handleGetters(getters);
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    get state() {
        return this._vm._data.$$store;
    }

    commit(type, payload) {
        let entry = this._mutations[type];
        if (entry) {
            entry(this.state, payload);
        }
    }

    dispatch(type, payload) {
        let entry = this._actions[type];
        if (entry) {
            entry(this, payload);
        }
    }

    handleGetters(getters) {
        this.getters = {};
        Object.keys(getters).forEach((key) => {
            Object.defineProperty(this.getters, key, {
                get: () => getters[key](this.state),
            });
        });
    }
}

function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        },
    });
}

export default {
    Store,
    install,
};

export { Store, install };
```

### 简单版本 store.js

```js
import Vue from "vue";
import Vuex from "./wz-vuex";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        counter: 0,
    },
    mutations: {
        add(state) {
            state.counter += 1;
        },
    },
    actions: {
        add({ commit }) {
            setTimeout(() => {
                commit("add");
            }, 100);
        },
    },
    getters: {
        doubleCounter(state) {
            return state.counter * 2;
        },
    },
    modules: {},
});
```
