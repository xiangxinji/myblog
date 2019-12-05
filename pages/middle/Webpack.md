
# Webpack(4.0)
<img :src="$withBase('/images/webpack.jpg')" alt="Vue">



### Code Splitting  (代码拆分)

Code Splitting 与 webpack 无关   , 实现代码拆分有很多种形式  

1.  手动加载 第三方依赖的入口文件,进行打包 

   ```javascript
   entry:{
     lodash : '../src/lodash.js' ,  // 这里引入了lodash 并赋值给 window对象,  那么webpack 会先打包								// 出这个入口文件 , 然后再去打包index.js , 至此就完成了第一种区							  // 分打包
     main : '../src/index.js' // 业务逻辑的入口文件 
   }
   ```

2. 同步加载

   ```javascript
    import _ from 'lodash' ; // 1. 同步加载第三方模块 
    // _.xx()   

   ```

   然后在webpack配置

   ```javascript
   module.exports = {
     optimization : {
       splitChunks : {
         chunks : 'all' ,   // 让同步模块和异步模块都进行代码分离 
       }
     } 
   }
   ```



### optimization.splitChunks  配置 

```javasciprt
module.exports = {
  optimization : {
    splitChunks : {
      chunks : 'async' ,   // 异步模块进行代码分离
      // 默认值async,all:异步|同步模块都进行代码分离,initial 同步模块
      minSize : 30000 ,  // 模块必须大于30000字节才会进行代码分离
      maxSize : 0  ,	// 生成代码块的最大大小,如果此模块大于这个maxSize 那么他可能会进行二次拆分 
      minChunks : 1 , // 打包之后的Chunk引用此模块时 Chunk引用此模块数 >=minChunks 才会对此模块进行代码分割 
      maxAsyncRequests : 5 , // 按需加载时并行请求的最大数量。
      maxInitialRequests:3 , // 入口文件的模块最大拆分数  
      automaticNameDelimiter : '~' , //拆分文件名的默认连接符
      name : true , // 分割块的名称。提供true将根据块和缓存组键自动生成名称。
      cacheGroups: { // 缓存组
       	 vendors : {	// vendor组
           	 test: /[\\/]node_modules[\\/]/, // 匹配处于node_modules中的模块
          	 priority: -10	// 优先级   数值越大越高
          	 filename : 'vendor.js'
       	 },
       	 default : {	// 默认组 
       	 	priority : -20 , // 优先级 
       	 	reuseExistingChunk : true ,   //  如果当前块包含已经从主包中分离出来的模块，那么它将被重用，而不是生成一个新的模块。这可能会影响块的结果文件名。
       	 	filename : 'default.js'
       	 }	
      }
    }
  } 
}
```

### 懒加载

```javascript
当webpack 遇到异步加载模块时,webpack会进行懒加载来提升性能,什么时候加载关机键点在于什么时候引入此模块
vue 中的router  就是通过异步加载模块来让webpack进行懒加载功能



// chunk : 当webapck 打包出来之后 ,每有一个文件就算一个chunk 
```

### 分析工具

webpack 官方提供了非常多的分析工具，来分析打包的过程和结果 

首先得得到一个分析结果文件  。 一般叫做 state.json 

webpack --profile --json > stats.json   

官方推荐分析工具、网站

https://webpack.js.org/guides/code-splitting/#bundle-analysis

### Prefetching/Preloading modules (空闲加载/预加载) 模块 

webpack配置文件中 

```javascript
optimization:{
  splitChunks : {
    chunks : 'async'  // async 为默认值 
  }
}
```

webpack 比较推荐的方式是 异步加载 ， 因为只需要加载可使用的模块

(空闲加载/预加载) 模块  这个的用处在于 ， 当一个异步模块更换他的加载方式时，可以使用空闲加载此异步模块，还是预加载异步模块

在webpack中可以使用魔法注释来完成空闲加载/预加载 异步模块

例: 

```javascript
// 此异步模块会进行空闲加载 
const { handleClick: fun } = await import(/* webpackPrefetch: true */'./click.js')

// 此异步模块会进行预先加载 
const { handleClick: fun } = await import(/* webpackPreload: true */'./click.js')

```

具体文档 ： https://webpack.js.org/guides/code-splitting/#bundle-analysis

可以查看chrome开发者工具中的 coverage 来查看代码的利用率 ，  通常来说， 代码利用率越高，网页性能越好 



### 缓存 

对于webpack来说,可以使用 [contenthash] 来进行缓存管理 , 如果代码没有进行改变的话,hash不会变化 

```javascript
output:{
  filename : 'main[contenthash].js',
  chunkFilename : '[name][contenthash].js'
}
```

在老版本的webpack中 入口chunk 可能每次对应的contenthash 可能不一样,因为webpack默认将运行时的代码放入入口chunk中,这些运行时的代码可能每次运行都不一样 , 所以才导致入口chunk 每次对应的contenthash不一样解决这个问题:

```javascript
optimization : {
  runtimeChunk : {
    name : 'runtime' ;
  }
}
```





### Shimming 

用来处理兼容问题 . .

```javascript
// 当你使用 _ 对象时 , webpack 会去使用 loadsh 中的模块对象  
new webpack.ProvidePlugin({
       _: 'lodash'
 })
```



## HMR 

HMR (hot module replacement ) 热模块替换

webpack 有两种方式来开启开发服务器 

1. WDS 
2. WDM 

WDS : 通过webpack-dev-server 这个插件来运行开发服务器,此时只要代码有改动,前端的html页面就会自动刷新

WDM : 通过自己给nodejs服务器加上webpack-dev-middleware 的中间件来进行文件监听,并刷新

WDM 相对于 WDS 来说的话,WDM的自定义性更高,因为我们可以在自己的nodejs服务器里做出其他更多的事情 

WDM原理 : WDM 将webpack输出的文件以json格式传输给服务器,来完成文件监听  






## 文件指纹

文件指纹一般用于版本管理 

1. hash : 项目相关,只要项目文件有修改,hash值就会改变
2. chunkhash : 和webpack打包的chunk有关,不同的entry 会生成不同的chunk值
3. contenthash : 根据文件内容定义hash 





## 文件压缩 

webpack4 自带js压缩,他是通过  uglifyjs-webpack-plugin  这一个插件来进行js压缩的,默认是串行压缩 

css压缩呢,需要利用 optimize-css-assets-webpack-plugin  插件和另外一个依赖 cssnano 来进行css 压缩 

html 压缩就是 html-webpack-plugin 来进行html压缩





## css3 自动补齐前缀 

依赖: post-cssloader + autoprefixer 插件 

里面配置的browsers 可以设置要兼容的浏览器范围





## 自动REM转换(移动端)

依赖: px2remloader + lib-flexible 





## 静态资源内联

可以使用raw-loader 来内联html 和 js 

css内联 : 使用html-inline-css-webpack-plugin  





## 打包多页面

好处是: 解耦合,利于seo 

利用 glob 库来读取文件并动态生成 webpack.config 的entry 入口 和 html-webpack-plugin 来进行多页面打包 





## source-map 

源代码映射: 开发环境一般开启,生产环境直接关闭 





## 提取公共资源

一些基础库: 可以利用html-webpack-externals-plugins 来选择不打包这些公共库,但是可以让他们去cdn 里面加载 

还有一种方式就是利用 splitChunksPlugin 





## TreeShaking 

TressShaking 摇树优化, (commonjs 不支持) 他的原理是DCE 

DCE 有三点 

1. 代码不可达
2. 结果不被用到
3. 变量只写不读

production 模式 默认开启  





## ScopeHoisting 

在开发环境,默认webpack会进行大量的闭包来进行模块的导入及导出操作,ScopeHoisting 可以减少使构建出的函数申明代码和内存开销

production 模式默认开启 





## 懒加载JS的方式

commonjs : require.ensure  

es6: 动态import 需要babel 插件 来支持这样的语法 





 ## 打包一个自己的组件和库

一般的组件和库有两个版本,一个是压缩版,一个是非压缩版,通常情况下是非生产环境下使用非压缩版,生产环境下使用压缩版,

通过配置target: umd , 来支持 amd, cjs , es模块, script 标签 

通过设置library 等相关配置 

然后利用TerserPlugin 插件来进行匹配压缩 , 例如只压缩 .min.js 结尾的文件 





## SSR 空缺





## 优化构建日志

通过stats设置来完成统计信息的过滤 , 一般使用  'errors-only'  或者  'minimal'  

然后借助  friendly-errors-webpack-plugin  这个插件来进行友好的信息提示 .

然后还可以通过自己编写 一个小插件来绑定webpack打包完成的事件来进行自定义操作 





## 打包速度分析 

利用  speed-measure-webpack-plugin  插件 来进行打包速度分析 

```javascript
// 实例化插件
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap({
	entry : '..xxx',
    output : 'xxx'
})
```





## 多进程多实例构建

利用官方推出的 thread-loader , 当然也有其他第三方的多线程构建插件,就是HappyPack , webpack 官方推荐thread-loader来进行多实例构建 

 把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker 池(worker pool)中运行 

[官方文档](https://www.webpackjs.com/loaders/thread-loader/ )





## 多进程多实例压缩

利用  terser-webpack-plugin    开启 parallel 参数 （推荐使用这个，支持 ES6 语法压缩） , 当然还有其他的插件, 例如 parallel-uglify-plugin  ,  uglifyjs-webpack-plugin  等 

```javascript
optimization: {
    minimizer: [
       new TerserPlugin({
         parallel: 4
       })
   ]
}
```



## DLL 打包 

dll 类似于将你想要的模块放入一个公共仓库,然后打包的时候就直接去这个公共仓库里面取

想要完成dll 打包 得先完成两步

1. 写一个webpack.dll.js 来生成 manifest.json文件和仓库js
2. 在你要构建的主文件加入这个dll插件(和生成dll的插件不是同一个)

示例

生成manifest.json 文件如下 

```javascript
const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    resolve: {
        resolver: {
            'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
        }
    },
    entry: {
        // 要生成的模块为 vendor , 里面包含 vue和lodash 模块 
        vendor: [
            'vue',
            'lodash'
        ]
    },
    // 生成的 仓库 js 为 vendor.dll.js
    output: {
        filename: '[name].dll.js',
        // 将仓库文件存放至 .... 
        path: path.join(__dirname, '../dll/librarys'),
        // library 名字为 vendor 
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            // 生成mainifest.json 文件的位置 
            path: path.join(__dirname, '../dll/manifest.json')
        })
    ]
}
```

然后在主文件中加入此插件 

```javascript
  new webpack.DllReferencePlugin({
            // 引用的上下文 
      		context:path.join(__dirname , '../' , 'dll/'),
            // 基于上下文去找vendor.dll.js
      		name : 'vendor' ,
      		// 引入js
            manifest: require('../dll/manifest.json')
      }),
```





## 缓存构建

缓存构建就是将第一次构建的一些东西缓存起来 , 缓存目录为 node_modules 中的 .cache 文件夹中 

缓存构建分为三种构建 

1. babel 转换缓存
2. terser-webpack-plugin  压缩缓存 
3. hard-source-webpack-plugin  业务模块缓存 

一个一个来: 

babel缓存 

```javascript
{
   loader: "babel-loader",
   options: {
         presets: ['@babel/preset-env'],
         cacheDirectory: true // 开启缓存
	}
}
```

terser 缓存

```javascript
 optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: 4,
                cache: true // 开启缓存
            })
        ]
    },
```

业务缓存

加入这个插件即可

```javascript
 plugins:[
 	new HardSourceWebpackPlugin()    
 ]
```


## 图片压缩 
虽然有url-loader 来完成指定大小内图片将转为base64.但是在大图片的情况下 我们还是希望能自动化的完成图片压缩 
在教程上面看的使用 imagemin-webpack-plugin 这个插件来完成这个自动化功能, 但是本人试的时候不仅没效果还贼慢,估计是碰到坑了 , 所以转念换了另外一个方式 
.使用 image-webpack-loader  

下面直接看代码

首先安装image-webpack-loader  
```bash
npm i -D image-webpack-loader
```
载入配置
```javascript
        {
                test: /\.(png|svg|jpeg|jpg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50000,
                            name: 'images/[name]_[hash].[ext]'
                        }
                    },
                    {
                        loader: "image-webpack-loader" ,
                        options: {
                            bypassOnDebug :true
                        }
                    }
                ]
}
```
此时  image-webpack-loader 就会自动将图片进行压缩,并且好像会存放至image 目录中 

End


## CSSTreeShaking 
抹除没有用到的css 

日常第一步 安装
```bash
    npm i -D glob-all purify-css purifycss-webpack 
```
然后就开始配置 添加这个插件  
```javascript 
 new PurifyCSS({
        // 读取 src下面的 所有的html 和 所有的js , 来扫描是否使用到了这个css 选择器 
    paths: glob.sync([
             path.join(__dirname , '../' , 'src/*/*.html') ,
             path.join(__dirname , '../' , 'src/*/*.js')
    ])
 })
```
稍微注意一下的是, 如果配置错误,你打包出来的css 将会没有内容 
End 


## 动态polyfill
让babel-core 解决 es6箭头函数 等等语法问题 , 然后使用动态polyfill 来根据浏览器的User-Agent 来进行自动获取polyfill 

其实就是一段script 标签, 然后我们使用 阿里 提供的  

```html
<script src="https://polyfill.alicdn.com/polyfill.min.js?features=Promise%2CArray.prototype.includes"></script>
``` 

他们采用features 来控制你需要的polifll 兼容, 如果不传默认 就默认全局polyfll













