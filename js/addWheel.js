define(function(require, exports, module){
    exports.W=function(obj,fn){
            function fnWheel(ev)
            {
                var oEvent=ev||event;
                var bDown=true;

                if(oEvent.wheelDelta)
                {
                    if(oEvent.wheelDelta>0)
                    {
                        bDown=false;
                    }
                    else
                    {
                        bDown=true;
                    }
                }
                else
                {
                    if(oEvent.detail<0)
                    {
                        bDown=false;
                    }
                    else
                    {
                        bDown=true;
                    }
                }

                fn && fn(bDown);

                oEvent.preventDefault && oEvent.preventDefault();  //防止默认事件     支持高级浏览器
                return false;                                      //遇到事件绑定 return false失效
            }

            if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
            {
                obj.addEventListener('DOMMouseScroll',fnWheel,false);
            }
            else
            {
                obj.onmousewheel=fnWheel;
            }
        }
});