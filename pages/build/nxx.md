


# Nxx

这是我的一个创建准备模拟SSR 的一个项目,这块呢也是想踩一踩ssr的一些坑,主要的呢还是使用的 vue .  当然也有成熟的框架 nuxt , 这个框架我今天试了一下, 还行, 特别是他的 asyncData , 我这边也是做了一个模拟. 也是可以实现的...  

<hr>

// 涉及的东西也比较多 , 也多多少少算了解一点nuxt 其中的一些原理了 ..  

// 服务端这边呢,是用的koa , 也没有使用express , 因为koa 的 async 函数写法实在写的舒服一点 

// 在这之前使用通用代码 , 也就是说  同样的一个vue文件,可以打包成 spa即单页面应用模式,和 ssr 服务端渲染模式 

// webpack 的基础也比较多 , 我也只记录一点比较重要的部分


<hr>

一般我们使用 webpack 打包单页面 就只有一个main.js 对吧, 然后 webpack 配置entry 从main.js出发开始进行 spa 的打包 , 那么这一份配置就要进行保留 , 也就是说 SPA 的单页面我们需要使用单页面的那套模式打包 , 服务端渲染的模式也得使用多页面的形式打包 

那么两份配置如下 我这呢 在 build/ 有四个文件 
speedAnalysis.client.js // 速度分析配置 
webpack.config.client // SPA 模式进行打包 
webpack.config.server.js // 服务端的方式进行打包


然后呢在 entry/ 下面有三个文件 
app.js // 将两个通用的功能,抽离出来 
entry-client.js // SPA 的入口文件 , SPA模式,webpack 则以这为起点 
entry-server.js // SSR 的入口文件 , SSR模式,webpack 以这为起点 

:::warning
请注意, entry-server.js 只是负责将 vue文件打包成 JS , 并不负责 开启服务器和进行某些服务器的配置 
:::

<hr>


然后server/ 中 有使用koa 的服务器程序 

server/build 中就是 webpack以 SSR模式打包出来vue文件的构建结果 

文件大概就是这样子 

src: 包含着我们写的源码文件 


这里我就大约取一些片段来进行 记录


## code 
app.js // 将两个通用的功能,抽离出来
```javascript 
// entry/app.js 
import Vue from "vue";
import { sync } from "vuex-router-sync";
import App from "../src/App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";
export const createApp = () => {
  const router = createRouter();
  const store = createStore();
  sync(store, router);
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return { app, router, store };
};

```


// 标准的SPA 配置 ....  
```javascript
import { createApp } from "./app";

const { app, router , store } = createApp();
router.onReady(() => {
  app.$mount("#app");
});
// 这句不是特别懂, 在vue-server-render 中有提到 
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

```


// SSR 入口 的配置 
```javascript
import Vue from "vue";
import { createApp } from "./app";

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    // 模拟 Router 进行 跳转页面
    router.push(context.url);
    // 等待这个页面跳转完成
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 如果匹配不到路由,则直接失败并且返回404
      if (!matchedComponents.length) {
        return reject({
          code: 404
        });
      }
      // 对所有匹配上的组件 调用他们的 asyncData () 函数
      Promise.all(
        matchedComponents.map(async component => {
          if (component.asyncData) {
            const res = await component.asyncData({
              router: router.currentRoute,
              store
            });
            // 将 asyncData 返回的值 自动转换成 计算属性 
            Object.keys(res).forEach(k => {
              component.computed[k] = function (){
                return res[k]
              }
            });
            console.log(component.computed)
            return res;
          }
        })
      )
        .then(() => {
          context.state = store.state;
          // Router 跳转成功
          resolve(app);
        })
        .catch(reject);
    }, resolve);
  });
};

```


然后我们再来看 webpack(SSR) 配置部分 , SPA 部分的就省略了  

```javascript 

const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.js')

const config = {
  target: 'node',

  entry: path.resolve(__dirname, '../entry/entry-server.js'),

  output: {
    libraryExport: 'default',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../server/build/'),
    filename: 'built-server-bundle.js'
  }
}

const resultConfig = merge(baseConfig, config)

module.exports = resultConfig

```


之后就是我们的 server 端代码, 也就是koa和vue-server-render部分 
```javascript
const koa = require("koa");
const router = require("koa-router")();
const Vue = require("vue");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const defaultConfig = require("./config/defaultConfig");
const bundle = require("./build/built-server-bundle.js");
const ssrRender = require("vue-server-renderer").createRenderer({
  template: fs
    .readFileSync(path.resolve(__dirname, "../public/index.html"))
    .toString()
});
const app = new koa();
router.get("/*", async ctx => {
  const context = {
    title: "NxxCli测试",
    url: ctx.url
  };
  await bundle(context)
    .then(app => {
        // 将 vue component 挂载至 APP 组件上并渲染成字符串返回 
      ssrRender.renderToString(app, context, (err, html) => {
        if (err) {
          if (err.code === 404) {
            ctx.status = 404;
          } else {
            ctx.status = 500;
          }
        }
        return (ctx.body = html);
      });
    })
    .catch(err => {
      if (err.code === 404) {
        ctx.status = 404;
      } else {
        ctx.status = 500;
      }
    });
});
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(defaultConfig.port, () => {
  console.log(
    `----------------------------------------------------------------`
  );
  console.log(
    `sever running on port --> ${chalk.blueBright(defaultConfig.port)}`
  );
  console.log(
    `click here ` + chalk.blueBright(`http://localhost:${defaultConfig.port}/`)
  );
});


```



最后就是我们的vue代码了 
```javascript
<template>
  <div>
    <h1>orderlist page</h1>
    {{ arr }}
    <item></item>
  </div>
</template>

<script>
import item from './components/item.vue';
export default {
  title : '我的订单' , 
  components:{
    item 
  }, 
  data () {
    return {
      count: 0
    }
  },
  async asyncData({ store, router }) {
      return {
          arr : [1,2,3]
      }
  },
  computed: {
    orderlist: function() {
      return this.$store.state.orderlist;
    }
  },
  //事件处理没用
  methods: {
   increment (){
     console.log('点击了 increment  ,,,,, ')
     this.count ++
   }
  }
};
</script>

<style>
</style>

```




这个东西也算是花了一点时间吧 ... 也有很多不懂的东西忙活了很久, 去网上找结果呢,大多都找不到,表达的也不是很清楚, 去github上
有看不懂别人提的issuse , 唉  太难了 


<hr>

当然问题还存在很多,尚未解决的地方,这里我也是感觉有几个地方  
1. 不知道为何 , 事件处理无效,也不知道如何解决 
2. slots 这个东西还需尝试一下 
3. $emit 父子组件传值这方面不知道是否顺利 
4. 之后自己还可以去尝试尝试 流式渲染  



好了 . 差不多是这样了吧 , 

github : 源码 : [NxxCli](https://github.com/xiangxinji/NxxCli)

有时间在康康  OK !!! 手动狗头
