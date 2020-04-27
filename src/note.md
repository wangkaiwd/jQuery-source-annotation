## `src/core.js`
`jQuery`解决的问题：

定义了我们调用的`jQuery`方法

`$('.box')`做了什么: 
* 执行`jQuery`函数,函数中会`new jQuery.fn.init(selector,context)`并返回



所以每次执行`$('.box')`都会新创建一个`jQuery`实例(`jQuery`对象)



