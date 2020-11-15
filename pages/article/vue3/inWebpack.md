

## 在webpack中使用vue3 


:::tip
这次的webpack config 以及开发依赖都以ant-design-vue 开源项目为参考 , 并且是以最简单的方式进行尝试
:::

**大致步骤如下**

1. 首先我们先创建一个项目,并安装好webpack , webpack-cli 

2. 然后我们编写配置文件(webpack 最基础的,仅包含entry , output)

3. 安装 vue3.0

4. 安装 loader 已经对应的 compiler 



```javascript
const path = require('path')
const VueLoaderPlugin = require('vue-loader/dist/plugin').default;
module.exports = {
    entry:  './src/main.js' ,
    output : {
        path: path.resolve('./dist'),
        filename: "[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/ ,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
```
其实从上面代码可以看到,基本上和vue2没啥改变 , 但是依赖发生了改变 , 我们来看一下package.json

```json
{
    "dependencies": {
        "@vue/compiler-sfc": "3.0.0",
        "vue": "3.0.0",
        "vue-loader": "16.0.0-beta.5",
        "webpack": "^4.44.2",
        "webpack-cli": "^3.3.12"
    }
}
```
首先 vue 采用了vue3的版本 , 然后是vue-loader 采用了 16 的beta版, 并且对应的compiler 使用的是 3.0 的sfc 版


**然后我们就可以编写vue3代码了**

// main.js 
```javascript
// 这里与 vue2 不同的是, 之前vue 并没有直接暴露这个 createApp 这个方法
// 之前的写法是 new Vue({ render: h=> App }).$mount('#app') ; 
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);
app.mount('#app')
``` 

// App.vue
```vue
<template>
  <div>
    <button @click="increment"> INCREMENT </button>
    <h1>
      app vue components ( count = {{state.count}} )
    </h1>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: "App" ,
  setup () {
    const state = reactive({
      count : 0
    })
    const increment = () => {
      state.count ++
    }
    console.log(state)
    return {
      state ,
      increment
    }
  }
}
</script>
```

## 尝试 typescript 

 


