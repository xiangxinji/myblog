

# 设计模式 





## 工厂模式 

简单工厂模式 : 使用一个工具方法来进行一个类的实例化, 这样可以封装出这个实例化的操作, 也可以做一些数据的预设... 等等

```javascript 
class Person {
    constructor (name , age ) {
        
    }
}
// 实例化方式1 , 直接 new 出来 
const p = new Person('张三' , 0) 
const p2 = new Person('李四' , 0 )
// 我们每次都需要将 0 岁给传进去, 很麻烦,所以我们定义一个工厂方法
function getPersonInstance (name) {
    return new Person(name , 0)
}
// 使用
const p3 = getPersonInstance('张三')
const p4 = getPersonInstance('李四')
```



## 单例模式 

单例模式: 只能允许一个类有一个实例 ,这种模式比较适用于某些类他处于公共并且状态必须都统一的类

```javascript
class Theme {
   setPrimaryColor (color) {
       this.primaryColor = color 
   }
   getPrimaryColor () {
       return this.primaryColor 
   }
}
Theme.getThemeInstance = (function () {
    let themeInstance = null
    return function () {
        if(themeInstance === null){
            themeInstance = new Theme()
        }
        return themeInstance 
    }
})()
// 我们页面使用的使用, 在任何地方设置主题就可以这样 
const t = Theme.getThemInstance() 
t.setPrimaryColor('red') 
const primaryColor = t.getPrimaryColor()
```



## 适配器模式

适配器模式: 这个模式在JS 中主要是针对于那些不符合标准的解决方案 , 如在uniapp中的ajax请求 : 

```javascript
// 使用方法大致如下 
const url = 'https://www.baidu.com'  
uni.$ajax({
    url, 
    method : 'get'
})
// 但是我们需要适配出Promise 的方案
const $ajax = function (url , configs) {
    return new Promsise((resolve , reject) => {
        uni.$ajax({
            url , 
            success (response) {
				resolve(response)
            }
        })
    })
}
```



## 装饰器模式

装饰器模式: 在原有功能(且这个原有功能是可以正常使用的)上进行扩展某些功能 

```javascript
// 如果有一个编辑器 
class Editor {
    constructor ( content ){
        this.content = content 
    }
    getKeyWord () {
        return this.content.split(/\s/i)
    }  
}
class KeyWord {
    constructor (editor , keyColors , defaultTextColor = '#ccc'){
        this.editor = editor
        this.keyColors = keyColors 
        this.defaultTextColor = defaultTextColor
    }
    
    // 找到对应的单词, 并且加上颜色, 颜色为 keyColors 对应的映射关系 
    addKeyColor () {
        const words = this.editor.getKeyWord () 
        this.words.map(item => {
            return { color : this.keyColors[item] || this.defaultTextColor ,  word }
        })
    }
}

const editor = new Editor('function a () {}')
const map = new Map()
map.set('function' , 'color') 
map.set('const' , 'red')
const kw = new KeyWord(editor , map)
const words = kw.addKeyColor()
const render = () => {
    return words.map(({ color , word}) => {
        return <text style={{ color}}>{ word }</text>
    })
}

```





## 观察者模式 

观察者模式 : 先收集依赖,  然后再统一进行通知 

```javascript
class Dom {
    constuctor () {
        this.clickCallbacks = [] 
    }
    addClickEvent (callback) {
        this.clickCallbacks.push(callback)
    }
    click ($event) {
        this.clickCallbacks.forEach(callback =>{
            if(typeof callback === 'function') callback($event)
        })
    }
}
const d = new Dom()
t.addClickEvent(($event) => {
    console.log(1)
})
t.addClickEvent(($event) => {d
    console.log(2)
})
t.click()
```







## 代理模式 

代理模式 : 进行某些功能限制和封装 , 而且必须得符合之前原有的标准,好处在于他可以定义不同方法的不同限制方式

```javascript
// 进行路由跳转 
class Router {
    push(url , params ) {
        // ... 
    }
    replace(url , params ) {
        // ... 
    }
}
class RouterByAuth {
    constructor () {
        this.router = new Router () 
    }
    push(url , params) {
        // 1. 判断你是否有这个权限 
       	 if(this.auth()) {
             this.router.push(url , params)
         }
    }
    replace (url , params ) {
        if(this.auth()) {
            this.router.replace(url , params)
        }
    }
    
    auth () {
        const flag = false 
        if(flag) {
			return true 
        }else{
             throw new Error('你没有这个权限进入这个页面')
         }
    }
}

```





## 迭代器模式 

迭代器模式: 让我们不管数据结构是什么,然后我们只需要进行一个一个像版本一样迭代下去 .. (ES6 中有 Iterator 接口, 凡是实现了这个接口的类,都可以直接进行for of 遍历)

```javascript
const map = new Map()
map.set('a' , 1)
map.set('b' , 2)
for(const item of map) {
	console.log(item[0] , item[1])
}
```







## 状态模式 (有限状态机)

总的来说就是以状态为主体 

```javascript
class State {
   	constructor (color) {
        this.color = color 
    }
  	apply (machine) {
        machine.handle(this)
    }
}
class Machine {
    constructor (state) {
        this.state = state || null 
    }
	handle(state) {
        this.state = state || this.state 
        console.log('当前颜色为:' , this.state.color) 
    }
}

const red = new State('red')
const green = new State('green')
const yellow = new State('yellow')
const machine = new Machine()
// 切换为 红灯 
red.apply(machine) 
// 切换为 绿灯
green.apply(machine)
// 切换为 黄灯
yellow.apply(machine)

```





## 策略模式

策略模式: 每一个环节都有一个自己的策略, 这个叫做策略模式 

```javascript
const order = {
    state : 0 , // 0 默认状态 ,  1 即将超时 , 2 已经超时
}
const strates = {
    0 : function (order) {
        // 当前订单默认状态, 无需额外操作 
        // running ... 
    },
    1 : function (order){
        // 提醒用户,当前订单即将超时 , 提醒用户赶紧支付 
        // running  
    },
    2 : function (order) {
        // 提醒用户di,当前订单已经超时 , 不能支付了 ... 
       	// running 
    }
}
```







