let Vue;
class Store {
    constructor(options) {
        const { state, mutations, actions } = options;
        this._mutations = mutations;
        this.actions = actions;
        this._vm = new Vue({
            data: {
                $$state: state,
            },
        });
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    get state() {
        return this._vm._data.$$state;
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
}

function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$option.store) {
                Vue.prototype.store = this.$option.store;
            }
        },
    });
}

export default {
    Store,
    install,
};

export { Store, install };
