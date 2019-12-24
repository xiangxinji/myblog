module.exports = {
    title: 'Singee',
    description: 'this is singee blog ',
    themeConfig: {
        repo: 'https://github.com/xiangxinji/myblog.git',
        repoLabel: 'source code',
        smoothScroll: true,
        lastUpdated: 'singee write to ', // string | boolean
        nav: [
            {text: 'eslint', link: '/pages/article/eslint/'},
            {text: 'webpack', link: '/pages/article/webpack/'},
            {text: 'nodejs', link: '/pages/middle/nodejs/'},
            {text: 'middle', link: '/pages/middle/'},
        ],
        sidebar: [
            // '/',
            // '/pages/base/',
            // '/pages/middle/',
            // '/pages/construct/'
            {
                title : 'home',
                path : '/',
                collapsable: false,
            },
            {
                title : 'middle',
                path : '/pages/middle/',
                collapsable: false,
            },
            {
                title : 'webpack',
                path : '/pages/article/webpack/',
                collapsable: false
            },
            {
                title : 'eslint',
                path : '/pages/article/eslint/',
                collapsable: false
            }
        ]
    },
    markdown: {
        lineNumbers: true
    }
}