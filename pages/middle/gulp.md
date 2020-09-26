

# gulp 
一个基于 stream (流) 的构建工具  [官方网站](https://www.gulpjs.com.cn/)

## install  
安装gulp 
```bash
npm install --global gulp-cli
```
局部安装
```bash
npm install --save-dev gulp
```


## 基本使用 
使用文件 , 创建 gulpfile.js 并创建一个任务  
```javascript
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
```


然后在终端使用yarn run build -> 执行gulp  , 并启动这个任务 





## 任务 
每个 gulp 任务（task）都是一个异步的 JavaScript 函数，此函数是一个可以接收 callback 作为参数的函数，或者是一个返回 stream、promise、event emitter、child process 或 observable (后面会详细讲解) 类型值的函数。由于某些平台的限制而不支持异步任务，因此 gulp 还提供了一个漂亮 替代品。

运行多个任务 
```js
const { series }  =  require('gulp')

function jsTask (cb) {
    console.log('running js task')
    cb()
}
function assetTask (cb) {
    console.log('running asset taks ')
    cb()
}
exports.default = series([
    jsTask ,
    assetTask
])

```

## 串行和并行
series 串行 ,  parallel 并行 

eries() 和 parallel() 可以被嵌套到任意深度。




## 完成通知
可以使用很多种方式来告诉 gulp 当前任务已经完成   [doc](https://www.gulpjs.com.cn/docs/getting-started/async-completion/#%E4%BB%BB%E5%8A%A1%EF%BC%88task%EF%BC%89%E5%AE%8C%E6%88%90%E9%80%9A%E7%9F%A5)
例如 callback()
```js

const { src , dest , series  }  =  require('gulp')

function javascriptTask (cb) {
    // 将src中的*.js 通过流 给 转移到 dist 目录中
    src('src/*.js').pipe(dest('./dist'))
    cb()
}

exports.default = series ([
    javascriptTask
])

```


## 处理文件 

将刚刚的配置文件中的javascriptTask 方法稍加改造,就完成了文件压缩功能
```js
function javascriptTask (cb) {
    // 通过gulp-uglify 插件直接将文件压缩后输出给 dest
    src('src/**/*.js').pipe(uglify()).pipe(dest('./dist'))
    cb()
}
```

**分段写出**

```js
const uglify = require('gulp-uglify')
const del = require('del')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const {src, dest, series} = require('gulp')

// 删除 dist 目录之后, 进行下一步任务
function deleteDest(cb) {
    del.sync('./dist')
    cb()
}

function javascriptTask(cb) {
    /*

        使用了 多个 src 将 js 文件加入缓冲区 
    */
    return src('src/*.js')
        .pipe(src('src/vendor/*.js'))
        .pipe(dest('./dist')) // 在此输出源码 ... 不带压缩的
        .pipe(babel())  // 通过babel 编译 
        .pipe(uglify()) // 进行压缩 
        .pipe(rename({extname: '.min.js'})) // 更改这些名称
        .pipe(dest('./dist')) // 输出至 dist 

}

exports.default = series([
    deleteDest,
    javascriptTask
])

```

## 使用插件 

Gulp 插件实质上是 Node 转换流（Transform Streams），它封装了通过管道（pipeline）转换文件的常见功能，通常是使用 .pipe() 方法并放在 src() 和 dest() 之间。他们可以更改经过流（stream）的每个文件的文件名、元数据或文件内容。

托管在 npm 上的插件 - 标记有 "gulpplugin" 和 "gulpfriendly" 关键词 - 可以在 插件搜索页面 上浏览和搜索。

每个插件应当只完成必要的工作，因此你可以把它们像构建块一样连接在一起。获得想要的结果可能需要把一组插件组合在一起使用。





## 完成较为完整的实例










