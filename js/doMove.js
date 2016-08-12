/**
 * Created by ijiajia on 2016/6/13.
 */
/**
 *  Set Order By strive.
 *  copyright by other.
 **/
//t  当前时间
//b  初始值  start
//c  总距离  dis
//d  总时间
//var cur=fx(t,b,c,d)
define(function(require,exports,module){
	var a = require('getStyle');
	var b = require('Tween');
	exports.D=function(obj, json, options){
	    var options=options || {};
	    options.duration=options.duration || 800;
	    options.easing=options.easing || b.T.Bounce.easeOut;
	    //console.log(b.T)
	    var start={};
	    var dis={};
	    for(var name in json){
	        start[name]=parseFloat(a.G(obj, name));
	        dis[name]=json[name]-start[name];
	    }
	    var count=Math.floor(options.duration/30);
	    var n=0;
	    clearInterval(obj.timer);
	    obj.timer=setInterval(function(){
	        n++;

	        for(var name in json){
	            //t  当前时间
	            //b  初始值  start
	            //c  总距离  dis
	            //d  总时间
	            //var cur=fx(t,b,c,d);
	            var cur=options.easing(n/count*options.duration,start[name],dis[name],options.duration);
	            if(name=='opacity'){
	                obj.style.opacity=cur;
	                obj.style.filter='alpha(opacity='+cur*100+')';
	            }else{
	                obj.style[name]=cur+'px';
	            }
	        }

	        if(n==count){
	            clearInterval(obj.timer);
	            options.complete && options.complete();
	        }
	    }, 30);
	}
})