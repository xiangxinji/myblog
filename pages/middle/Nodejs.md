# Nodejs

<img :src="$withBase('/images/nodejs.jpg')" alt="Vue">

[Nodejs中文文档](http://nodejs.cn)

## 基础知识 

### path 
```javascript
const {
    basename,
    delimiter,
    dirname,
    extname, 
    parse,
    format,
    join,
    normalize,
    resolve,
    sep
} = require('path');

const filepath = '\\usr\\desktop\\bin\\a.png' 

console.log('basename : ' + basename(filepath))
console.log('平台界定符 : ' + delimiter)
console.log('dirname : ' , dirname(filepath) )
console.log('extname : ' , extname(filepath)  )
console.log('parse : ' , parse(filepath))
console.log('format : ' , format( parse(filepath)))
console.log('join : ' , join('../' , filepath))
console.log('normalize : ' , normalize(filepath))
console.log('resolve : ' , resolve(__dirname) )
console.log('sep' , sep )
```

### process
```javascript
const { argv , argv0 , cwd , config , env } = require('process')



// 官方解释 : 当 Node.js 进程因以下原因之一即将退出时，则会触发 'exit' 事件： 
process.on('exit', code => {
    console.log(code) 
})




//  属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。
// bin :  node .\app.js --open --debug
console.log(argv)
console.log(argv0)

// 其中包含用于编译当前 Node.js 可执行文件的配置选项的 JavaScript 表示形式
console.log(config)


console.log(cwd())

// 属性返回包含用户环境的对象
console.log(env )


process.nextTick(() => {
    // 放在当前进程队列的最后执行 
    console.log('放在当前进程队列的最后执行')
})
setTimeout(() => {
    console.log('middle')
})
setImmediate(() => {
    // 放在下一个进程第一个执行
    console.log('放在下一个进程第一个执行')
})
```

:::tip
   目前保持着一个疑问 ???
   
   就是path 可以获取当前执行node命令的目录, 那么 npm run scripts 去执行这个脚本的时候,path 模块又该显示的目录为什么呢??? 
      
:::

### 解答 
```
    当前目录如下 
    cli 命令行源码文件
    cli-test 测试文件 , link了 cli 项目 
    cli中去执行命令 npm run 时 process.cwd() 返回的是 本身目录 
    但是在cli-test中使用npm run cli 时, cli项目中的源码文件显示的是 cli-test 的目录
    
```