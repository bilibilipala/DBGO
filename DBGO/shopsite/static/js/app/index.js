
$(function(){
	var arr = document.cookie.split("; ");
	var nut = document.getElementsByClassName("first_visit")[0];
	console.log(arr)
	for(var i= 0,len=arr.length;i<len;i++) {
		var key = arr[i].split("=")[0];
		var value = arr[i].split("=")[1];
		//console.log(value)
		//console.log(key)
		if("yonghu"==key) {
			//console.log(123123132)
			$(".first_visit").css("display","none");
		}else {
			$(".first_visit").css("display","block");
		}
	}

	/***********************************/
	//轮播图样式效果

	var clearTime = null;
	var $index = 0;
	var $qiandex = 0;

	//显示前进后退按钮，通过hover事件处理
	$(".home_large").hover(
		function(){
			$(".prev,.next").stop().fadeIn(500);
			clearInterval(clearTime);
		},
		function(){
			$(".prev,.next").stop().fadeOut(500);
			clearInterval(clearTime);
			autoPlay();
		}
	);
	//滚动播放效果
	function scrollPlay(){
		$(".slides_list a").eq($index).addClass("active").parent().siblings().children().removeClass("active");
//		console.log($(".slides_list a").eq($index));
//		console.log($(".slides_list a"));
		if($index == 0 && $qiandex == 7){
			$(".slides_container li").eq($qiandex).stop(true,true).animate({"left":"-960px"});
			$(".slides_container li").eq($index).css("left","960px").stop(true,true).animate({"left":"0"});
		}else if($index == 7 && $qiandex == 0){
			$(".slides_container li").eq($qiandex).stop(true,true).animate({"left":"960px"});
			$(".slides_container li").eq($index).css("left","-960px").stop(true,true).animate({"left":"0"});
		}else if($index > $qiandex){
			$(".slides_container li").eq($qiandex).stop(true,true).animate({"left":"-960px"});
			$(".slides_container li").eq($index).css("left","960px").stop(true,true).animate({"left":"0"});
		}else if($index < $qiandex){
			$(".slides_container li").eq($qiandex).stop(true,true).animate({"left":"960px"});
			$(".slides_container li").eq($index).css("left","-960px").stop(true,true).animate({"left":"0"});
		}
	}

	//设置自动播放效果
	function autoPlay(){
		clearTime = setInterval(function(){
			$index++;
			if($index > 7){
				$index = 0;
				$qiandex = 7;
			}
			scrollPlay();
			$qiandex = $index;
		},3000);
	}
	autoPlay();

	//用户点击下一张图片，顺序显示图片
	$(".next").click(function(){
		$index++;
		if($index > 7){
			$index = 0;
			$qiandex = 7;
		}
		scrollPlay();
		$qiandex = $index;
		clearInterval(clearTime);
		autoPlay();
	});

	//用户点击前一张图片,倒序显示图片
	$(".prev").click(function(){
		$index--;
		if($index < 0){
			$index=7;
			$qiandex = 0;
		}
		scrollPlay();
		$qiandex = $index;
		clearInterval(clearTime);
		autoPlay();
	});

	//悬停展示动画效果
	$(".slides_list a").mouseover(function(){
		clearInterval(clearTime);
		$index = $(this).index();
		scrollPlay();
		$qiandex = $index;
	}).mouseout(function(){
		autoPlay();
	});
});

//第一次访问效果
$(function(){
	$(".close_fv").click(function(){
		$(".first_visit").css("display","none");
	});
});


//无缝滚动样式效果
window.onload = function(){

	var oBox = $("m_hot");
	var oBoxUl = byTagName(oBox,"ul")[0];
	//console.log(oBoxUl);
	var iSpeed = -1;
	var oTimer = null;

	autoMove();
	oBoxUl.innerHTML += oBoxUl.innerHTML;
	oBoxUl.style.width = oBoxUl.offsetWidth *2 +"px";

	oBox.onmouseenter = function(){
		clearInterval(oTimer);
	}
	oBox.onmouseleave = function(){
		autoMove();
	}

	function autoMove(){
		oTimer = setInterval(function(){
			if(oBoxUl.offsetLeft + iSpeed <= -oBoxUl.offsetWidth / 2) {
				oBoxUl.style.left = 0;
			} else {
				oBoxUl.style.left = oBoxUl.offsetLeft + iSpeed + 'px';
			}
		},30);
	}

	function $(id){
		return document.getElementById(id);
	}
	function byTagName(obj,tagName){
		return obj.getElementsByTagName(tagName);
	}
	function setStyle(obj,oTarget){
		for(var sAttr in oTarget){
			obj.style[sAttr] = oTarget[sAttr];
		}
	}
}



































