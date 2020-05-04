# 处理各种兼容 



## bind 方法
[code](https://codepen.io/xiangxinji/pen/MWaKewE)
```javascript 
if (!Function.prototype.bind) {
  Function.prototype.bind = function (context) {
    const self = this;
    return function () {
      return self.apply(context, arguments);
    };
  };
}
```




## requestAnimationFrame,cancelAnimationFrame 
[code](https://codepen.io/xiangxinji/pen/YzywWjy)
```javascript 
window.requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    // Older versions Chrome/Webkit
    window.webkitRequestAnimationFrame ||
    // Firefox < 23
    window.mozRequestAnimationFrame ||
    // opera
    window.oRequestAnimationFrame ||
    // ie
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

window.cancelAnimationFrame = (function () {
  return (
    window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.cancelRequestAnimationFrame ||
    function (id) {
      clearTimeout(id);
    }
  );
})();
console.log(window.requestAnimationFrame);
console.log(window.cancelAnimationFrame);

```


