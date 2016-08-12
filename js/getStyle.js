define(function(require,exports,module){
	exports.G=function(obj,name){
		return (obj.currentStyle || getComputedStyle(obj,false))[name];
	}
});