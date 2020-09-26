
# Composition-API 的基本使用 

## 如何安装
1. 首先先通过vue-cli 创建一个新的项目  
2. 使用vue add 添加这个依赖  
```bash
# in an existing Vue CLI project
vue add vue-next
```
3. 就可以直接使用了


## base usage 
首先 Vue-CompoistionApi 的 API接口都直接在Vue 进行导出的 , 意味着我们在使用的时候得先进行import  
```js
import { reactive } from 'vue';
```

然后我们可以添加一个setup 函数,在里面可以使用各种各样的api并且将状态暴露   
```js
export default {
  setup() {
  },
};
```
在之前我们使用Vue2.x的时候都是使用的options api , 这表示这我们的各种各样的配置都放在了options 选项中,如 data 实例数据, computed 计算属性, methods 函数, watch 监听器等等

在Vue3中将会使用 composition-api(组合式) 的编码范式来完成相对应的功能 , 那么这些东西都在 setup 函数中进行完成 .. , 在之前我们就有一些痛点

在组合式API 中的官网也解释了这样改造的目的 [Docs](https://composition-api.vuejs.org/zh/#%E5%8A%A8%E6%9C%BA%E4%B8%8E%E7%9B%AE%E7%9A%84)



## 响应式状态与副作用 

创建一个响应状态 reactive 
```js
const state = reactive({
    count : 0  // 此时这个count 就有了依赖追踪,可以监听变化 
})
state.count ++ ; // 让 state.count 变化, 渲染视图 
```
在DOM 当中渲染内容会被当做一种"副作用" :程序会在外部修改自身(也就是这个DOM 的状态), 我们可以使用 watchEffect API 基于副作用完成某些功能
```js
import { reactive, watchEffect } from 'vue';

export default {
  setup() {
    const state = reactive({
      count: 0,
    });
    function increment() {
      state.count++;
    }
    watchEffect(() => { // 当count 第一次完成渲染或者count改变之后完成渲染就会执行 watchEffect callback 
      console.log(state.count);
    });
    return {
      state,
      increment,
    };
  },
};
```


## 计算状态和Ref
在vue2.x中使用 computed option 来进行计算属性, 在composition-api 中直接使用 computed , 他里面有一个回调, 这个回调中需要返回你的computed 属性值

在下面的例子中,就演示了 通过reactive 添加了一个响应状态, 然后通过 computed 来完成这个state.count 的监听并且同步给了state.countByPx 
```js
import { reactive, computed } from 'vue';

export default {
  setup() {
    const state = reactive({
      count: 0,
      countByPx: computed(() => `${state.count}px`),
    });
    function increment() {
      state.count += 1;
    }
    return {
      state,
      increment,
    };
  },
};
```

关于computed的有一个很小的点,在文档上也有说明,那就是 引用传递问题 , 在computed 中他会返回一个 Ref , 我们可以通过这个 Ref.value 来操作这个值 
:::tip
是因为引用传递导致computed 这个函数不能直接返回一个基础数据类型 , 因为如果是基础类型在js中他会进行值传递,并不是引用传递那么这个讲道理是被复制了一遍,自然也就会丢失响应式
, 他的解决方案就是在其中包了一层Ref 
这个Ref.value 才是真正的值... 
:::
```js
import { computed } from 'vue';
export default {
  setup() {
    const s = computed(() => '123');
    console.log(s.value); // "123"
    return {
    };
  },
};
```
除了计算值的 ref，我们还可以使用 ref API 直接创建一个可变更的普通的 ref：

```vue
<template>
  <div id="app">
    <button @click="increment">ADD</button> 
    {{ r }} <!-- 在template 中可以直接使用ref 来访问该value , 不需要使用 ref.value -->
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const r = ref(0);
    function increment() {
      r.value += 1;
    }
    return {
      r,
      increment,
    };
  },
};
</script>
```


## 生命周期 

```vue
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('component is mounted!')
    })
  },
}
```



## 更多API 细节请参考 
[Doc](https://composition-api.vuejs.org/zh/api.html)



