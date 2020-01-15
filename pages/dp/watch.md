


## 观察者模式 / 发布订阅模式

观察者模式又叫发布订阅模式（Publish/Subscribe），定义了一种一对多的关系， 其实也很简单。 其实就是一个中间者，他用来收集依赖，和管理着发布。 
1. 收集依赖 。。。 相当与你在社交网站上点击了关注（订阅）
2. 到有一个人进行（发布）文章。。。 所有关注这个人的用户就会收到消息推送 
对于这个例子而言呢。 网站就负责 观察。。 每当有人进行发布时，将会对其以来进行推送， 又或者说是通知 。。。
当然. 也在网上看到了一些观察者的优点
>1.支持简单的广播通信，自动通知所有已经订阅过的对象。
>
>2.目标对象与观察者存在的是动态关联，增加了灵活性。
>
>3.目标对象与观察者之间的抽象耦合关系能够单独扩展以及重用。

说的确实是精髓 ， 然后我们来看一下实际代码实现


<hr>

由TS 实现
```typescript
type observe = {
  apply: () => {};
};
class Watch {
  _observer: {};
  constructor() {
    this._observer = {};
  }
  // 订阅事件
  on(eventName: string, handle: (...args: any) => void) {
    if (this._observer[eventName]) {
      this._observer[eventName].push({
        apply: handle
      });
    } else {
      this._observer[eventName] = [
        {
          apply: handle
        }
      ];
    }
  }
  emit(eventName: string, ...args: any) {
    if (!this._observer[eventName]) {
      throw `not defined ${eventName}events`;
    } else {
      this._observer[eventName].forEach(handle => {
        handle.apply(...args);
      });
    }
  }
}
const w1 = new Watch();
w1.on("click", arr => {});
w1.on("click", arr => {});
w1.on("load", () => {
  console.log("有用户加载完毕了");
});
w1.emit("click", [1, 2, 3]);

```