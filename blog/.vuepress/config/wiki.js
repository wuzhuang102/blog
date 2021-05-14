module.exports =   {
    // 财务
    '/wiki/': [
        {
            title: '我的wiki',
            collapsable: false,
            children: [
                '/wiki/base/ast',
                '/wiki/base/bff',
                '/wiki/base/design',
                '/wiki/base/modularization',
                '/wiki/base/ioc',
                '/wiki/base/aop',
                '/wiki/base/web-component',
                '/wiki/base/webassembly',
                '/wiki/base/web-worker',
                '/wiki/base/pwa',
                '/wiki/base/bit-operation',
                '/wiki/base/eslint'
            ]
        },{
            title: '软件篇',
            collapsable: false,
            children: [
                '/wiki/software/jenkins',
                '/wiki/software/nexus3'
            ]
        }
    ]
}