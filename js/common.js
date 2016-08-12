define(function(require, exports, module){   
    module.exports={
        //随机数
        rnd:function(m,n){
            return parseInt(Math.random()*(m-n)+n);
        },
        //补零
        tuDou:function(n){
            return n < 10 ?'0'+n:''+n;
        },
        //class获取元素
        getByClass:function(oParent,sClass){
            if(oParent.getElementsByClassName){
                return oParent.getElementsByClassName(sClass);
            }else{
                var aEle = oParent.getElementsByTagName('*');
                var arr2 = [];
                for(var i = 0; i < aEle.length; i++){
                    var tmp = aEle[i].className.split(' ');
                    if(findInArr(sClass,tmp)){
                        //aEle[i]
                        arr2.push(aEle[i]);
                    }
                }
                return arr2;
            }
        },
        //距离有定位父级的距离
        getPos:function(obj){
            var l = 0;
            var t = 0;
            while(obj){
                l+=obj.offsetLeft;
                t+=obj.offsetTop;
                obj=obj.offsetParent;
            }
            return {left:l,top:t}
        },
        //事件绑定
        addEvent:function(obj, sEv, fn){
            if(obj.addEventListener){
                obj.addEventListener(sEv, fn, false);
            }else{
                obj.attachEvent('on'+sEv, fn);
            }
        },
        //事件解绑
        removeEvent:function(obj, sEv, fn){
            if(obj.removeEventListener){
                obj.removeEventListener(sEv, fn, false);
            }else{
                obj.detachEvent('on'+sEv, fn);
            }
        },
        //鼠标滚轮事件
        addWheel:function(obj,fn){
            function fnWheel(ev){
                var oEvent=ev||event;
                var bDown=true;

                if(oEvent.wheelDelta){
                    if(oEvent.wheelDelta>0){
                        bDown=false;
                    }else{
                        bDown=true;
                    }
                }else{
                    if(oEvent.detail<0){
                        bDown=false;
                    }else{
                        bDown=true;
                    }
                }

                fn && fn(bDown);

                oEvent.preventDefault && oEvent.preventDefault();  //防止默认事件     支持高级浏览器
                return false;                                      //遇到事件绑定 return false失效
            }

            if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
                obj.addEventListener('DOMMouseScroll',fnWheel,false);
            }else{
                obj.onmousewheel=fnWheel;
            }
        }
    }
});