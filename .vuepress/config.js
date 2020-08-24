const generatorNavs = () => {
  return [
    { name: "文章", path: "/pages/article/" },
    { name: "书籍", path: "/pages/books/" },
    { name: "linux相关", path: "/pages/linux/" },
    { name: "数据结构", path: "/pages/data-structure/" },
    { name: "设计模式", path: "/pages/dp/" },
    { name: "技术栈", path: "/pages/middle/" },
    { name: "兼容", path: "/pages/jr/" },
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
  title: "Singee手记",
  themeConfig: {
    repo: "https://github.com/xiangxinji/myblog.git",
    repoLabel: "存储库",
    smoothScroll: true,
    lastUpdated: "singee 写于 ", // string | boolean
    nav: generatorNavs().map((item) => ({ text: item.name, link: item.path })),
    sidebar: generatorNavs().map((item) => ({
      title: item.name,
      path: item.path,
      collapsable: false,
    })),
  },
  markdown: {
    lineNumbers: true,
  },
};
