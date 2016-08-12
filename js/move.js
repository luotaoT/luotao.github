/**
 * 运动框架
 * @param obj   对象
 * @param json  {width: 300, height: 300}
 * @param duration  时间  1000单位ms
 * @param complete  回调函数  callback
 * @param easing    运动形式
 *          linear   匀速
 *          ease-in  加速
 *          ease-out 减速
 */
define(function(require, exports, module){
	var a = require('getStyle');
	exports.M=function(obj, json, option){
	    var option=option || {};
	    option.duration=option.duration || 500;
	    option.easing=option.easing || 'ease-out';

	    var start={};
	    var dis={};
	    for(var name in json){
	        start[name]=parseFloat(a.G(obj, name));
	        dis[name]=json[name]-start[name];
	    }

	    var count=Math.floor(option.duration/30);
	    var n=0;
	    clearInterval(obj.timer);
	    obj.timer=setInterval(function(){
	        n++;

	        for(var name in json){
	            switch(option.easing){
	                case 'linear':
	                    var a=n/count;
	                    var cur=start[name]+dis[name]*a;
	                    break;
	                case 'ease-in':
	                    var a=n/count;
	                    var cur=start[name]+dis[name]*Math.pow(a, 3);
	                    break;
	                case 'ease-out':
	                    var a=1-n/count;
	                    var cur=start[name]+dis[name]*(1-a*a*a);
	                    break;
	            }

	            if(name=='opacity'){
	                obj.style.opacity=cur;
	                obj.style.filter='alpha(opacity:'+cur*100+')';
	            }else{
	                obj.style[name]=cur+'px';
	            }
	        }

	        if(n==count){
	            clearInterval(obj.timer);
	            option.complete && option.complete.call(obj);
	        }
	    }, 30);
	};
});