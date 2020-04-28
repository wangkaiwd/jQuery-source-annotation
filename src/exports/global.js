import jQuery from "../core.js";

var

	// Map over jQuery in case of overwrite
  // _jQuery缓存jQuery
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
  // _$ 缓存$
	_$ = window.$;

// 假设用法如下
// 用法1：
//  <script src="zepto"></script>
//  此时 window.$ = zepto
//  <script src="jQuery"></script>
//  此时 jQuery中的$覆盖了zepto中的$,但是在覆盖之前进行保留：_$ = window.$ = zepto
//  window.$ = jQuery
//  这里我们需要归还zepto的$使用权限，$.noConflict(), window.$ === jQuery成立，那么window.$ = _$ = zepto，此后，$表示zepto

// 用法2：
//   <script src="jQuery1"></script>
//    此时window.$ = jQuery1
//    window.jQuery = jQuery1
//   <script src="jQuery2"></script>
//    此时，jQuery2将会覆盖全局的window.$和window.jQuery
//    window.$ = window.jQuery = jQuery2
//    执行$.noConflict() 归还$给jQuery1
//    执行j = $.noConflict(true) $和jQuery都回到jQuery1,此时window.jQuery = window.$ = jQuery1 , j = jQuery2

// 整体思路：jQuery把其它库的$和jQuery覆盖/其它库把jQuery的$和jQuery覆盖(用户可以自己提前保存一份)
//    1. 在为全局的变量赋值之前，先将全局变量通过其它变量进行缓存
//    2. 用户发现其它库的变量会和jQuery发生冲突。$发生冲突，执行3，$和jQuery都发生冲突，执行4
//    3. 用户引入jQuery,然后执行jQuery.noConflict()方法，将$的使用权归还给前一个库
//    4. 用户引入jQuery,执行 window.j = jQuery.noConflict(true),将jQuery和$都归还给前一个库，并且将jQuery赋值个window.j

// Relinquish jQuery's control of the $ variable.
jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) { // typeof 即使没有该值也不会报错
	window.jQuery = window.$ = jQuery;
}
