module.exports = {
    title: 'Singee',
    description: 'this is singee blog ',
    themeConfig: {
        repo: 'https://github.com/xiangxinji/myblog.git',
        repoLabel: 'source code',
        smoothScroll: true,
        lastUpdated: 'singee write to ', // string | boolean
        nav: [
            {text: 'article', link: '/pages/article/'},
            {text: 'codelf', link: '/pages/codelf/'},
            {text: 'lib', link: '/#'},
            {text: '年终总结', link: '/pages/years/'},
            {text: 'middle', link: '/pages/middle/'},
        ],
        sidebar: [
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
                title : 'article',
                path : '/pages/article/webpack/',
                collapsable: false
            },
            {
                title : 'codelf',
                path : '/pages/article/eslint/',
                collapsable: false
            }
        ]
    },
    markdown: {
        lineNumbers: true
    }
}