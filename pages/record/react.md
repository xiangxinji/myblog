# React 

## 函数式组件必须以大写开头
```js
const FunctionComp = () => {
    // code blog 
}
```

## 生命周期
当组件第一次被渲染到 DOM 中的时候，就为其设置一个计时器。这在 React 中被称为“挂载（mount）”。

同时，当组件被删除的时候。这在 React 中被称为“卸载（unmount）”。

在 class 组件中,可以通过一些方法去定义生命周期时候的操作 
```js
export default class Clock extends React.Component {
    componentDidMount() {
    }
    componentWillUnmount () {
    }
}
```

## 关于setState 
1. 不要直接修改state , 应该通过setState 方法,否则不能重新渲染组件,并且构造方法是唯一能赋值 this.state 的地方
2. state 的更新可能是异步的

    出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
    
    如果要解决这个问题,就让setState 接收一个函数,并且返回新的state 
    ```js
     this.setState((state , props) => {
         return {
           current : state.current + props.company 
         }       
     })
    ```
3. state 的更新会被合并
    当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。这里的合并是浅合并


## 数据是向下流动的
如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。


## render 方法返回null 
你可以让 render 方法直接返回 null，而不进行任何渲染。


## react jsx被转换的关键字
class => className 

for => htmlFor 


## 使用 ref 操作dom 
给原生标签使用的话就是DOM实例 , 如果给组件使用的话就是组件实例  
```js
import React, {Component} from 'react';

class RefComment extends Component {
    componentDidMount() {
        console.log(this.input)
    }

    render() {
        return (
            <div>
                <input type="text" ref={input => this.input = input}/>
            </div>
        );
    }
}

export default RefComment;
```


## dangerouslySetInnerHTML 相当于Vue中的 v-html 
```js
{
 render () {
    return (
      <div className='editor-wrapper'
        dangerouslySetInnerHTML={{__html: this.state.content}} />
    )
  }
}
```


## 进行 Prop-Type 检查 
使用react 提供的第三方库来进行类型检查 
```bash
npm install --save prop-types
```
```js
import React, {Component} from 'react';
import PropTypes from 'prop-types'

class PropTypeCheck extends Component {
    static propTypes = {
        message : PropTypes.string.isRequired
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <h2>
                { this.props.message }
            </h2>
        );
    }
}
export default PropTypeCheck;
```


## 规范处理命名
1. 组件的私有方法都以 _ 开头 
2. 所有事件监听的方法都以handle开头
3. 把事件监听的方法传递给组件时,属性名以 on 开头

组件内容编写顺序如下
1. static开头的类属性 , 如 defaultProps , propTypes 
2. 构造方法
3. getter / setter 
4. 组件生命周期
5. _ 开头的私有方法
6. 事件监听方法
7. render*开头的方法,有时候render方法里面的内容会区分到不同的函数里面去,这些函数都以render 开头
8. render 方法

