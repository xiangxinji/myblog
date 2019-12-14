module.exports = {
    title: '向歆纪的博客',
    description: '这是向歆纪的博客',
    themeConfig: {
        repo: 'https://github.com/xiangxinji/myblog.git',
        repoLabel: '查看源码',
        smoothScroll: true,
        lastUpdated: '向歆纪写于', // string | boolean
        nav: [
            {text: 'eslint', link: '/pages/article/eslint/'},
            {text: 'webpack', link: '/pages/article/webpack/'},
            {text: '中级', link: '/pages/middle/'},
            {text: '架构', link: '/pages/construct/'},
        ],
        sidebar: [
            // '/',
            // '/pages/base/',
            // '/pages/middle/',
            // '/pages/construct/'
            {
                title : '首页',
                path : '/',
                collapsable: false,
            },
            {
                title : '中级模块',
                path : '/pages/middle/',
                collapsable: false,
            },
            {
                title : '架构模块',
                path : '/pages/construct/',
                collapsable: false,
            },
            {
                title : 'webpack文章模块',
                path : '/pages/article/webpack/',
                collapsable: false
            },
            {
                title : 'eslint文章模块',
                path : '/pages/article/eslint/',
                collapsable: false
            }
        ]
    },
    markdown: {
        lineNumbers: true
    }
}