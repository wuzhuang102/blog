const tool = require("./config/tool.js");
const front_end = require("./config/front-end.js");
const algorithm = require("./config/algorithm.js");
const book = require("./config/book.js");
const finance = require("./config/finance.js");
const wiki = require("./config/wiki.js");
const interview = require("./config/interview");
const bitcoin = require("./config/bitcoin");

module.exports = {
    title: "你当像鸟飞往你的山",
    head: [["link", { rel: "icon", href: "/avatar.jpg" }]],
    markdown: {
        extractHeaders: ["h2", "h3"],
    },
    themeConfig: {
        nav: [
            { text: "前端", link: "/front-end/" },
            { text: "算法", link: "/algorithm/" },
            { text: "我的wiki", link: "/wiki/" },
            { text: "技术扩展", link: "/tool/" },
            { text: "阅读", link: "/book/" },
            { text: "面试", link: "/interview/" },
        ],
        sidebarDepth: 2,
        sidebar: {
            ...front_end,
            ...tool,
            ...algorithm,
            ...book,
            ...finance,
            ...wiki,
            ...interview,
            ...bitcoin
        },
    },
    plugins: {
        // 图片放大
        "@vuepress/medium-zoom": {
            selector: "img.zoom-img",
            options: {
                margin: 16,
            },
        },
    },
};
