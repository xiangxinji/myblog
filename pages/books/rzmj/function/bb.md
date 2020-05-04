# 闭包

定义 : 在一个函数在申明创建时,允许访问自身函数访问并访问该函数作用域之外的变量时所创建的作用于.

换句话说就是,**闭包可以让函数访问所有变量和函数,只要这些变量和函数存在于该函数的作用域内即可**

示例, 一个简单的闭包

```javascript
const outValue = "zhangsan";
function append(str) {
  return str + outValue + "-end";
}
append();
```

上面的代码就创建了一个简单的闭包 , 因为 append 在函数申明的时候,他里面的作用域可以去操作和 append 函数相同作用域的变量和函数

再来一个例子:

```javascript
let letter = null;
function outFunc() {
  let outValue = "out_value";
  function innerFunc() {
    let innerValue = "inner_value";
    console.log("outValue = ", outValue);
    console.log("innerValue = ", innerValue);
  }
  letter = innerFunc;
}
outFunc();
letter();
```

当上方在申明 InnerFunc 的时候,不仅申明了函数, 还创建了一个闭包 , 该闭包不仅包含函数申明,还包含了函数申明的那一时刻点上该作用域上的所有变量
,最终当 innerFunc 被执行的时候,当时的作用域已经消失了,通过闭包,该函数还是能够访问到原始作用域的

书上说道,他就像一个保护气球一样, 只要 innerFunc 一直存在,那么他的闭包就保持该作用域中即将被垃圾回收的变量

这种气泡包含了函数和变量,和函数本身停留在了一起

再再来一个例子 :

```javascript
let outValue = "outValue";
let lat;
function outFunc() {
  let innerValue = "innerValue";
  function innerFunc(param) {
    console.log(outValue);
    console.log(innerValue);
    console.log(param);
    console.log(tooLater);
  }
  lat = innerFunc;
}
outFunc();
var tooLater = "tooLater";
lat("param");
// 上面的 console.log 都能访问到变量
```

测试的结果说明了三个关于闭包更有趣的概念 :

1. 内部函数的参数是包含在闭包之内的
2. **作用域之外的所有变量,即便是函数申明之后的变量,也都包含在闭包当中**
3. 相同的作用域内,尚未申明的变量不能提前进行引用

闭包的使用是有开销的,使用闭包时,闭包里面男的信息会一直保存在内存中,知道这些信息确保不再使用(可以安全进行垃圾回收) , 或者页面被卸载时,Javascript 引擎才能清理这些信息

## 私有变量

```javascript
function People() {
  var age = 0; // 这是一个私有变量
  this.getAge = function() {
    return age;
  };
  this.addAge = function() {
    return ++age;
  };
}
const p = new People();
console.log(p.addAge()); // 1
console.log(p.addAge()); // 2
const p2 = new People();
console.log(p2.addAge()); // 1
console.log(p2.age); // undefined
```

在每次 new 一个对象的时候 , 在 this.getAge = function .... 的时候 , 那么他们就已经形成了一个 闭包, 导致 getAge 和 setAge 可以操作 age 这一个变量, 但是因为 var age 在 People 函数中申明,有作用域限制, 所以对于外界 age 是不可访问的

示意图大约如下

```
闭包1                           闭包2
---------------------------------------------------------------
People Instance - getAge(Ref) |People Instance2 - getAge(Ref) |
                - addAge(Ref) |                 - addAge(Ref) |
getAgeFunc(Function)          |getAgeFunc(Function)           |
addAgeFunc(Function)          |addAgeFunc(Function)           |
age                           |age                            |
---------------------------------------------------------------
```

**当函数在闭包内执行的时候,不仅可以在闭包内读取这些变量的值,我们还可以对其更新**

换句话说,闭包不是在创建那一时刻点的状态的快照,而是一个真实状态的封装,只要闭包存在,就可以对其修改

## bind 方法

利用闭包的特性,实现 bind 方法,来手动绑定函数执行上下文(this)

```javascript
function bind(context, name) {
  // 手动返回一个方法, 形成一个闭包 , 使得下面的function 可以访问 context , name
  // 因为这些变量已经存在于闭包当中
  return function() {
    return context[name].apply(context, arguments);
  };
}
// 当然也可以使用 Function.prototype.bind = function xxx ...
```

Prototype 库中的 bind 方法如下

```javascript
Function.prototype.bind = function() {
  // 将它需要绑定的方法拿出来 , 还有上下文
  const fn = this,
    args = Array.prototype.slice.apply(arguments);
  // 取出第一位
  const context = args.shift();
  return function() {
    // 使用apply 手动绑定上下文, 然后将两个方法的参数合并
    return fn.apply(
      context,
      args.concat(Array.prototype.slice.apply(arguments))
    );
  };
};
```

## curry 函数科里化

定义 : 首先先填充几个参数 , 然后在返回新的函数的技术称为函数科里化

```javascript
Function.prototype.curry = function() {
  const fn = this;
  const args = Array.prototype.slice.apply(arguments);
  return function() {
    return fn.apply(this, args.concat(Array.prototype.slice.apply(arguments)));
  };
};
function testting(reg, value) {
  return reg.test(value);
}
const testPhone = testting.curry(/\d{11}/);
const r = testPhone("15191223091");
console.log(r);
```

## 分部函数

根据 传入的参数 来进行对应(根据 undefined 来区分 , 做参数整合)

```javascript
Function.prototype.partial = function() {
  const fn = this;
  // 预先设置的参数
  const args = Array.prototype.slice.call(arguments);
  return function() {
    let ai = 0;
    for (let i = 0; i < args.length && arguments.length; i++) {
      if (typeof args[i] === "undefined") {
        // 将后置参数进行合并
        args[i] = arguments[ai++];
      }
    }
    return fn.apply(this, args);
  };
};

const dealy = setTimeout.partial(undefined, 2000);
const obj = {
  name: "张三",
};
function getName() {
  console.log(this.name);
}
dealy(getName.bind(obj));
```
