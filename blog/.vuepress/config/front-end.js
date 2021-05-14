module.exports = {
    "/front-end/": [
        {
            title: "JavaScript",
            collapsable: false, // 可折叠
            children: [
                "/front-end/javascript/source-code/vue",
                "/front-end/javascript/source-code/vue3",
                "/front-end/javascript/source-code/vuex",
                "/front-end/javascript/source-code/react",
                "/front-end/javascript/source-code/redux",
                "/front-end/javascript/source-code/webpack-1",
                "/front-end/javascript/source-code/webpack-2",
                "/front-end/javascript/source-code/webpack-3",
                "/front-end/javascript/source-code/libuv",
                "/front-end/javascript/principle/execution",
                "/front-end/javascript/principle/object-map",
                "/front-end/javascript/principle/wx-mini-program",
                "/front-end/javascript/base/concept",
                "/front-end/javascript/base/concept2",
                "/front-end/javascript/version",
                "/front-end/javascript/functional-programming",
            ],
        },
        {
            title: "HTML｜CSS",
            collapsable: false,
            children: [
                "/front-end/html/meta",
                "/front-end/css/formatting-context",
                "/front-end/css/stack",
                "/front-end/css/performance",
                "/front-end/css/future",
                "/front-end/css/css-common-use",
                // '/front-end/css/3d'
            ],
        },
        {
            title: "Node",
            collapsable: false,
            children: [["/front-end/node/", "Node基本知识"], ["/front-end/node/memory", "内存与垃圾回收"], "/front-end/node/process-thread", "/front-end/node/source-code-1"],
        },
        {
            title: "前端专题",
            collapsable: false,
            children: [
                ["/front-end/special/qa", "前端测试"],
                "/front-end/special/packaging-tool",
                "/front-end/special/webpack",
                "/front-end/special/ci-cd",
                "/front-end/special/performance-yahoo",
                "/front-end/special/performance-tool",
                "/front-end/special/performance-index",
                "/front-end/special/performance-animation",
                "/front-end/special/program-micro-frontend",
                "/front-end/special/error-handler",
                "/front-end/special/rule-browser",
                "/front-end/special/browser",
            ],
        },
        {
            title: "前端图形学",
            collapsable: false,
            children: ["/front-end/graphics/base"],
        },
        {
            title: "HTTP",
            collapsable: false,
            children: [
                ["/front-end/http/", "HTTP简介"],
                "/front-end/http/https",
                ["/front-end/http/header", "HTTP --- 头"],
                ["/front-end/http/status-code", "HTTP --- 状态码"],
                ["/front-end/http/cache", "HTTP --- 缓存篇"],
                ["/front-end/http/cookie", "HTTP --- cookie"],
            ],
        },
    ],
};
