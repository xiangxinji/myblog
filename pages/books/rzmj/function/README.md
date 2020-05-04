
## 关于引用丢失的问题

```javascript
let ninja = {
  run: function() {
    console.log("Run here ");
  }
};
const surmiral = {
  run: ninja.run
};
ninja = {};
surmiral.run();
/**
step1 : 初始化了ninjia (包括了申明 function , 并且这个 匿名 function 已经存入了 内存地址 )
run字段只是引用了这个内存地址   
step2 : surmiral.run 引用了 ninja.run存放的内存引用 
如  surmiral.run -> ninja.run --> func  也就是说 , function 不存放在 ninja 中, 而是单独储存内存里
step3 : ninja 的引用被清空了
但是 surmiral 依然可以去调用 func 
也就是说 , 你虽然吧ninja 给清空了, 但是那个你在储存 surmiral 是将这个函数的地址 引用过去了而已, 与 ninja 无关 
*/
```

## 关于内联函数

```javascript
const s = function() {};
console.log(s.name);
// s
const a = function b() {};
console.log(a.name);
// s , b 由此可见function.name 匿名函数取决于变量|字段, 但是有名函数就直取决于自己
```

```javascript
let ninja = {
  destroy: function destroyStandard(i) {
    if (i === 0) {
      return destroyStandard(i - 1);
    }
    return i;
  }
};
const surmrial = {
  destroy: ninja.destroy
};

ninja = {};
console.log(surmrial.destroy(0));

console.log(destroyStandard);
// Uncaught ReferenceError: destroyStandard is not defined
```

书中说道: 尽管可以给内联函数命名 , 但是这些名称只有在函数内部才是可见的,他的作用于域仅限于申明他的函数

## 关于 arguments.callee

:::warning
callee 已经不建议使用,原因

访问 arguments 是个很昂贵的操作，因为它是个很大的对象，每次递归调用时都需要重新创建。影响现代浏览器的性能，还会影响闭包。
:::

可以使用 arguments.callee 来调用自身
如下 :

```javascript
const append = function(a) {
  if (a.length % 2 === 0) return arguments.callee(a + "-append");
  else return a + "PX";
};
```

## 函数等于对象

可以给函数取相对应的字段,然后可以依赖这一特性做出许多优化和操作

比如: 动态的将 N 个函数给存放,并且自动生成 ID

```javascript
const store = {
  nextId: 1,
  cache: {},
  add: function(fn) {
    if (!fn.id) {
      fn.id = this.nextId;
    }
    this.cache[fn.id] = fn;
  }
};
function opr() {
  console.log(opr.id);
}
opr.id = 5;
store.add(opr);
store.add(function a() {
  console.log(a.id);
});
```

函数级别的缓存

```javascript
function add(count) {
  if (!add.result) {
    add.result = {};
  }
  if (add.result[count]) {
    return add.result[count];
  }
  let result = 0;
  for (let i = 0; i <= count; i++) {
    result += i;
  }
  add.result[count] = result;
  return add.result[count];
}

let begin = new Date().getTime();
let result = add(100000000);
let end = new Date().getTime();
console.log(`执行完毕,结果为:${result},耗时:${end - begin}`);
begin = new Date().getTime();
result = add(100000000);
end = new Date().getTime();
console.log(`执行完毕,结果为:${result},耗时:${end - begin}`);
// 执行完毕,结果为:5000000050000000,耗时:139
//执行完毕,结果为:5000000050000000,耗时:1
// 数据仅供参考
```

## 函数重载 (通过传入的参数去执行对应的功能)

版本 1

```javascript
function opreation() {
  const l = arguments.length;
  switch (l) {
    case 1:
      console.log("你的参数就一个,执行1");
      break;
    case 2:
      console.log("你的参数有两个,执行2");
      break;
    default:
      break;
  }
}
```

版本 2

```javascript
const book = {};
const addMethod = function(object, name, fn) {
  /**
   * 最核心的点就是这个 oldFunc
   * 在下方代码中 可以看出如果不匹配则调用 oldFunc ,在我个人理解当中我认为是这样的.
   * 之前在说引用的时候 , Function 存放是独立的, 此时可以看到
   * object[name] 一直被覆盖, 所以给人下面的代码第一感觉就是 oldFunc 只会存储最后一个 
   * 但是,如果吧这种东西拿到之前说引用丢失的问题,这个东西就很好理解了 step 如下 
   * step1 : 存储上一次的function , 就是之后 object[name]被覆盖了, 这个 function 依然会被 oldFunc 引用 
   * 也就是说 在每一次 重新给object[name]一个方法的时候 , oldFunc 是上一个Function 的引用 
   * Function3 --oldFunc--> Function2 --oldFunc--> Function1   
   * 其实也就是在这里通过 oldFunc 这个东西每次保存住上一次方法的引用,
   * step2 : 如果最后一个符合, 就执行符合的函数 , 如果不符合就执行上一个函数 
   * (上一个函数就是这一个函数的复制版,只是他们拥有不同的 fn.length)
   */
  let oldFunc = object[name];
  object[name] = function() {
    // 这个方法实际传入的参数
    const argLength = arguments.length;
    console.log(fn.length, argLength);
    if (argLength === fn.length) {
      fn.apply(this, arguments);
    } else if (typeof oldFunc === "function") {
      oldFunc.apply(this, arguments);
    }
  };
};
addMethod(book, "drug", function(arg1) {
  console.log("arg1");
});
addMethod(book, "drug", function(arg1, arg2) {
  console.log("arg1 , arg2");
});
addMethod(book, "drug", function(arg1, arg2, arg3) {
  console.log("arg1 , arg2 , arg3");
});

book.drug(1);
book.drug(1, 2);
book.drug(1, 2, 3);
```
