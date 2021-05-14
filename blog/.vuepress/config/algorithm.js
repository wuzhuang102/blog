module.exports = {
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
            title: '算法思维',
            collapsable: false,
            children: [
                '/algorithm/thinking/regular',
                '/algorithm/thinking/structure',
                '/algorithm/thinking/每日一题',
            ]
        },
        {
            title: '资源合集',
            path: '/algorithm/subject/collection'
        }
    ]
}