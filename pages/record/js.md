


# javascript


## event中target和currentTarget 的区别
在事件对象event中 target 表示你当前绑定的元素 , 而 currentTarget 则是你绑定事件的那个元素 

可以使用event.target 进行事件委托


## event.stopImmediatePropagation()
event.stopImmediatePropagation() 方法阻止剩下的事件处理程序被执行。

该方法阻止事件在 DOM 树中向上冒泡。

使用 event.isImmediatePropagationStopped() 方法来检查指定的事件上是否调用了该方法。


## Element.getBoundingClientRect() 
[MDN DOC](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

getBoundingClientRect dom方法, 该方法返回DOMRect对象,其中包含了盒子大小和相对于浏览器窗口中的位置 
```
{
    width: 1000
    height: 148
    left: 200
    right: 1200
    top: 153
    bottom: 301
    x: 200
    y: 153
}
```

## Element contains() 方法
contains()方法返回一个布尔值，指示节点是否是指定节点的后代。后代可以是孩子，孙子，曾孙等等。


## Array.prototype.flat 方法
flat() 函數以遞迴方式將特定深度的子陣列重新串接成為一新的陣列
depth 深度, 如果是Infinity 将会将一颗树给转换成新的数组 
```js
var newArray = arr.flat([depth]);
```


## Array.prototype.flatMap 方法
flatMap() 方法会在flat 的基础上会执行一个handler函数 , 相当于map ,会返回一段新的数组 
,并且他与flat 不一样的是,他只能转换一层
```js
var newArra = arr.flatMap((item) => [item , item * 2])
```
```js
const arr = [1,2,3,4,5]
const newArr = arr.flatMap(item => [item,item * 2]) // [1,1,2,4,3,6,4,8,5,10]
```


## DocumentFragment
[MDN DOC](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)
DocumentFragment，文档片段接口，一个没有父对象的最小文档对象。

它被作为一个轻量版的 Document 使用，就像标准的document一样，存储由节点（nodes）组成的文档结构。与document相比，最大的区别是DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题。

## window.postMessage
window.postMessage() 方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为https），端口号（443为https的默认值），以及主机  (两个页面的模数 Document.domain设置为相同的值) 时，这两个脚本才能相互通信。
```
otherWindow.postMessage(message, targetOrigin, [transfer]);
```
[MDN DOC](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

目标 window 可以使用 message 事件来接受 message 
```js
window.addEventListener('message' , (event) =>{
    console.log(event.data)
})
```


## Object.create 
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请打开浏览器控制台以查看运行结果。）

你传入的对象会变成新对象的__proto__ 属性, 相当于原型继承

```
Object.create(proto,[propertiesObject])
```
[MDN DOC](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)



## Object.freeze / Object.isFrozen 

Object.freeze 冻结一个对象， 一个被冻结的对象不能添加新的属性，不能删除旧的属性，不能修改该对象已有的属性的可枚举性，可配置性，可写性，以及不能修改y已有属性的值。
此外冻结一个对象，该对象的原型也不能被修改 。  freeze 返回和传入的参数相同的对象

Object.isFrozen 查看一个对象是否被冻结 

[MDN DOC Object.freeze](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

[MDN DOC Object.isFrozen](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)










