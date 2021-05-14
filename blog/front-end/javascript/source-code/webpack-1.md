# 源码篇 --- Webpack(一)：打包结果分析

## 两文件导出/导入打包
### 1. 打包源文件
源文件分两个： base.js 和 index.js ，使用 export 与 import
``` js
// base.js
const base = 'this is base.js'
export default base

// index.js
import base from './base'
const index = 'index'
console.log(base)
console.log(index)
```
### 2. 打包结果 
我们基于开发模式下打包，webpack --mode=development，打包出 /dist/main.js，我们去除了注释
``` js
(() => {
    "use strict";
    var __webpack_modules__ = ({
        "./src/base.js":
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                __webpack_require__.r(__webpack_exports__);
                __webpack_require__.d(__webpack_exports__, {
                    "default": () => __WEBPACK_DEFAULT_EXPORT__
                });
                const base = 'this is base.js'
                const __WEBPACK_DEFAULT_EXPORT__ = (base);
            }),

        "./src/index.js":
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                __webpack_require__.r(__webpack_exports__);
                var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/base.js");
                const index = 'index'
                console.log(_base__WEBPACK_IMPORTED_MODULE_0__.default)
                console.log(index)
            })
    });
    var __webpack_module_cache__ = {};

    function __webpack_require__(moduleId) {
        if (__webpack_module_cache__[moduleId]) {
            return __webpack_module_cache__[moduleId].exports;
        }
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }

    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                }
            }
        };
    })();

    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
    })();

    (() => {
        __webpack_require__.r = (exports) => {
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            }
            Object.defineProperty(exports, '__esModule', { value: true });
        };
    })();
    __webpack_require__("./src/index.js");
})();
//# sourceMappingURL=main.js.map
```
### 3. 打包结果分析
- **参数/函数 说明**
    - `__webpack_modules__`：存放打包的源模块 { moduleId1: module1, moduleId2: module2 }
    - `__webpack_module_cache__`：缓存已经 require 的模块，下次再使用时，直接读缓存
    - `__webpack_require__ = (moduleId)`：函数，根据 moduleId 获取模块并执行模块
    - `__webpack_require__.o = (obj, prop)`：判断 prop 是否是 obj 的非继承属性
    - `__webpack_require__.r = (exports)`：识别为 es 模块
    - `__webpack_require__.d = (exports, definition)`：模块导出内容存入缓存模块中
- **实现逻辑说明**
    - 所有模块塞入 `__webpack_modules__` 中，以路径为key，值为一个函数fn，通过 `__webpack_require__`，执行这个函数fn， 获取返回值中的 exports 属性，这就是模块的导出的集合
    - 有导出的代码中会执行 `__webpack_require__.d` 函数，旨在将模块导出的内容存入缓存模块 `__webpack_module_cache__[moduleId]` 的 exports 中

## 异步模块打包
### 1. 打包源文件
依旧是两个文件，index.js 使用异步方式调用 base.js
``` js
// base.js
const base = 'this is base.js'
export default base

// index.js
const index = 'index'
import('./base').then(_ => {
    console.log(_.default)
})
console.log(index)
```
### 2. 打包结果
打包结果分为两个文件： main.js 和 src_base_js.js

#### src_base_js.js
打包结果中主体代码使用 eval 包装的，这里我们为了方便查看将 eval 去除
```js
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["src_base_js"], {
    "./src/base.js": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {"default": () => __WEBPACK_DEFAULT_EXPORT__ });
        const base = 'this is base.js'
        const __WEBPACK_DEFAULT_EXPORT__ = (base);
    })
}]);
```
#### main.js
<div style="height: 500px;overflow:scroll">

```js
(() => {
    var __webpack_modules__ = ({});
    var __webpack_module_cache__ = {};

    // The require function
    function __webpack_require__(moduleId) {
        if (__webpack_module_cache__[moduleId]) {
            return __webpack_module_cache__[moduleId].exports;
        }
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }

    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = __webpack_modules__;

    /* webpack/runtime/define property getters */
    (() => {
        // define getter functions for harmony exports
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                }
            }
        };
    })();

    /* webpack/runtime/ensure chunk */
    (() => {
        __webpack_require__.f = {};
        // This file contains only the entry chunk.
        // The chunk loading function for additional chunks
        __webpack_require__.e = (chunkId) => {
            return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
                __webpack_require__.f[key](chunkId, promises);
                return promises;
            }, []));
        };
    })();

    /* webpack/runtime/get javascript chunk filename */
    (() => {
        // This function allow to reference async chunks
        __webpack_require__.u = (chunkId) => {
            // return url for filenames based on template
            return "" + chunkId + ".js";
        };
    })();

    /* webpack/runtime/global */
    (() => {
        __webpack_require__.g = (function () {
            if (typeof globalThis === 'object') return globalThis;
            try {
                return this || new Function('return this')();
            } catch (e) {
                if (typeof window === 'object') return window;
            }
        })();
    })();

    /* webpack/runtime/hasOwnProperty shorthand */
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
    })();

    /* webpack/runtime/load script */
    (() => {
        var inProgress = {};
        var dataWebpackPrefix = "webpack-demo:";
        // loadScript function to load a script via script tag
        __webpack_require__.l = (url, done, key) => {
            if (inProgress[url]) { inProgress[url].push(done); return; }
            var script, needAttach;
            if (key !== undefined) {
                var scripts = document.getElementsByTagName("script");
                for (var i = 0; i < scripts.length; i++) {
                    var s = scripts[i];
                    if (s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
                }
            }
            if (!script) {
                needAttach = true;
                script = document.createElement('script');

                script.charset = 'utf-8';
                script.timeout = 120;
                if (__webpack_require__.nc) {
                    script.setAttribute("nonce", __webpack_require__.nc);
                }
                script.setAttribute("data-webpack", dataWebpackPrefix + key);
                script.src = url;
            }
            inProgress[url] = [done];
            var onScriptComplete = (prev, event) => {
                // avoid mem leaks in IE.
                script.onerror = script.onload = null;
                clearTimeout(timeout);
                var doneFns = inProgress[url];
                delete inProgress[url];
                script.parentNode && script.parentNode.removeChild(script);
                doneFns && doneFns.forEach((fn) => fn(event));
                if (prev) return prev(event);
            }
                ;
            var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
            script.onerror = onScriptComplete.bind(null, script.onerror);
            script.onload = onScriptComplete.bind(null, script.onload);
            needAttach && document.head.appendChild(script);
        };
    })();

    /* webpack/runtime/make namespace object */
    (() => {
        // define __esModule on exports
        __webpack_require__.r = (exports) => {
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            }
            Object.defineProperty(exports, '__esModule', { value: true });
        };
    })();

    /* webpack/runtime/publicPath */
    (() => {
        var scriptUrl;
        if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
        var document = __webpack_require__.g.document;
        if (!scriptUrl && document) {
            if (document.currentScript)
                scriptUrl = document.currentScript.src
            if (!scriptUrl) {
                var scripts = document.getElementsByTagName("script");
                if (scripts.length) scriptUrl = scripts[scripts.length - 1].src
            }
        }
        // When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
        // or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
        if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
        scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
        __webpack_require__.p = scriptUrl;
    })();

    /* webpack/runtime/jsonp chunk loading */
    (() => {
        // object to store loaded and loading chunks
        // undefined = chunk not loaded, null = chunk preloaded/prefetched
        // Promise = chunk loading, 0 = chunk loaded
        var installedChunks = {
            "main": 0
        };

        __webpack_require__.f.j = (chunkId, promises) => {
            // JSONP chunk loading for javascript
            var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
            if (installedChunkData !== 0) { // 0 means "already installed".

                // a Promise means "currently loading". 说明这个异步 chunk 已经开始请求了
                if (installedChunkData) {
                    promises.push(installedChunkData[2]);
                } else { 
                    if (true) { 
                        var promise = new Promise((resolve, reject) => {
                            installedChunkData = installedChunks[chunkId] = [resolve, reject];
                        });
                        promises.push(installedChunkData[2] = promise);

                        // start chunk loading
                        var url = __webpack_require__.p + __webpack_require__.u(chunkId);
                        // create error before stack unwound to get useful stacktrace later
                        var error = new Error();
                        // chunk load 进程管理
                        var loadingEnded = (event) => {
                            if (__webpack_require__.o(installedChunks, chunkId)) {
                                installedChunkData = installedChunks[chunkId];
                                if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
                                if (installedChunkData) {
                                    var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                                    var realSrc = event && event.target && event.target.src;
                                    error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
                                    error.name = 'ChunkLoadError';
                                    error.type = errorType;
                                    error.request = realSrc;
                                    installedChunkData[1](error);
                                }
                            }
                        };
                        __webpack_require__.l(url, loadingEnded, "chunk-" + chunkId);
                    } else installedChunks[chunkId] = 0;
                }
            }
        };

        // install a JSONP callback for chunk loading
        var webpackJsonpCallback = (data) => {
            var [chunkIds, moreModules, runtime] = data;
            // add "moreModules" to the modules object,
            // then flag all "chunkIds" as loaded and fire callback
            var moduleId, chunkId, i = 0, resolves = [];
            for (; i < chunkIds.length; i++) {
                chunkId = chunkIds[i];
                if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
                    resolves.push(installedChunks[chunkId][0]);
                }
                installedChunks[chunkId] = 0;
            }
            for (moduleId in moreModules) {
                if (__webpack_require__.o(moreModules, moduleId)) {
                    __webpack_require__.m[moduleId] = moreModules[moduleId];
                }
            }
            if (runtime) runtime(__webpack_require__);
            parentChunkLoadingFunction(data);
            while (resolves.length) {
                resolves.shift()();
            }
        }

        var chunkLoadingGlobal = self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || [];
        var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
        chunkLoadingGlobal.push = webpackJsonpCallback;
    })();

    /*  !*** ./src/index.js ***! */
    const index = 'index'
    __webpack_require__.e(/*! import() */ "src_base_js")
        .then(__webpack_require__.bind(__webpack_require__, /*! ./base */ "./src/base.js"))
        .then(_ => { console.log(_.default) })
    console.log(index)
})();
```
</div>

### 3. 打包结果分析
- **参数/函数 说明**
    - `__webpack_require__.m`：指向模块 `__webpack_modules__`
    - `__webpack_require__.p`：public path
    - `__webpack_require__.u`：根据chunkId 获取文件名
    - `__webpack_require__.g`：返回全局对象(global)，没有的话就 new Function('return this')()
    - `__webpack_require__.l = (url, done, key)`：通过 script tag 加载(load) js
    - `__webpack_require__.f.j = (chunkId, promises)`：这个例子中主要为了 `__webpack_require__.e` 服务，控制异步 chunk 请求的各种状态，已经请求过就不再请求
    - `__webpack_require__.e = (chunkId)`：**重要**函数，异步获取 chunk,返回 promise

- **实现逻辑说明**
    - 执行到 `__webpack_require__.e("src_base_js")` 时，通过拼接得到模块js的路径
    - 通过 `__webpack_require__.l = (url, done, key)` ，以 jsonp 的方式获取到本地，存入 `__webpack_require__.m`
    - `.then(__webpack_require__.bind(__webpack_require__, "./src/base.js"))` 代码通过 `__webpack_require` 方法获取并缓存异步模块
    - `.then(_ => { console.log(_.default) })` 拿到上一步中的返回值，也就是模块导出的内容，执行函数体（定义在index.js中的）
