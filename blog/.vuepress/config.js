module.exports = {
    title: '你当像鸟飞往你的山',
    head: [["link", { rel: "icon", href: "/avatar.jpg" }]],
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '前端', link: '/front-end/' },
            { text: '算法', link: '/algorithm/' },
            { text: '软件', link: '/software/' },
            { text: '阅读', link: '/book/' }
        ],
        sidebarDepth: 2,
        sidebar: {
            // 前端篇
            '/front-end/': [
                {
                    title: 'HTTP',
                    collapsable: false,
                    children: [
                        ['/front-end/http/', 'http简介'],
                        ['/front-end/http/cache', '缓存篇'],
                        ['/front-end/http/cookie', 'cookie']
                    ]
                },
                {
                    title: 'HTML',
                    collapsable: false,
                    children: [
                        ['/front-end/html/', 'HTML'],
                        ['/front-end/html/meta', 'meta']
                    ]
                },
                {
                    title: 'JavaScript',
                    collapsable: false, // 可折叠
                    children: [
                        ['/front-end/javascript/', '基本篇'], // 你的md文件地址
                        ['/front-end/javascript/intergration', '深入篇'],
                        ['/front-end/javascript/code-implementation', '代码篇'],
                        ['/front-end/javascript/version', '版本篇'],
                    ]
                },
                {
                    title: 'CSS',
                    collapsable: false,
                    children: [
                        ['/front-end/css/', 'css']
                    ]
                }
            ],
            // 算法篇
            '/algorithm/': [
                {
                    title: '算法基础知识',
                    collapsable: false,
                    children: [
                        ['/algorithm/base/data-structure', '数据结构'],
                        ['/algorithm/base/introduction-algorithm', '算法概论'],
                        ['/algorithm/base/sort', '排序算法'],
                        ['/algorithm/base/search', '查找算法']
                    ]
                },
                {
                    title: '算法题',
                    collapsable: false,
                    children: [
                        ['/algorithm/', '算法'],
                        ['/algorithm/每日一题', '每日一题']
                    ]
                },
                {
                    title: '资源合集',
                    path: '/algorithm/subject/collection'
                }
            ],
            '/software/': [
                {
                    title: 'Docker',
                    collapsable: false,
                    children: [
                        ['/software/docker/', 'docker']
                    ]
                },
                {
                    title: 'Git',
                    collapsable: false,
                    children: [
                        ['/software/git/', 'git']
                    ]
                },
                {
                    title: 'Nginx',
                    collapsable: false,
                    children: [
                        ['/software/nginx/', 'nginx基本配置'],
                        ['/software/nginx/location', 'core - location'],
                        ['/software/nginx/rewrite', 'module - rewrite']
                    ]
                },
                {
                    title: '办公软件',
                    collapsable: false,
                    children: [
                        ['/software/', '软件问题'],
                        ['/software/other/软件推荐', '软件推荐'],
                        ['/software/other/mac破解软件', 'mac软件问题']
                    ]
                }
            ],
            '/book/': [
                {
                    title: '技术类',
                    collapsable: false,
                    children: [
                        ['/book/code/you_dont_know_javascript_1','你不知道的JavaScript(上)'],
                        ['/book/code/you_dont_know_javascript_2','你不知道的JavaScript(中)'],
                        ['/book/code/you_dont_know_javascript_3','你不知道的JavaScript(下)']
                    ]
                }
            ]
        }
    }
}