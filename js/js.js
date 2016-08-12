define(function(require, exports, module){
	var doMove = require('doMove').D;
	var elastic = require('elastic').X;
	var move = require('move').M;
	var b = require('Tween');
	var d = require('common');

	module.exports={
		nav:function(){
			var oTolead = document.getElementById('tolead');
			var oMain = document.getElementById('main');
			var oNav = document.querySelector('nav');
			var aA = document.querySelectorAll('nav a');
			var oImg = document.querySelector('nav img');
			var oDiv = oTolead.getElementsByTagName('div')[0];
			var oT = document.getElementById('top');
			var oL = document.getElementById('left');
			//var fx=Tween.Back.easeOut;

			oTolead.style.height = document.documentElement.clientHeight+'px';
			oMain.style.height = document.documentElement.clientHeight*aA.length+'px';
			window.onresize = function(){
				oTolead.style.height = document.documentElement.clientHeight+'px';
				oMain.style.height = document.documentElement.clientHeight*aA.length+'px';
			}

			var n=0;
			var timer;
			for(var i = 0; i < aA.length; i++){
				;(function(index){
					aA[i].onmouseover=function(){
						var a = this;
						timer = setTimeout(function(){
							elastic(oImg, a.offsetLeft);
							for(var i = 0; i < aA.length; i++){
								aA[i].className='fl'
							}
							aA[index].className='fl active';
						},200)
					}
					aA[i].onmouseout=function(){
						clearInterval(timer);
						elastic(oImg,n*this.offsetWidth)
						for(var i = 0; i < aA.length; i++){
							aA[i].className='fl'
						}
						aA[n].className='fl active';
					}
					aA[i].onclick=function(){
						n=index;
						//oMain.style.top=n*-oDiv.offsetHeight+'px';
						doMove(oMain,{top:n*-oDiv.offsetHeight})
					}
				})(i);
			};
			var bFlag = false;
			d.addWheel(document,function(bDown){
				if(bDown){
					if(bFlag)return;
					bFlag = true;
					n++;
					if(n>=4){
						n=3;
					}
					elastic(oImg, aA[n].offsetLeft);
					for(var i = 0; i < aA.length; i++){
						aA[i].className='fl'
					}
					aA[n].className='fl active';
					doMove(oMain,{top:n*-oDiv.offsetHeight},{complete:function(){
						bFlag=false;
					}});
				}else{
					if(bFlag)return;
					bFlag=true;
					n--;
					if(n<=0){
						n=0;
					}
					elastic(oImg, aA[n].offsetLeft);
					for(var i = 0; i < aA.length; i++){
						aA[i].className='fl'
					}
					aA[n].className='fl active';
					doMove(oMain,{top:n*-oDiv.offsetHeight},{complete:function(){
						bFlag=false;
					}});
				}
			});
			//下面别看 乱 主页云
			var iNow=0;
			var count=800;
			setInterval(function(){
				iNow++;
				count--;
				if(iNow>=Math.abs(-oT.offsetWidth)){
					iNow=-document.documentElement.clientWidth;
				}
				if(count<=-oL.offsetWidth){
					count=document.documentElement.clientWidth;
				}
				oT.style.left=-iNow+'px';
				oL.style.left=count+'px';
			},30);

			//Example
			;(function(){
				var oP1 = document.getElementById('p1');
				var oP2 = document.getElementById('p2');
				var oP1Btn = document.getElementById('page1');
				var oP2Btn = document.getElementById('page2');
				var aP1Cont = oP1.children;
				var aP2Cont = oP2.children;
	            var aLi = oP1.parentNode.getElementsByTagName('li');
	            var bFlag = true;

				//布局转换  
	            var aPos1=[];  //project p1
	            for (var i=0; i<aP1Cont.length; i++){
	                aPos1.push({
	                    left:aP1Cont[i].offsetLeft,
	                    top:aP1Cont[i].offsetTop
	                });
	            }
	            for (var i=0; i<aP1Cont.length; i++){
	                aP1Cont[i].style.left=aPos1[i].left+'px';
	                aP1Cont[i].style.top=aPos1[i].top+'px';
	                aP1Cont[i].style.position='absolute';
	                aP1Cont[i].style.margin=0;
	            }
	            oP2.style.display='none';
	            oP1.style.display='block';
	            oP2Btn.onclick=function(){
	                clickproject(aP1Cont,aP2Cont,480, 435, oP1, oP2,oP1Btn,oP2Btn);
	            };								//变成none   block
	            oP1Btn.onclick=function(){
	                clickproject(aP2Cont,aP1Cont,400, 435, oP2, oP1,oP2Btn,oP1Btn);
	            };
	            function clickproject(obj1,obj2,left,top,oparent1,oparent2,oP1Btn,oP2Btn){
	                if(!bFlag) return;
	                bFlag=false;
	                if(oparent2.style.display!='block'){
	                    for(var i=0; i<aP1Cont.length; i++){
	                        obj2[i].style.left=left+'px';
	                        obj2[i].style.top=top+'px';
	                        obj2[i].style.width=0;
	                        obj2[i].style.height=0;
	                        obj2[i].style.position='absolute';
	                        obj2[i].style.margin=0;
	                    }
		                oP1Btn.className='';
		                oP2Btn.className='active';
	                    var n=obj1.length-1;
	                    clearInterval(timer);
	                    var timer=setInterval(function (){
	                        (function(index){
	                            move(obj1[n], {top:top, left:left, width:0, height:0, opacity:0, lineHeight:0}, {
	                                duration:300,
	                                complete:function(){
	                                    if(index == 0){
	                                        // 最后一个运动完
	                    					oparent2.style.display='block';
	                                        oparent1.style.display='none';
	                                        end(obj2,oparent2);
	                                    }
	                                }
	                            });
	                        })(n);
	                        n--;

	                        if(n == -1){
	                            clearInterval(timer);
	                        }
	                    }, 100);
	                }else{
	                    var n=obj2.length-1;
	                    clearInterval(timer);
	                    var timer=setInterval(function(){
	                        (function(index){
	                            move(obj2[n], {top:top, left:left, width:0, height:0, opacity:0,lineHeight:0}, {
	                                duration:300,
	                                complete:function(){
	                                    if(index == 0){
	                                        // 最后一个运动完
	                                        oparent1.style.display='none';
	                                        end(obj2,oparent2);
	                                    }
	                                }
	                            });
	                        })(n);
	                        n--;

	                        if(n == -1){
	                            clearInterval(timer);
	                        }
	                    }, 100);
	                }
	            };
	            function end(obj,oparent){
	                var n=0;
	                clearInterval(timer);
	                var timer=setInterval(function(){
	                    var left=aPos1[n].left;
	                    var top=aPos1[n].top;
	                    move(obj[n], {left:left, top:top, width:200, height:200, opacity:1}, {
	                        duration:300
	                    });
	                    n++;
	                    if(n == obj.length){
	                        clearInterval(timer);
	                        oparent.style.display='block';
	                        bFlag=true;
	                    }
	                }, 100);
	            }
	            function hoverDir(obj, ev){
		            var x=d.getPos(obj).left+obj.offsetWidth/2-ev.pageX;
		            var y=d.getPos(obj).top+obj.offsetHeight/2-ev.pageY;
		            return Math.round((Math.atan2(y, x)*180/Math.PI+180)/90)%4;
		        }
	            var aLi = oP1.parentNode.getElementsByTagName('li');
	            for(var i=0; i<aLi.length; i++){
                   	d.addEvent(aLi[i],'mouseenter',function(ev){
                        var oEvent=ev || event;
                        var oA=this.children[0];
                        var n=hoverDir(this, oEvent);
                        switch(n){
                            case 0:
                                oA.style.left='100%';
                                oA.style.top='0';
                                break;
                            case 1:
                                oA.style.left='0';
                                oA.style.top='100%';

                                break;
                            case 2:
                                oA.style.left='-100%';
                                oA.style.top='0';
                                break;
                            case 3:
                                oA.style.left='0';
                                oA.style.top='-100%';
                                break;
                        }
                        move(oA, {left: 0, top: 0});
                    });

                    d.addEvent(aLi[i],'mouseleave',function(ev){
                        var oEvent=ev || event;
                        var oA=this.children[0];
                        var n=hoverDir(this, oEvent);
                        switch (n){
                            case 0:
                                move(oA, {left:200, top: 0});
                                break;
                            case 1:
                                move(oA, {left: 0, top: 200});
                                break;
                            case 2:
                                move(oA, {left:-200, top: 0});
                                break;
                            case 3:
                                move(oA, {left: 0, top: -200});
                                break;
                        }
                    });
                }
			})();

			// HTML&CSS
			;(function(){
				var oUl = document.getElementById('two_section').getElementsByTagName('ul')[0];
				var aLi = oUl.getElementsByTagName('li');
				var n = 0;
				var timer = null;
				oUl.style.width = aLi[0].offsetWidth*aLi.length+'px';

				function block(){
					timer = setInterval(function(){
						n+=1;
						move(oUl,{left:-aLi[0].offsetWidth*n},{complete:function(){
							if(n>=aLi.length-1){
								n=1;
								oUl.style.left=-aLi[0].offsetWidth+'px';
							};
						}});
					},1000);
				};
				block();
				oUl.onmouseenter = function(){
					clearInterval(timer);
				}
				oUl.onmouseleave = function(){
					block();
				}
			})();
		}
	}
});