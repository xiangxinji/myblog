# webwork

## js 多线程


+ JS的多线程是OS级别的 （是真的多线程）
+ JS 多线程不允许操作DOM 
+ JS 线程没有同步的概念 
```javascript
const work = new Worker("working.js");
work.postMessage(0);
work.onmessage = function(result) {
  console.log(result.data);
};
```

```javascript
// working.js
onmessage = function() {
  let result = 0;
  for (let index = 0; index < 100000000; index++) {
    result += index;
  }
  this.postMessage(result);
};
```


## 线程同步

1. ### 互斥锁
使用太多会导致性能下降,因为线程堵塞在那里,他要不断的查询那个锁能不能用,所以占用CPU资源


2. ### 读写锁 
多个线程可以进行读 , 有人在读的过程中就不能有一个人进行写入, 如果有一个人在写, 就不能有人读  

3. ### 条件判断 
解决生产者,消费者问题 由于互斥锁和读写锁导致一直堵塞在那里占用CPU , 而使用信号通信的方式可以让先堵塞的线程进入睡眠方式, 等生产者通知,再唤醒它 进行消费 



## JS 没有线程同步的概念 
JS的多线程无法操作DOM , 没有window对象, 每个线程的数据都相互独立. 主线程传个子线程的数据是通过拷贝复制, 子线程给主线程的数据也是拷贝复制, 不是共享同一块内存区域 

