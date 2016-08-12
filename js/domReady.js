define(function(require, exports, module){
    exports.D=function(fn){
        if(document.addEventListener){
            document.addEventListener('DOMContentLoaded', function(){
                fn && fn();
            }, false);
        }else{
            document.attachEvent('onreadystatechange', function(){
                if(document.readyState=='complete'){
                    fn && fn();
                }
            });
        }
    }
});