// JavaScript Document
var arr=[
	{'img':'1','height':'323','txt':'1那首关于我们的曲 你把结局弹给了谁、钢琴、碎片、清新','collect':'76','support':'10','picture':'p1','author':'日向凌女','theme':'钢琴'},
	{'img':'2','height':'214','txt':'2那首关于我们的曲 你把结局弹给了谁、钢琴','collect':'17','support':'3','picture':'p2','author':'古力娜扎','theme':'钢琴'},
	{'img':'3','height':'214','txt':'3那首关于我们的曲 你把结局弹给了谁、钢琴','collect':'19','support':'10','picture':'p1','author':'日向凌女','theme':'钢琴'},
	{'img':'4','height':'212','txt':'4那首关于我们的曲 你把结局弹给了谁、he、钢琴','collect':'31','support':'6','picture':'p2','author':'小爽赶紧肉嘟嘟','theme':'钢琴'},
	{'img':'5','height':'218','txt':'5那首关于我们的曲 你把结局弹给了谁、钢琴','collect':'67','support':'9','picture':'p1','author':'日向凌女','theme':'钢琴'},
	{'img':'6','height':'384','txt':'6感谢你赠我一场空欢喜，我们有过的美好回忆，让泪水染得模糊不清了。偶尔想起，记忆犹新，就像当初，我爱你，没什么目的，只是爱你','collect':'40','support':'3','picture':'p2','author':'日向凌女','theme':'琴键'},
	{'img':'7','height':'213','txt':'7好美，这种类型的女孩子是我最爱之一，是之一呐！！如果是生在中国古代就是典型的大家闺秀有没有，优雅寡言，知书达理！！嗯嗯~','collect':'14','support':'3','picture':'p1','author':'日向凌女','theme':'琴键'},
	{'img':'8','height':'320','txt':'8那首关于我们的曲 你把结局弹给了谁、钢琴','collect':'15','support':'2','picture':'p1','author':'日向凌女','theme':'钢琴'},
	{'img':'9','height':'599','txt':'9？','collect':'47','support':'3','picture':'p1','author':'日向凌女','theme':'钢琴'},
	{'img':'10','height':'481','txt':'10By KseniaKartamysheva-题目：My small musician...','collect':'33','support':'4','picture':'p1','author':'日向凌女','theme':'琴键'},
	{'img':'11','height':'211','txt':'11By KseniaKartamysheva-题目：My small musician...','collect':'33','support':'4','picture':'p1','author':'日向凌女','theme':'琴键'},
	{'img':'12','height':'213','txt':'12By KseniaKartamysheva-题目：My small musician...','collect':'33','support':'4','picture':'p1','author':'日向凌女','theme':'琴键'},
	{'img':'13','height':'211','txt':'13By KseniaKartamysheva-题目：My small musician...','collect':'33','support':'4','picture':'p1','author':'日向凌女','theme':'琴键'},
	{'img':'14','height':'568','txt':'14By KseniaKartamysheva-题目：My small musician...','collect':'33','support':'4','picture':'p1','author':'日向凌女','theme':'琴键'},
	{'img':'15','height':'212','txt':'15By KseniaKartamysheva-题目：My small musician...','collect':'33','support':'4','picture':'p1','author':'日向凌女','theme':'琴键'}
]
window.onload=function (){//body的高度为滚动的高度加上可视区的高度
	var aTmp=document.getElementsByTagName('ul');
	var aUl=[];
	var n=0;
	for(var i=0;i<aTmp.length;i++)
	{
		aUl.push(aTmp[i])
	}
	createLi();
	window.onscroll=function ()
	{
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		var clientHeight=document.documentElement.clientHeight;
		var h=scrollTop+clientHeight;
		if(h == document.body.offsetHeight)
		{
			if(n>=5)
			{
				return;
			}
			createLi();
		}
	}
	function createLi()
	{
		n++;
		for(var i=0;i<15;i++)
		{
			var oLi=document.createElement('li');
			oLi.innerHTML=
			'<li>'+
				'<div><img class="img" src="images/'+arr[i]['img']+'.png" style="height:'+arr[i]['height']+'px "alt=""/></div>'+
				'<div class="bottom">'+
					'<p class="txt">'+arr[i]['txt']+'</p>'+
					'<div>'+
						'<span class="collect">'+arr[i]['collect']+'</span><span class="support">'+arr[i]['support']+'</span>'+
					'</div>'+
					'<div class="clearFix bottom_bottom">'+
						'<div class="fl"><img class="picture" src="images/'+arr[i]['picture']+'.png" alt=""/></div>'+
						'<div class="fl">'+
							'<span class="author">'+arr[i]['author']+'</span> 采集到'+
							'<p class="theme">'+arr[i]['theme']+'</p>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</li>';
			aUl.sort(function (ul1,ul2){
					return ul1.offsetHeight-ul2.offsetHeight;
			});
			aUl[0].appendChild(oLi);
		}
	}
};