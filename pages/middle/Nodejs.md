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


## Buffer
```javascript

/**
 * 
 * 
 *  Buffer : 在引入 TypedArray 之前，JavaScript 语言没有用于读取或操作二进制数据流的机制。 
 * 
 */
//开创空间并且填充 
console.log(Buffer.alloc(10, 1))

// 开创空间但不填充 
console.log(Buffer.allocUnsafe(10))

// 获取字节长度
console.log(Buffer.byteLength('向歆纪'))

// 将字符串转成buffer 
console.log(Buffer.from('向歆纪'))

const b1 = Buffer.from('向')

const b2 = Buffer.from('歆')

const b3 = Buffer.from('纪')

console.log(Buffer.concat([b1,b2,b3]).toString())

const buf = Buffer.alloc(10)
buf.fill('this is a 向歆纪')
console.log(buf.toString())


```
## event 事件

```javascript
const EventEmitter = require("events");


class MyEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.name = "张三";
  }
}

const me = new MyEventEmitter();
me.on("change", function  () {
  console.log(this);
});

me.emit("change");



me.once('change' , () => {
    console.log('只会执行一次')
})

me.on('error' , (err) =>{
    console.log(err)
})

me.emit('error' , new Error("错误了"))


// 删除监听 removeListener 

```


## fs 文件系统 
```javascript
const fs = require("fs");

 // *  nodejs 中使用异步操作可能更好 , 利用 异步架构的优势

fs.readFile('./fs.module.example.js' ,'utf-8', (err , data) => {
    if (err) throw err
    console.log(data)
})

fs.writeFile('./readme.txt' , 'this is test code ' , err =>{
    if (err) throw err
    console.log('writer done !!!')
})


fs.stat('./readme.txt' ,(err , stat) => {
    if (err ) throw err 
    console.log(stat.isDirectory())
    console.log(stat.isFile())
})

fs.rename('./readme.txt' , './r2.txt' , err => {
    if (err) throw err 
})

 
// 操作平台可能有差异
fs.watch(
  "./fs.module.example.js",
  {
    // 开启深度监听
    recursive: true
  },
  (eventType , filename) => {
      console.log(eventType)
  }
);

```