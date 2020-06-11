module.exports = {
    title: '你当像鸟飞往你的山',
    head: [["link", { rel: "icon", href: "/avatar.jpg" }]],
    markdown: {
        extractHeaders: ['h2', 'h3']
    },
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '前端', link: '/front-end/' },
            { text: '算法', link: '/algorithm/' },
            { text: '工具', link: '/tool/' },
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
                },
                {
                    title: '前端专题',
                    collapsable: false,
                    children: [
                        ['/front-end/special/functional-programming','JavaScript函数式编程'],
                        ['/front-end/special/qa','前端测试']
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
            '/tool/': [
                {
                    title: 'Linux',
                    collapsable: false,
                    children: [
                        ['/tool/linux/base', 'Linux基本知识']
                    ]
                },
                {
                    title: 'Docker',
                    collapsable: false,
                    children: [
                        ['/tool/docker/', 'docker']
                    ]
                },
                {
                    title: 'Git',
                    collapsable: false,
                    children: [
                        ['/tool/git/', 'git']
                    ]
                },
                {
                    title: 'Nginx',
                    collapsable: false,
                    children: [
                        ['/tool/nginx/', 'nginx基本配置'],
                        ['/tool/nginx/location', 'core - location'],
                        ['/tool/nginx/rewrite', 'module - rewrite']
                    ]
                },
                {
                    title: '办公软件',
                    collapsable: false,
                    children: [
                        ['/tool/', '软件问题'],
                        ['/tool/other/软件推荐', '软件推荐'],
                        ['/tool/other/mac破解软件', 'mac软件问题']
                    ]
                }
            ],
            '/book/': [
                {
                    title: '技术类',
                    collapsable: false,
                    children: [
                        ['/book/code/you_dont_know_javascript_1', '你不知道的JavaScript(上)'],
                        ['/book/code/you_dont_know_javascript_2', '你不知道的JavaScript(中)'],
                        ['/book/code/you_dont_know_javascript_3', '你不知道的JavaScript(下)'],
                        ['/book/code/learning_javascript_data_structure_and_algorithms', '学习JavaScript数据结构与算法']
                    ]
                }
            ]
        }
    }
}