##  Dialog  弹框

还是从Html 代码开始看起, 基本上就是定义一些样式,一些插槽啊啥的..

```html
@click.self="handleWrapperClick"  在他的遮罩层上有一个这样的事件 , click.self 这个事件修饰符代表 event.target === 当前元素的时候才会被触发 
```

然后js就是使用了定义好的 mixins 

然后看mounted 函数 , 
 
```javascript

    mounted() {
        if (this.visible) {
        this.rendered = true;
        // 如果 this.visible 已经是显示的,那么代表已经开启了一个  , 直接打开一个新的
        this.open();
        if (this.appendToBody) { // 直接将此元素追加到 body上  
          document.body.appendChild(this.$el);
        }
      }
    },
```

他这里直接使用 watch 来监听 props  visible 

```javascript
 visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
           // 如果appendToBody === false 的话, dialog 会默认相对于父元素, 那么如果你传入了props appendToBody === true 那么, 他会将整个Dialog 给追加到 body上... 
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
     		// 如果需要在关闭的时候销毁这些DOM 元素,那么他会直接切换一个key来使vue不缓存这些dom
          if (this.destroyOnClose) {
            this.$nextTick(() => {
              this.key++;
            });
          }
        }
      }
```



在这可以看到 可以通过切换一个key 来让vue不重复使用此 dom 





## pagination  分页

分页组件 html 片段 , 他直接在ul 上绑定了事件, 然后使用事件委托来操作 分页以及等等... 

```html
 <ul @click="onPagerClick" class="el-pager">
```

onPagerClick 大致如下

```javascript
  onPagerClick(event) {
        const target = event.target;
       	// 当用户并不是直接点击分页,而是点击外部的或者他已经被禁用掉的
      	if (target.tagName === 'UL' || this.disabled) {
          return;
        } 
      	// 使用了这个 textContent 的属性, 这个属性会包含此元素以及所有子孙元素的所有文本内容并拼接
      let newPage = Number(event.target.textContent);
      
    	// 然后接下来就是 他们所写的一些 分页的算法了  ..  
```







## backtop  

基本上就一些关于动画算法的 

 mounted 

```javascript
	// 调用一下初始化方法 
	this.init();
    this.throttledScrollHandler = throttle(300, this.onScroll);
    this.container.addEventListener('scroll', this.throttledScrollHandler);
```

init

```javascript
// 将 dom 元素存入变量好进行操作, 然后还判断了是否存在 target 这个元素  ...  
init() {
      this.container = document;
      this.el = document.documentElement;
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
        this.container = this.el;
      }
    },
```







