module.exports = {
    "/tool/": [
        {
            title: "Linux",
            collapsable: false,
            children: [
                "/tool/linux/base",
                "/tool/linux/common",
                "/tool/linux/core",
                "/tool/linux/async",
                // '/tool/linux/libuv'
            ],
        },
        {
            title: "Docker",
            collapsable: false,
            children: ["/tool/docker/", "/tool/docker/software"],
        },
        // {
        //     title: 'Git',
        //     collapsable: false,
        //     children: [
        //         ['/tool/git/', 'git']
        //     ]
        // },
        {
            title: "Nginx",
            collapsable: false,
            children: [
                ["/tool/nginx/", "nginx基本配置"],
                ["/tool/nginx/location", "core - location"],
                ["/tool/nginx/rewrite", "module - rewrite"],
            ],
        },
        // {
        //     title: 'Mysql',
        //     collapsable: false,
        //     children: [
        //         ['/tool/mysql/', 'mysql基本知识'],
        //     ]
        // },
        // {
        //     title: 'PHP',
        //     collapsable: false,
        //     children: [
        //         ['/tool/php/', 'php基本语法']
        //     ]
        // },
        {
            title: "前端技术扩展",
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
