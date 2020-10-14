/* @flow */

import { isRegExp, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'

type VNodeCache = { [key: string]: ?VNode };

function getComponentName(opts: ?VNodeComponentOptions): ?string {
    return opts && (opts.Ctor.options.name || opts.tag)
}

function matches(pattern: string | RegExp | Array<string>, name: string): boolean {
    if (Array.isArray(pattern)) {
        return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1
    } else if (isRegExp(pattern)) {
        return pattern.test(name)
    }
    /* istanbul ignore next */
    return false
}

function pruneCache(keepAliveInstance: any, filter: Function) {
    const { cache, keys, _vnode } = keepAliveInstance
    for (const key in cache) {
        const cachedNode: ?VNode = cache[key]
        if (cachedNode) {
            const name: ?string = getComponentName(cachedNode.componentOptions)
            if (name && !filter(name)) {  // 在黑名单中的就清除
                pruneCacheEntry(cache, key, keys, _vnode)
            }
        }
    }
}

function pruneCacheEntry(
    cache: VNodeCache,
    key: string,
    keys: Array<string>,
    current?: VNode
) {
    const cached = cache[key]
    if (cached && (!current || cached.tag !== current.tag)) {
        cached.componentInstance.$destroy()
    }
    cache[key] = null
    remove(keys, key)
}

const patternTypes: Array<Function> = [String, RegExp, Array]

export default {
    name: 'keep-alive',
    abstract: true,

    props: {
        include: patternTypes,  // 缓存白名单
        exclude: patternTypes,  // 缓存黑名单
        max: [String, Number]   // 缓存实例上限
    },

    created() {
        this.cache = Object.create(null)  // 缓存虚拟dom
        this.keys = []
    },

    destroyed() {
        for (const key in this.cache) {
            pruneCacheEntry(this.cache, key, this.keys)
        }
    },

    mounted() {
        this.$watch('include', val => {
            pruneCache(this, name => matches(val, name))
        })
        this.$watch('exclude', val => {
            pruneCache(this, name => !matches(val, name))
        })
    },


    // keep-alive 组件，主要逻辑在 render 函数中
    // --- 1. 使用 getFirstComponentChild 取出 keep-alive 组件下面第一个子组件
    // --- 2. 白黑名单校验，看是否是会被缓存的组件
    // --- 3. 子组件在 cache 中，就直接取出返回 vnode，不在 vnode中，就存入 vnode,并校验最大缓存数
    render() {
        const slot = this.$slots.default
        const vnode: VNode = getFirstComponentChild(slot)  // 找到第一个子组件对象
        const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
        if (componentOptions) {
            // check pattern
            const name: ?string = getComponentName(componentOptions)
            const { include, exclude } = this
            if (
                // not included
                (include && (!name || !matches(include, name))) ||
                // excluded
                (exclude && name && matches(exclude, name))
            ) {
                return vnode
            }

            const { cache, keys } = this
            const key: ?string = vnode.key == null
                // same constructor may get registered as different local components
                // so cid alone is not enough (#3269)
                ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
                : vnode.key
            if (cache[key]) {
                vnode.componentInstance = cache[key].componentInstance
                // make current key freshest
                remove(keys, key)
                keys.push(key)
            } else {
                cache[key] = vnode
                keys.push(key)
                // prune oldest entry
                if (this.max && keys.length > parseInt(this.max)) {
                    pruneCacheEntry(cache, keys[0], keys, this._vnode)
                }
            }

            vnode.data.keepAlive = true
        }
        return vnode || (slot && slot[0])
    }
}
