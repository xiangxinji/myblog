module.exports = {
    title: '向歆纪的博客',
    description: '这是向歆纪的博客',
    themeConfig: {

        smoothScroll: true,

        nav: [
            {text: '基础', link: '/pages/base/'},
            {text: '中级', link: '/pages/middle/'},
            {text: '架构', link: '/pages/construct/'},
            {text: '日志', link: '/pages/log/'},
            {text: 'Github', link: 'https://github.com'},
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
                title : '基础模块',
                path : '/pages/base/',
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
                title : '日志',
                path : '/pages/log/',
                collapsable: false,
            }
        ]
    },
}