
/**************放大镜效果*************/
$(function(){
	var ione = $("#middle-box"),
		ithe = $("#big-box"),
		itwo = $("#small-box img"),
		tthe = $("#big-box img");

	var arr = ["/static/images/iii/huageyuxie1.jpg","/static/images/iii/huageyuxie2.jpg","/static/images/iii/huageyuxie3.jpg"];

	itwo.each(function(i){
		$(this).hover(function(){
			$("#middle-box img").attr("src",arr[i])
			tthe.attr("src",arr[i])

		})

		ione.mousemove(function(a){
			var evt = a || window.event
			ithe.css('display','block')
			$("#zoom-area").css('display','block')
			var ot = evt.clientY-($("#middle-box").offset().top- $(document).scrollTop())-$("#zoom-area").width()/2;
			var ol = evt.clientX-($("#middle-box").offset().left- $(document).scrollLeft())-$("#zoom-area").width()/2;
			var $maxMoveX=ione.width()-$("#zoom-area").width();//该情况为middlebox和
			//console.log($maxMoveX)
			var $maxMoveY=ione.height()-$("#zoom-area").height();//遮料层都为正方形
			//console.log($maxMoveY)

			if(ol<=0){
				ol = 0;
			}
			if(ot<=0){
				ot = 0;
			}
			if(ol>=$maxMoveX){
				ol=$maxMoveX
			}
			if(ot>=$maxMoveY){
				ot=$maxMoveY
			}
			$("#zoom-area").css({'left':ol,'top':ot})
			var ott = ot/ione.width()*tthe.width();
			var oll = ol/ione.width()*tthe.width();
			tthe.css({'left':-oll,'top':-ott})
		})
		ione.mouseout(function(){
			ithe.css('display','none')
			$("#zoom-area").css('display','none')
		})

	})

	$('.trans-range .range').hover(function(){
		$(this).find('div').css('display','block')

	},function(){
		$(this).find('div').css('display','none')

	})



	var $conts=$('.renqi > .ul2')
	$('.paiming .ul1 > li').each(function(){
		//console.log($('.paiming .ul1 > li'))

		//console.log($conts)
		$(this).hover(function(){
			$(this).css('background','#fff')
			$(this).siblings().css('background','#E6E6E6')
			$conts.eq($(this).index()).css('display','block')
			$conts.eq($(this).index()).siblings().css('display','none')
			//$conts.eq($(this).index()).css('display','block')*/

		})
	});



	$('.ul2 > li ').each(function(){

		$(this).find('a').hover(function(){
			$(this).siblings('div').css('display','block')
			$(this).parent().siblings().find('a').siblings('div').css('display','none')

		},function(){
			$(this).siblings('div').css('display','none')
		})
	});

	$('.intrduce-nav > li').each(function(){
		$(this).on('click',function(){
			$(this).addClass('change');
			$(this).siblings().removeClass('change');
		});

	});

	$('.intrduce-nav1 > li').each(function(){
		$(this).on('click',function(){
			$(this).addClass('change');
			$(this).siblings().removeClass('change');
		})

	});

	/*小按钮点击事件*/

	$(window).on('scroll',function(){


		if($(window).scrollTop()>=850){
			$('.intrduce-nav1').css('display','block')
			$('#red-btn1').css('display','block')
			/*var iTop=$(window).scrollTop()
			if($(window).scrollTop()>iTop()){
				$('#red-btn1').css('display','none')
			}*/

		}else{
			$('.intrduce-nav1').css('display','none')
			$('#red-btn1').css('display','none')

		}
	})

	$('#red-btn1 > a').on('click',function(){
		$('.intrduce-right').css('left','0')
		$('.intrduce-nav1').css('left',112)


		$('#red-btn1').css('display','none')
		$('#red-btn2').css('display','block')


		if($(window).scrollTop()>=850){
			$('#red-btn2').css('display','block')
		}else{
			$('#red-btn2').css('display','none')

		}



		$('#red-btn1 > a').css('background','none')
		$('#red-btn1 > a').css('border','none')
		$('#red-btn1').css('border','none')
		$('#red-btn1').css('background','none')




	});
	$('#red-btn2 > a').on('click',function(){
		$('.intrduce-right').css('left','218'+'px')
		$('.intrduce-nav1').css('left','330'+'px')
		$('#red-btn1').css('display','block')
		$('#red-btn2').css('display','none')


		//如果出错，下面五行代码删除
		//$('#red-btn1').css('border','1px solid #E6E6E6')
		//$('#red-btn1').css('background','red')
		$('#red-btn1 > a').css('background','url(images/red-btn1.jpg) no-repeat center')
		$('#red-btn1 > a').css('border','1px solid #ccc')

		//$('#red-btn1 > a').css({'border','1px solid #ccc'})
		/*再次点击时候*/
		/*$('#red-btn1 > a').css('background','#E6E6E6 url(../images/red-btn1.jpg) no-repeat center; ')
		$('#red-btn1 > a').css('border','1px solid #ccc')
		$('#red-btn1').css('border','1px solid #E6E6E6')
		$('#red-btn1').css('background','red')*/


	});

	var $inLi=$('.intrduce-nav1 > li')
		//console.log($inLi)
	$('.intrduce-nav2 > li').each(function(){

		$(this).on('click',function(){
			$(this).addClass('change');
			$(this).siblings().removeClass('change');

		})

	});


	//网页you边菜单.default_user
	$('.default_user').hover(function(){
		$(this).css('background','#ee120b');
		$('.default_user span').css('display','block')
	},function(){
		$(this).css('background','none');
		$('.default_user span').css('display','none')
	})

	$('.left-cars').hover(function(){
		$(this).css('background',' url(/static/images/iii/car2.png) no-repeat center 15px')
	},function(){
		//$(this).css('background','none')
		$(this).css('background','#000 url(/static/images/iii/car1.png) no-repeat center 15px')
	});
	$('.qq-pic').hover(function(){
		$(this).css('background','#ee120b')
	},function(){
		$(this).css('background','none')
	});

	$('.to-top').hover(function(){
		$(this).css('background','#ee120b');
		$('.to-top span').css('display','block')
	},function(){
		$(this).css('background','none');
		$('.to-top span').css('display','none')
	});



	/*JQ返回顶部操作*/
	$('.to-top').on('click',function(event){
		event.preventDefault();
		$('body,html').animate({scrollTop:0},1000 )
	})



});


$(function () {
	//	2018-10-24 修改
	$(".a5").click(function (){
		console.log('test')
		var shopcars = $('.left-cars');
        //console.log(shopcars)
        var addImg = $('#middle-img');
        //console.log(addImg)
        //console.log(addImg.offset().top())
        var cloneImg = addImg.clone();
        //console.log(cloneImg)
        shopcars.css('position', 'relative');
        cloneImg.css({
            'width': 400,
            'height': 400,
            'position': 'absolute',
            'top': 250,
            'left': 100,
            'z-index': 1000,
            'opacity': .8
        });
        cloneImg.appendTo($('body')).animate({
            'width': 50, 'height': 50, 'top': 400, 'left': 1400,
        }, 2500, function () {
            cloneImg.animate({
                'width': 0, 'height': 0,
            }, function () {
                $('.shop-num').html(prevNum);
                $(this).detach();

            }, buycar())
        });

        // var $goods_id = $(this).attr("good.id");
		function buycar(){
			$strs = location.href;
			// var $goods_id =$strs.slice(-2,-1);
			var $goods_id = $('#good_id').html();
			console.log($goods_id);
			var $count = $("#goumai-count").html();
			console.log("$count---"+$count);
			console.log($goods_id);
			if ($count <= 0) {
				alert("对不起，数量不能小于0")
			}
			$.ajax({
				url: "/goods/shop_good/" + $count + "/" + $goods_id + "/",
				type: "get",
				success: function (msg) {
					// alert("添加成功")
				},
				error: function (info) {
					alert("添加失败，请重新添加");
					window.location.href = '/goods/good_show/' + $goods_id;
				},
			})
		}


    })


	var prevNum=1;
	$('.a2').on('click',function(){
		$('.buy-num b').html(++prevNum);
	});
	$('.a3').on('click',function(){
		$('.buy-num b').html(--prevNum);
		if(prevNum<1){
			prevNum=1;
		}
	});


});















// $(function(){
//
//
// 	$('.a5').on('click',function(){
// 		// 创建购物车
//
// 		// 获取商品id
// 		var id = $('.fine-shop > h3').text();
//
// 			// 获取图片路径
// 		var imgPath = $('#middle-img').attr('src');
// 		console.log(imgPath)
// 					// 获取名称
// 		var goodsName = $('#good-price > h2').text();
// 			//console.log(goodsName)
// 					// 获取单价
// 		var price = $('.p-left span').text();
// 		//console.log(price)
// 					// 获取购买数量
// 		var count =$('.buy-num b').text() ;
// 			//console.log(count)
// 					// 写购物车到cookie中
// 		new CartHelper().Add(id, goodsName, count, price, imgPath);
//
// 			// 加载购物车中的数据
// 			//loadCart();
//
// 	})
// })
