# babel 

首先我们要使用babel 可以去看看他的官网, 他有一个使用指南 , 然后就跟着他的使用指南直接使用 





## 基本使用

首先先安装

前面两个是必须的, 然后最后这个  preset-env 不是必须的 

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

安装之后我们使用 npx 去编译我们需要编译的js  ,就可以了 

```bash
npx babel main.js
```

然后我们运行一下 发现了一个问题 , 就是他并不会帮我们转换一些语法啊啥的, 他还是原封不动的进行输出了 

如 我们的代码如下 

```javascript
const a = () => 1 
```

输出依然是上面的代码... , 不是说bebel 可以完成ES的语法转换吗? 我们可以使用一些更高级的语法.. 但是为啥是这样...   

是因为 @babel/preset-env 的原因 , 首先先看看 bebel 是什么  



## babel 是什么 

引用官方的一句话 

> Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

现在我们知道了 babel 只是一个工具链而已, 负责各种转换功能的调度而已 , 那有什么可以帮我们先转到 ES5 的语法吗 ?    答案就是 @babel/preset-env 这个库 



@babel/preset-env 是一个 preset , 那有人会问了 , preset  是什么 ...



## preset 

preset 是一个插件的集合 , 里面包含了许多许多的插件 , 被封装起来了 , 至于这个 env 他就是负责一些我们常用的 ES5+ 的**语法**

**只是解析语法** 



好 然后我们使用 @babel/preset-env 这个库, 我们安装了这个库还不行 , 然后我们在我们根目录创建一个 .babelrc 文件 , 配置如下 

  ```json
{
    "presets": [
        [
            "@babel/env"  
        ]
    ]
}
  ```

使用这个 env 这个preset 

然后我们再进行编译  , 编译结果如下 

```javascript
"use strict";

var a = function a() {
  return 1;
};
```

可以看到这里已经成功将es6的箭头函数编译成了 function es5的形式  , 这样的话 低版本的浏览器就能认识这些代码了, 但是出现了另外一个问题 , 难道这就意味着我能随便使用 ES5+ 的东西了吗?  

答案 : 并不是 





## polyfill (补丁)

然后我们换一些代码 ...  如下  

```javascript
const mockingData = [
    { title : '真的假的??? ' , id : 1 } , 
    { title : '真的 ' , id : 2 } , 
]
const getData = () => new Promise((resolve , reject ) => {
    setTimeout(() => {
        resolve(mockingData)
    },1500)
})
getData().then(res =>{
    console.log(res)
})
```

然后我们去编译 , 编译结果如下 

```javascript
"use strict";

var mockingData = [{
  title: '真的假的??? ',
  id: 1
}, {
  title: '真的 ',
  id: 2
}];

var getData = function getData() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(mockingData);
    }, 1500);
  });
};

getData().then(function (res) {
  console.log(res);
});
```

我们发现 他并没有吧Promise 处理掉, 依然是 ES6的API  (**preset-env 只处理语法,不处理API**), 那怎么办呢 ?  

答案就是polyfill 啦.. 



然后我们安装polyfill 

```bash
npm install --save @babel/polyfill
```

并且更改 .babelrc 配置文件 , 如下 

```json
{
    "presets": [
        [
            "@babel/env" , 
            {
              "useBuiltIns" : "usage" ,
              "corejs" : 3
            }
        ]
    ]
}
```

这里我们使用了 useBuiltIns : 'usage' , 这里的意思是,babel会分析你使用到的API , 然后去动态加载, 但是这里有很严重的问题 , 我们还是用 npx 去编译一下, 结果如下




```javascript
require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.timers");
// 原先编译过后的代码 .... 
```

我们发现 , 他分析了我们的API 并且动态引入了一些模块 ...  , 但是问题来了. 我们浏览器能直接使用这些代码嘛.. 很明显不能 所以得出结论 **babel只负责编译,不负责模块化**

当然 , 老规矩, 上webpack  , 

..... // 安装babel-loader  等等, 配置下文件 等等 , 大致如下 

```javascript
'use strict';

const path = require('path');

module.exports = {
    mode : 'development' , 
    entry: './src/main.js',
    output: {
        path:path.resolve(__dirname , '../dist/'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test : /\.js$/ , 
                loader : 'babel-loader'
            }
        ]
    },
    resolve: {
    },
    devtool: 'source-map',
    plugins: [
    ]
};

```

然后我们进行重新构建, 输出目录, 在用一个html引用这个输出过后的JS , 我们就可以看效果了 .. 



首先我们从 can i use 网站上可以看到, IE11 是不支持Promise 的, 然后我们将网页运行在IE 上, 发现可以解析了 , 但是这又有一个问题出现了 ....  



这里会出现一个问题,  webpack 找不到 core-js 这个模块, 那这时候我们就得手动安装 core-js , 可以顺带着 regenerator-runtime , 把这个也安装 

```bash
npm i core-js 
```





## polyfill 的缺陷 

我们可以看看 IE11 的控制台 , 我们在控制台 输入 Promise , 发现他已经有一个函数了, 这证明我们的polyfill 已经成功注入了  

但是有一个问题 , 是啥呢 ?   答案就是 **polyfill 污染了全局作用域** 他的原理就是将自己实现的一套代码给动态注入到他属于的那个域里面去, 所以就产生了这个问题 ... 而且polyfill 已经被废弃 , 官方更推荐的是 runtime   



(多说一句)当然 有时候我们的 polyfill 会在远古浏览器上不生效,这是因为 targets 的默认值的问题 , 我们可以看看 

[browserslist](https://github.com/browserslist/browserslist)







## transform-runtime 

这里我们使用了 transform-runtime  , 首先我们来看看如何使用 

```bash
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
npm i @babel/runtime-corejs3 
```

@babel/runtime-corejs3  安装这个的原因是,编译之后的结果,引用了这个模块的东西,所以我们不能把它给安装带 dev 依赖中

.babelrc

```json
{
    "presets": [
        [
            "@babel/env" , 
        ]
    ],
    "plugins": [
        [
          "@babel/plugin-transform-runtime",
          {
            "absoluteRuntime": false,
            "corejs": 3,
            "helpers": true,
            "regenerator": true,
            "useESModules": false
          }
        ]
      ]
}
```

然后我们使用npx 去编译一下, 看看结果 , 结果如下

```javascript 
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var mockingData = [{
  title: '真的假的??? ',
  id: 1
}, {
  title: '真的 ',
  id: 2
}];

var getData = function getData() {
  return new _promise["default"](function (resolve, reject) {
    (0, _setTimeout2["default"])(function () {
      resolve(mockingData);
    }, 1500);
  });
};

getData().then(function (res) {
  console.log(res);
});
```



结果发现,他不是直接引入一个一个的模块, 而是将这些东西当做一些变量来处理了... , 那这样呢也就解决了我们的污染全局作用域的问题 

我们去IE11的控制台看看结果 , 输入Promise 发现 Promise未定义, 解决了这个问题 

 



 



