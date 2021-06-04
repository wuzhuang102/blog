module.exports = {
    "/tool/": [
        {
            title: "基础开发类",
            collapsable: false,
            children: [
                "/tool/linux/base",
                "/tool/linux/common",
                "/tool/linux/core",
                "/tool/linux/async",
                // '/tool/linux/libuv'

                // Git类
                "/tool/git/",

                // Nginx类
                "/tool/nginx/",
                "/tool/nginx/location",
                "/tool/nginx/rewrite",
            ],
        },
        {
            title: "晋级开发类",
            collapsable: false,
            children: ["/tool/docker/", "/tool/docker/software"],
        },
        {
            title: "其他",
            collapsable: false,
            children: ["/tool/extend/front-end"],
        },
        {
            title: "杂碎",
            collapsable: false,
            children: [
                // ['/tool/', '软件问题'],
                // ['/tool/other/软件推荐', '软件推荐'],
                ["/tool/other/mac破解软件", "mac软件问题"],
                "/tool/other/something-useful",
                "/tool/other/life",
            ],
        },
    ],
};
