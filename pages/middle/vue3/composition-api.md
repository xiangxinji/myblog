
# Composition-API API 参考

## setup 函数 
setup 是一个新的组件选项,作为组件内的Composition-API 的入口点 
+ **调用时机**

创建实例,然后初始化props ,紧接着就调用setup函数,从生命周期的钩子函数来看,他会在beforeCreate 钩子之前被调用

+ **在模板中使用**

如果setup返回一个对象,在对象属性会被合并到组件模板的上下文: 

```vue
<template>
  <div id="app">
    {{ r }} <!-- 模板中使用ref 不需要.value-->
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const r = ref(0);
    return {
      r,
    };
  },
};
</script>
```

+ **参数**

setup 接受props 为参数 ,**并且props 对象为响应式的** , 然而**不要解构 props 对象，那样会使其失去响应性**：

第二个参数为当前组件的上下文 , 他包含着几个内置属性 

attrs  属性 

emit 事件方法

slots 该组件的插槽 

context 可以进行结构, 因为都是内部组件实例上对应项的代理，可以确保在更新后仍然是最新值。所以可以解构，无需担心后面访问到过期的值：
```js
export default {
  props: {
    msg: String,
  },
  setup(props, context) {
    console.log(props);
    console.log(context);
  },
};
```

+ **this 在setup 中不可用**
其实和setup 的调用机制有关 ... 所以可能导致我们写的包含this 的代码会发生出人意料的结果 



## 响应式系统 API

### reactive
接受一个对象然后返回这个对象的响应式代理,等同于V2.x的Vue.observable(), 响应转换是深层的,会影响对象所有内部嵌套属性,基于ES2015的Proxy 实现 , 返回的代理对象
**不等于原始对象** . 建议仅适用代理对象而避免操作原始对象 
```js
const state = reactive({
      index: 0,
});
// 应该去操作state , 而不要去操作原始对象 
```



### ref 
接受一个参数值并且返回一个响应式可改变的ref变量. ref变量拥有一个指向内部值的 value 属性  
```js
const s = ref('张三');
console.log(s.value); // 张三
```
**在模板中使用**
当ref 在模板中被使用是 不需要使用 value 属性 
```vue
<template>
  <div class="hello">
    {{ s }}
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const s = ref('张三');
    console.log(s.value); // 张三
    return {
      s,
    };
  },
};
</script>
```
**ref 当做reactive 属性时**

当 ref 作为 reactive 对象的 property 被访问或修改时，也将自动解套 value 值，其行为类似普通属性：
```js
const count = ref(0)
const state = reactive({
  count,
})
console.log(state.count) // 0
state.count = 1
console.log(count.value) // 1
```
如果一个新的ref 覆盖了旧的ref , 对于reactive 来说将会被覆盖 

:::warning
注意当嵌套在 reactive Object 中时，ref 才会解套。从 Array 或者 Map 等原生集合类中访问 ref 时，不会自动解套：
:::

**覆盖泛型进行类型推导(TS)**
```ts
const foo = ref<string | number>('foo') // foo 的类型: Ref<string | number>

foo.value = 123 // 能够通过！
```

### computed 
传入一个 getter 函数，返回一个默认不可手动修改的 ref 对象。
```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)
console.log(plusOne.value) // 2
plusOne.value++ // 错误！
```
或者传入一个拥有 get 和 set 函数的对象，创建一个可手动修改的计算状态。
```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  },
})

plusOne.value = 1
console.log(count.value) // 0
```

### readonly 
传入一个对象（响应式或普通）或 ref，返回一个原始对象的只读代理。一个只读的代理是“深层的”，对象内部任何嵌套的属性也都是只读的。
```js
const original = reactive({ count: 0 })
const copy = readonly(original) // 这个对象只能被只读 
// original 上的修改会触发 copy 上的侦听
original.count++
// 无法修改 copy 并会被警告
copy.count++ // warning!
```


### watchEffect 
立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数。
```
const count = ref(0)
watchEffect(() => console.log(count.value))
```
他会返回一个stop函数,你可以调用这个函数进行停止监听 
```js
const s = ref(false);
const stop = watchEffect(() => {
    if (s.value) {
        const el = document.getElementById('show-box');
        console.log(el);
        stop();
    }
});
```

**清除副作用**
如果被触发

+ 副作用即将重新执行时
+ 侦听器被停止 (如果在 setup() 或 生命周期钩子函数中使用了 watchEffect, 则在卸载组件时)

```js
const s = ref(false);
    const stop = watchEffect((onInvalidate) => {
      if (s.value) {
        const el = document.getElementById('show-box');
        console.log(el);
        stop();
      }
      onInvalidate(() => {
        console.log('组件被卸载了');
      });
    });
```


**async 回调**
```js
const data = ref(null)
watchEffect(async () => {
  data.value = await fetchData(props.id)
})
```
我们知道异步函数都会隐式地返回一个 Promise，但是清理函数必须要在 Promise 被 resolve 之前被注册。另外，Vue 依赖这个返回的 Promise 来自动处理 Promise 链上的潜在错误


Vue 的响应式系统会缓存副作用函数，并异步地刷新它们，这样可以避免同一个 tick 中多个状态改变导致的不必要的重复调用。在核心的具体实现中, 组件的更新函数也是一个被侦听的副作用。当一个用户定义的副作用函数进入队列时, 会在所有的组件更新后执行：
```vue
<template>
  <div>{{ count }}</div>
</template>

<script>
  export default {
    setup() {
      const count = ref(0)

      watchEffect(() => {
        console.log(count.value)
      })

      return {
        count,
      }
    },
  }
</script>
```

在这个例子中：
+ count 会在初始运行时同步打印出来
+ 更改 count 时，将在组件更新后执行副作用。

请注意，初始化运行是在组件 mounted 之前执行的。因此，如果你希望在编写副作用函数时访问 DOM（或模板 ref），请在 onMounted 钩子中进行：
```js
onMounted(() => {
  watchEffect(() => {
    // 在这里可以访问到 DOM 或者 template refs
  })
})
```

如果副作用需要同步或在组件更新之前重新运行，我们可以传递一个拥有 flush 属性的对象作为选项（默认为 'post'）：

```js
// 同步运行
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'sync',
  }
)

// 组件更新前执行
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'pre',
  }
)
```

### watch 
watch API 完全等效于 2.x this.$watch （以及 watch 中相应的选项）。watch 需要侦听特定的数据源，并在回调函数中执行副作用。默认情况是懒执行的，也就是说仅在侦听的源变更时才执行回调。

+ **侦听单个数据源**
侦听器的数据源可以是一个拥有返回值的 getter 函数，也可以是 ref：
```js
// 侦听一个 getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 直接侦听一个 ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```
+ **侦听多个数据源**
```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```
