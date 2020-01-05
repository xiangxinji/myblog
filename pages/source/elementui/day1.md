今天是查看饿了么源码的第一天

# elementUi 2.13.0

分析一下 源码结构 

```
element-ui
	lib  打包出来的文件 
	packages 
		xx目录, 真正的组件存放目录 
		src vue源代码文件 
		index.js 各组件导出安装入口文件
	src 
		lang 语言配置目录 
		mixins 混合器
		transitions 动画 
		utils 开发的工具函数
	
	types(ts 的申明文件 )
	....
```



先从简单的组件开始

## avatar 

代码

props 部分 

```vue
size: {
      type: [Number, String],
      validator(val) {
		// 验证是否传入的参数是否合格  
        if (typeof val === 'string') {
		// 只能是 large 和 medium 和 small 其中之一
          return ['large', 'medium', 'small'].includes(val);
        }
		// 只能是number 
        return typeof val === 'number';
      }
    },
    shape: {
      type: String,
      default: 'circle',
      validator(val) {
		// 同上 , 只能是 circle 圆形 和 square 方形 
        return ['circle', 'square'].includes(val);
      }
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    error: Function,
    fit: {
      type: String,
      default: 'cover'
    }
```

data 部分

```vue
data() {
    return {
     	// 这个图片是否存在 
		isImageExist: true
    };
  },
```

computed 他使用了computed 函数根据用户传入的props 来动态添加 class 

methods 

```vue
handleError , renderAvatar  
1. 判断是否图片有故障, 如果有 , 这 isImageExist = false , 表示图片并不存在
2. 判断 图片是否存在, 如果存在 返回 img 标签 , 否则 你传入的默认插槽 
```

render 

```vue
    const sizeStyle = typeof size === 'number' ? {
      height: `${size}px`,
      width: `${size}px`,
      lineHeight: `${size}px`
    } : {}; // 表示 当你之前 你的size == number 的时候 增加行内样式 
render => <span> {renderAvatar 返回的元素} </span>
```

end 





## card 

这个组件没啥好说的 , 唯一就这样一句代码 

```vue
// 当你有传入 header 的插槽或者传入了 header 的标题 , 就使用slot 的方式显示 header 	
<div class="el-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
```





## badge 

也没啥好说的.  使用了一个computed 来计算你的 数值 

```vue
  content() {
      if (this.isDot) return; // 如果是小圆点数据样式直接结束
      const value = this.value;
      const max = this.max;

      if (typeof value === 'number' && typeof max === 'number') {
		// 如果 max 小于这个的值 返回文本为 max+ 否则返回value 值 
        return max < value ? `${max}+` : value;
      }

      return value;
    }
```





## tag标签

props :  

```vue
// 之前一直使用的都是 includes 现在这里又是 index !== -1 了.. 应该是两个人写的吧  
effect: {
        type: String,
        default: 'light',
        validator(val) {
          return ['dark', 'light', 'plain'].indexOf(val) !== -1;
        }
      }
```

methods :  这里会抛出两个事件 ,一个是close 一个这个tag 的选择事件, 这里使用了 event.stopPropagation 方法来组织事件传播并产生再触发click 事件

```vue
 handleClose(event) {
        event.stopPropagation();
        this.$emit('close', event);
      },
      handleClick(event) {
        this.$emit('click', event);
      }
```

render 函数: 

```vue
判断你是否禁用了 transition ,默认又 el-zoom-in-center 
return this.disableTransitions ? tagEl : <transition name="el-zoom-in-center">{ tagEl }</transition>
```





## button(button-group) 

html 代码这里还是使用了button 原生控件 , 然后 这里有个有意思的地方 ,那就是 使用了 inject 

```vue
使用inject 来表示 父组件或者更高层的组件申明了这个变量... , 这里估计是 el-form 组件 provide 的 elForm 和 elFormItem  属性     
inject: {
		elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },
```

这里使用了计算属性计算是否继承el-form定制的样式

```vue
 computed: {
      _elFormItemSize() {
        	// 如果elFormItem 被提供了, 那么返回 elFormItem 提供的大小 
			return (this.elFormItem || {}).elFormItemSize;
      },
		// 从这里可以看出来优先级 
		// size 属性 > elFormItemSize >  不知道这个是什么的size , 应该是这个这个对象提供了默认的size  
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
		// disabled > elForm.disabled 
      buttonDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },
```

然后 emit 了click 事件  

这是 button ,  button-group 有点离谱 ,,, 就一个样式 

```vue
<template>

  <div class="el-button-group">

    <slot></slot>

  </div>

</template>

<script>

  export default {

    name: 'ElButtonGroup'

  };

</script>

```





## Link 

```vue
<template v-if="$slots.icon"><slot v-if="$slots.icon" name="icon"></slot></template>
当你提供了 icon 这个插槽的时候 , 他将申明这个插槽... 
```

之后代码就没啥好说的 

```vue
handleClick(event) {
    // 必须不被禁用而且需要拥有href  才会emit 这个事件  
	if (!this.disabled) {
        if (!this.href) {
          this.$emit('click', event);
        }
      }
    }
```





## loading 

这里使用了 vue 的 transition 组件 , 使用了 transition 的 @after-leave 的一个事件 , 这个事件直接 emit 

computed 

```vue
computed: {
      typeClass() {
        return `el-alert--${ this.type }`;
      },
		
      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'el-icon-info';
      },
// 以上两个来计算 icon 和 最外元素的  class 

	// 是否需要变成大ICON 条件(当拥有描述文字的时候,或者你填写了插槽)
      isBigIcon() {
        return this.description || this.$slots.default ? 'is-big' : '';
      },
	// 同上 
      isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
      }
    }
```





## breadcrumb (面包屑)

他没啥好说的... 他提供了一个provide , 来供下层组件直接使用当前对象的props 

```vue
  provide() {
      return {
        elBreadcrumb: this
      };
    },
```

他的mounted函数 

```vue
// 使用this.el来搜索所有的 item 
const items = this.$el.querySelectorAll('.el-breadcrumb__item');
      if (items.length) {
		// 直接将最后一个设置为 currentpage .. 估计是有啥样式啥的...  
        items[items.length - 1].setAttribute('aria-current', 'page');
      }
```



还有一个 breadcrumb-item 的组件  

使用了 inject 来获取 provide 属性 

```
   inject: ['elBreadcrumb'],
```

html 部分代码 

```vue
当你提供了 icon 的话就使用icon 否则提供你传入的 分隔符  , 这两个属性也是直接使用 elBreadcrumb 对象的
<i v-if="separatorClass" class="el-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="el-breadcrumb__separator" role="presentation">{{separator}}</span>
```

mounted 

```vue
 mounted() {
      this.separator = this.elBreadcrumb.separator;
      this.separatorClass = this.elBreadcrumb.separatorClass;
      const link = this.$refs.link;
      link.setAttribute('role', 'link');
      link.addEventListener('click', _ => {
        const { to, $router } = this;
        // 必须提供 to 和拥有 vue-router 对象  
		if (!to || !$router) return;
		// 如果模式不是replace , 那就直接push 出去 
        this.replace ? $router.replace(to) : $router.push(to);
      });
    }
```



## collapse 

我大约看到这里才明白...  为啥有的组件拥有两个... , 有两个或者多个的  代表 子组件,  本身的那个组件代表父组件... 父组件来定义统一的功能,然后使用provide 来将自己提供出去, 供子组件调用 

比如:  table , button , collapse , breadcrumb   都是如此 

继续来看 collapse 

props : 

```vue
props:{ 
// 是否开启手风琴模式 
accordion: Boolean,
      value: {
        type: [Array, String, Number],
        default() {
          return [];
        }
      }
```

同样是将this provide 出去 命名为: collapse 

methods : setActiveNames 此方法将传入的名字进行设置并且进行 emit (input  // input 估计是为了 v-model 吧, change )

handleItemClick 模拟点击了某一个 collapse item 元素 

分开了两种模式  1. 手风琴模式 , 2 非手工琴模式 



collapse-item 

这边使用了 Emitter 的一个混合器 , 和 generateId 的一个utils 函数 

计算函数

```vue
 computed: {
    // 判断当前是否被激活   
	isActive() {
        return this.collapse.activeNames.indexOf(this.name) > -1;
      }
    },
```

methods 

```vue
 methods: {
     // 判断是 获取焦点还是点击 
	handleFocus() {
        setTimeout(() => {
          if (!this.isClick) {
            this.focusing = true;
          } else {
            this.isClick = false;
          }
        }, 50);
      },
	// 点击头部  ...  将使用 Emmit混合器中的 this.dispatch 来进行动画吧...  (待证实... )
      handleHeaderClick() {
        if (this.disabled) return;
        this.dispatch('ElCollapse', 'item-click', this);
        this.focusing = false;
        this.isClick = true;
      },
	// 当你点击了已经点击的块 ...  估计是将 item 进行收起....  
      handleEnterClick() {
        this.dispatch('ElCollapse', 'item-click', this);
      }
    }
```













