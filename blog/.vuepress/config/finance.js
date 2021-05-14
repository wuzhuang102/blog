module.exports = {
    "/finance/": [
        {
            title: "股票|基金",
            collapsable: false,
            children: ["/finance/fund/overview", "/finance/fund/etf"],
        },
        {
            title: "基础知识",
            collapsable: false,
            children: ["/finance/wiki/financial-report"],
        },
        {
            title: '公司分析',
            collapsable: false,
            children:[
                '/finance/company/',
                '/finance/company/industry'
            ]
        },
        {
            title: "资料收集",
            collapsable: false,
            children: ["/finance/collection/", "/finance/collection/industry"],
        },
    ],
};
