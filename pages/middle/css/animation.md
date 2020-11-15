# 动画 



## transition (过渡)



transition 是一个复合属性, 他用来完成一个元素从一个状态过渡到另外一个状态, 大多和 transform 一起使用, 但是transfrom 属于变化, 并不是一个动画属性 

兼容性 : 
IE >= 10 可以使用 , 如 safari 或 ios , android  可能需要增加浏览器标识前缀

他由以下几个属性组成 
```
transition-property 过渡属性名(默认为all) 
transition-duration 过渡持续时间(默认0s)
transition-time-function 过渡时间函数(默认ease)
transition-delay 过渡延迟时间 
```
**基本使用**
```html
<div id="box"></div>
```
```css
#box {
  width: 100px;
  height: 100px;
  background-color: red;
  /* 事先定义好 transform 属性的过渡 , 持续时间是1s , 时间函数式 ease */
  transition: transform 1s ease;
}
/*
    在hover 时修改 transform 触发 transition 过渡  
    transition 必须有一个触发条件 
*/
#box:hover {
  transform: rotate(120deg);
}
```

**transtion-property** 有多个属性需要记录的时候,使用 ',' 进行隔开 . 并且不是所有属性名都是可以记录的
可以记录的为: 
```
颜色: color background-color border-color outline-color
位置: backround-position left right top bottom
长度: 
    [1]max-height min-height max-width min-width height width
    [2]border-width margin padding outline-width outline-offset
    [3]font-size line-height text-indent vertical-align  
    [4]border-spacing letter-spacing word-spacing
数字: opacity visibility z-index font-weight zoom
组合: text-shadow transform box-shadow clip
其他: gradient
```
```css
#box{
    transition: transform,border-color 1s ease;
}
```



**transition-duration** 表示持续的时间 , 可用单位为: s , ms  . 并且如果有只有一个 那么他将会把所有属性都对应到这个duration 上去 
, 如果你想分离, 请一一对应 (过渡属性按照顺序对应持续时间)


**transition-delay** 表示过渡延迟时间 , 单位也是 s , ms 

[注意]该值为单值时，即所有过渡属性都对应同样时间；该值为多值时，过渡属性按照顺序对应持续时间




## time-function 
在上面使用到了transtion 过渡, 他里面需要我们指定一个 time-function 即 ease , 其实这个是浏览器封装了的 time-function 

提供有 : 
```
ease 开始和结束慢
linear 匀速 
ease-in 开始慢 
ease-out 结束慢
ease-in-out 和ease类似, 但是比 ease 幅度大 
step-start: 直接位于结束处。相当于steps(1,start)
step-end: 位于开始处经过时间间隔后结束。相当于steps(1,end)
```
**关键字其实是bezier函数或steps函数的特殊值**


使用**贝塞尔曲线 **, 这里可以直接使用 chrome 的调试工具来查看对应的贝塞尔曲线值
```
cubic-bezier(x1,y1,x2,y2);
```


**steps** 
允许我们将动画或者过渡分割成段，而不是从一种状态持续到另一种状态的过渡。这个函数有两个参数——第一个参数是一个正值，指定我们希望动画分割的段数。
```
steps(<number_of_steps>，<direction>)
```
direction : end(默认) , start 

[Doc](https://segmentfault.com/a/1190000007042048)


## animation
 
基本使用 

```css
#box {
  width: 100px;
  height: 100px;
  background-color: red;
  /* 使用animation 属性来个这个元素定义动画  */
  animation: move 1s ease-out infinite alternate;
}
/* 定义关键帧  */
@keyframes move {
  80% {
    transform: translateX(300px);
  }
  100% {
    transform: translateX(300px) rotate(90deg);
  }
}
```
关于兼容 : 和transition 类似

animation 和 transtion 是一个复合属性 
```
animation-name 需要指定的关键帧的名称
animation-duration 动画指定需要持续多少时间 (s , ms )
animation-timing-function 指定一个时间函数
animation-delay 指定一个延迟时间 (s , ms ) 
animation-iteration-count 定义这个动画执行多少次
animation-direction 指定是否应该轮流反向播放动画。
    reverse 直接让动画反向播放
    alternate 在动画执行次数为(1,3,5,xxx)进行正向播放,(2,4,6,xxx) 进行反向播放 
    alternate-reverse 与 alternate 相反 
animation-fill-mode  规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
    forwards 在动画结束后（由 animation-iteration-count 决定），动画将应用该属性值。
    backwards 动画将应用在 animation-delay 定义期间启动动画的第一次迭代的关键帧中定义的属性值。
              这些都是 from 关键帧中的值（当 animation-direction 为 "normal" 或 "alternate" 时）或 to 关键帧中的值（当 animation-direction 为 "reverse" 或 "alternate-reverse" 时）。
    both 动画遵循 forwards 和 backwards 的规则。也就是说，动画会在两个方向上扩展动画属性。
animation-play-state 指定动画是否正在运行或已暂停。
    running 指定正在运行的动画 
    paused 指定暂停动画
initial  设置属性为其默认值。
inherit  从父元素继承属性。
```


## 实例






