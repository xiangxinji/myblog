module.exports = {
  chainWebpack: (config, isServer) => {
    // config 是 ChainableConfig 的一个实例
    const isProd = process.env.NODE_ENV === "production";
    if (isProd) {
      console.log(config);
      config.output.publicPath = "/myBlog";
    }
  },
  title: "随记",
  description: "大道至简",
  themeConfig: {
    repo: "https://github.com/xiangxinji/myblog.git",
    repoLabel: "存储库",
    smoothScroll: true,
    lastUpdated: "singee 写于 ", // string | boolean
    nav: [
      { text: "书籍", link: "/pages/books/" },
      { text: "文章", link: "/pages/article/" },
      { text: "源码解析", link: "/pages/source/" },
      { text: "基础", link: "/pages/base/" },
      { text: "设计模式", link: "/pages/dp/" },
      { text: "技术栈", link: "/pages/middle/" },
      { text: "工程", link: "/pages/build/" },
      { text: "兼容", link: "/pages/jr/" },
    ],
    sidebar: [
      {
        title: "首页",
        path: "/",
        collapsable: false,
      },
      {
        title: "书籍",
        path: "/pages/books/",
        collapsable: false,
      },

      {
        title: "文章",
        path: "/pages/article/",
        collapsable: false,
      },

      {
        title: "基础",
        path: "/pages/base/",
        collapsable: false,
      },

      {
        title: "设计模式",
        path: "/pages/dp/",
        collapsable: false,
      },

      {
        title: "技术栈",
        path: "/pages/middle/",
        collapsable: false,
      },

      {
        title: "工程",
        path: "/pages/build/",
        collapsable: false,
      },

      {
        title: "兼容",
        path: "/pages/jr/",
        collapsable: false,
      },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
};
