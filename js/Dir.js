define(function(require, exports, module){
	var N = require('getPos').T;
	exports.D=function(obj, ev){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var x=N.(obj).left+obj.offsetWidth/2-ev.clientX;
        var y=N.(obj).top+obj.offsetHeight/2-ev.clientY-scrollTop;

        return Math.round((Math.atan2(y, x)*180/Math.PI+180)/90)%4;
    }
});