

# 代理模式 
先一句点通, 代理模式是为一个对象提供一个代用品或者占位符,以便于控制对他的访问. 然后我们来实现一个代理模式 
```typescript 

class Person {
    name : string ; 
    constructor (name :string ) {
        this.name = name 
    }
}

// 申明一个工厂类,那么在这个工厂类里面呢,可以购买, 传入给我一个person 对象 
// 我会吧商品卖个这个人 
class Factory {
    public buyOut (p :Person ) {
        console.log('我是厂家, 我卖出了一个商品 , 卖给了' + p.name)
        return true 
    }
}

```
然后呢 我们觉得工厂太远了,需要就近去买,虽然这样子听上去也不是特别靠谱^_^,但是反正就是 可以给你两种选择,你可以自由的切换去使用代理或者是直接访问本体..  
好 !! ... 然后我们这里建造了一个商店 


```typescript
class Store {
    // 假装是现在几点钟 
    TIME : number = 7 ;     
    public buyOut (p : Person) {
        /**
         * store 的buyout代理到了 factory 里面
         * 代理保护 
         */
        if (this.TIME >= 9 && this.TIME <= 18) {
            // 当时间满足这个条件的时候, 可以让 商店老板去工厂买 然后给我 
            new Factory().buyOut(p)
            return true 
        }else {
            // 但是如果不满足的话, 就 sorry 了 
            console.error(p.name + '你好,由于进货工厂工作时间为:上午9点~下午6点,所以购买失败')
            return false 
        }
        
    }
}
```


然后是我们的使用代码 ... 

```typescript
const fac = new Factory()
const sto = new Store () 

fac.buyOut(new Person( "张三"))
sto.buyOut(new Person( "李四"))
 

// 输出结果如下 

/**
    我是厂家, 我卖出了一个商品 , 卖给了张三
    李四你好,由于进货工厂工作时间为:上午9点~下午6点,所以购买失败
 */
```

其实从这里可以看出来 , Store 类给 Factory 加上了一层保护, 但是这个保护并不是直接的,也就是说这个保护在直接访问Facotry 是不起作用的 , 也就是说 我们多了一种选择 
,我们既可以使用原生Factory 也 可以使用保护Factory 的 代理 Store ..


### 代理保护
其实刚刚我们说的就是代理保护, 我们可以使用一层代理去保护原生的操作,但是有留有访问的空间,我们可以利用这个特性去做一些操作的 扩展 等等.. 


<hr>

### 代理和本体接口的一致性
也就是说,负责代理的 Store 和 原生的 Factory 他们之间拥有一样的操作接口,这样的话, 我们就不需要为 操作接口进行发愁 , 例如 他们都是 buyout 方法 

<hr>

### 缓存代理 
这个的意思无非是将一些 原生的 Factory 执行的一些结果进行 暂时保存, 然后我们使用某些措施来让使用者不需要一定调用这个 Factory 得到结果 

<hr>

### 虚拟代理 


// 还有一些 虚拟代理什么的自己还不是特别清楚,这个之后慢慢来 

// 还是有很多优秀的文章记录着这些模式 

[js 设计模式——代理模式](https://www.cnblogs.com/loveyt/p/11410593.html)


