module.exports = {
  title: "😈Singee",
  description: "this is singee blog ",
  themeConfig: {
    repo: "https://github.com/xiangxinji/myblog.git",
    repoLabel: "source code",
    smoothScroll: true,
    lastUpdated: "singee write to ", // string | boolean
    nav: [
        { text: "😄文章", link: "/pages/article/" },
        { text: "😜源码解析", link: "/pages/source/" },
        { text: "🤨基础", link: "/pages/base/" },
        { text: "⌛设计模式", link: "/pages/dp/" },
        { text: "😵技术栈", link: "/pages/middle/" },
        { text: "🤗工程" , link : "/pages/build/"}
    ],
    sidebar: [
      {
        title: "😈首页",
        path: "/",
        collapsable: false
      },
      {
        title: "🤨基础东东",
        path: "/pages/base/",
        collapsable: false
      },
      {
        title: "📁技术栈",
        path: "/pages/middle/",
        collapsable: false
      },
      {
        title: "🧪源代码分析",
        path: "/pages/source/",
        collapsable: false
      },
      {
        title: "🧫随便写写的文章",
        path: "/pages/article/webpack/",
        collapsable: false
      },
      {
        title: "⌛设计模式",
        path: "/pages/dp/",
        collapsable: false
      },
      {
        title: "🍽️工程化",
        path: "/pages/build/",
        collapsable: false
      },
      {
        title: "😳年终总结",
        path: "/pages/years/2019",
        collapsable: false
      }
    ]
  },
  markdown: {
    lineNumbers: true
  }
};
