## `src/core.js`
`jQuery`解决的问题：

`$('.box')`做了什么: 
* 执行`jQuery`函数,函数中会`new jQuery.fn.init(selector,context)`并返回

这里`jQuery.fn`是`jQuery`函数的原型：
```javascript
jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  // some other properties
}
```
而`jQuery.fn.init`是在执行`$('.box')`时所真正调用的函数：
```javascript
// 缓存原型上的init方法：
//  1. 简化书写，保证代码简洁
//  2. 在之后使用时不用再次进行原型链的查找，提高性能
init = jQuery.fn.init = function(selector,context,root) {
  // 当作为构造函数被new执行的时候，如果返回了对象，就是将该对象作为返回值，否则返回值为this
  // return something
  if(selector.nodeType) {
    this[0] = selector
    this.length = 1;
    return this
  }
}
init.prototype = jQuery.fn 
```

* 每次执行`$('.box')`都会新创建一个`jQuery`实例(`jQuery`对象)
* 实例的私有属性通过`jQuery.fn.init`方法来设置
* 实例的原型为`jQuery.prototype`



