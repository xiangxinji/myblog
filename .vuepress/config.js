const generatorNavs = () => {
    return [
        {name: "文章", path: "/pages/article/"},
        {name: "书籍", path: "/pages/books/"},
        {name: "linux相关", path: "/pages/linux/"},
        // { name: "数据结构", path: "/pages/data-structure/" },
        // { name: "设计模式", path: "/pages/dp/" },
        {name: "小计", path: "/pages/record/"},
        {name: "技术栈", path: "/pages/middle/"},
        {name: "问题记录", path: "/pages/qr/"},
    ];
};

module.exports = {
    chainWebpack: (config, isServer) => {
        // config 是 ChainableConfig 的一个实例
        const isProd = process.env.NODE_ENV === "production";
        if (isProd) {
            console.log(config);
            config.output.publicPath = "/myBlog";
        }
    },
    title: "Panda Eyes",
    themeConfig: {
        repo: "https://github.com/xiangxinji/myblog.git",
        repoLabel: "存储库",
        smoothScroll: true,
        lastUpdated: " 写于 ", // string | boolean
        nav: generatorNavs().map((item) => ({text: item.name, link: item.path})),
        sidebar: generatorNavs().map((item) => ({
            title: item.name,
            path: item.path,
            collapsable: false,
        })),
    },
    markdown: {
        lineNumbers: true,
    },
    plugins: ['@vuepress/medium-zoom', '@vuepress/nprogress', '@vuepress/active-header-links']
};
