
/***************************购物袋动画效果*****************************/
$(function(){

	/*购物车 在售、心愿单、已失效 选项卡*/

	$(".shoplist_tab a").each(function(index,value){
		console.log("心愿单切换1");
		$(value).on("click",function(){
			console.log("心愿单切换2");
			$(this).siblings().removeClass("active");
			$(this).addClass("active");
			$(".shopbag_tag").css({"display":"block"});
			$(".shopbag_tag").eq($(this).index()).css({"display":"block"});
		});
	});


	/*点击购物车加减按钮,确定购买数量*/
	//减
	$(".number_reduce").on("click",function(event){
		event.stopPropagation();
		$("#truenum").val($("#truenum").val()-1);

		// $('.price_totle').html('￥' + parseInt($("#truenum").val()) * parseInt($(".goods_price").html().slice(1,)));

		// console.log(float($("#truenum").val()) * $(".goods_price").html().slice(1,))
		// console.log($('.price_totle').html());
		// console.log($("#truenum").val());
		// console.log($(".goods_price").html());
		if($("#truenum").val()<30){
			$(".number_add").css({"background":"url(/static/images/iii/increase.gif)"});
			suanjia();
		}
		if($("#truenum").val()<=1){
			$(".number_reduce").css({"background":"url(/static/images/iii/reduce_none.gif)"});
			$("#truenum").val("1");
			suanjia();
		}
		if($("#truenum").val()>1){
			$(".number_reduce").css({"background":"url(/static/images/iii/reduce.gif)"});
			suanjia();
		}
	});

	//加
	$(".number_add").on("click",function(event){
		event.stopPropagation();
		$("#truenum").val(parseInt($("#truenum").val())+1);
		// valuess = $("#truenum").val() * $(".goods_price").html().slice(1,)
		// $('.price_totle').html('￥' + valuess.toFixed(1));



		// console.log($('.price_totle').html());
		// console.log($("#truenum").val());
		// console.log($(".goods_price").html());
		if($("#truenum").val()>1){
			$(".number_reduce").css({"background":"url(/static/images/iii/reduce.gif)"});
			suanjia()

		}
		if($("#truenum").val()>=30){
			$(".list_content_State").css({"display":"block"});
			$(".number_add").css({"background":"url(/static/images/iii/increase_none.gif)"});
			$("#truenum").val("30");
			suanjia();
			$(".list_content_State").html("本次限购30件");
			setTimeout(function(){
				$(".list_content_State").css({"display":"none"});
			},1500);
		}
	});
	function suanjia(){
		valuess = $("#truenum").val() * $(".goods_price").html().slice(1,)
		$('.price_totle').html('￥' + valuess.toFixed(1));
		$('#zongjine').html('￥' + valuess.toFixed(1));
		console.log($('#zongjine').val())

	}

	/*点击删除按钮弹出确定、取消框*/
	$(".good_remove_img").on("click",function(){
		$(this).prev().css({"display":"block"});
	});
	$(".button_cancel").each(function(index,value){
		$(value).on("click",function(){
			$(this).parents().find(".good_remove_box").css({"display":"none"});
		});
	});

	//继续购物，跳转首页
	$(".continue_buy").on("click",function(){
		window.open("/shopsite/index/","_self");
	});

	/************购物车主体内容部分***************/

	// 创建购物车
				$(window).on("load", function () {
					// loadCart();
					if($("#truenum").val()>1){
						$(".number_reduce").css({"background":"url(/static/images/iii/reduce.gif)"});
					}
				});


				// 加载购物车中的商品
				// function loadCart() {
				// 	var carts = new CartHelper().Read();// 读取购物车中的数据
				// 	$(".inner_have").remove();


					// 加载到页面上
					/******************* 加载购买商品信息 BEGIN***********************/
					// $.each(carts.Items, function(index,cartItem) {
					//
					// 	updateCartPage(cartItem.Id, cartItem.Name, cartItem.Count, cartItem.Price, cartItem.imgPath);
					// });
					/******************* 加载购买商品信息 END***********************/
					// // 加载购物结算信息
					// $(".totalCount").text(carts.Count);
					// $(".totalPrice").text(carts.Total);

				// }



				//向购物车中添加数据
				// function updateCart(){
				// 	// 获取商品id
				// 	var id = $(this).parents(".shopslist").attr("data-id");
				// 	var count = $(this).parent().find("#truenum").val();
				// 	new CartHelper().Change(id, count);
				// 	$(this).parents(".shopslist").remove();
					// 加载购物车中的数据
					// loadCart();
				//
				// };

				/********************** 更新页面 ************************/
				function updateCartPage(id, goodsName, count, price, imgPath) {

					/*取goodsName的内容部分*/
					var $nameCon=goodsName.split("##");
					$(".shopslist").first().attr({"data-id":id});
					if(id){
						$(".inner_none").css({"display":"none"});
						$(".shop_none").css({"display":"none"});
						$(".shopslist").clone(true).removeAttr("style").prependTo($(".shopbag_list1"));
						$(".shopcar_bargin").css({"display":"block"});
						$(".shopbag_pay").css({"display":"block"});
					}
				//更新购物车的主页面部分
					var $conImg=$("<img>").attr({src:"/static/images/piano_buy.jpg",title:"3岁+30键粉色钢琴E0319",alt:"3岁+30键粉色钢琴E0319"});
					$(".list_content_img a").first().html($conImg);
					$(".goodsbuy_brand").first().html($nameCon[0]);
					$(".list_content_discribe").first().html($nameCon[1]);
					$(".goods_price").first().html(" ￥ "+price);
					$("#truenum").val(count);
					var $priceRe =$(".price_reduce").first().html().slice(1);
					var $totle = count*price-$priceRe;
					$(".price_totle").html("￥ "+$totle);
					$(".price_total").html("￥"+$totle);



				//创建总的div与里面的三个小部分
					var $inner = $("<div>");
					$inner.addClass("inner_have");
					//创建第一小部分的内容
					var $proCon = $("<div>");   //第一小部分的外部
					$proCon.addClass("my_product_container");
					 	$inner.append($proCon);
					var $product = $("<div>");
					$product.addClass("my_product");
					$product.attr({"data-id":id});
						$proCon.append($product);

					var $proImg = $("<a>");
					$proImg.addClass("my_product_img");
					$proImg.attr({href:"javascript:;"});
						$product.append($proImg);
					var $img = $("<img>");
					$img.attr({src:""+imgPath+"" ,title:$nameCon[1],alt:$nameCon[1]});
						$proImg.append($img);

					var $proDel = $("<a>");
					$proDel.addClass("my_product_delete");
					$proDel.attr({href:"javascript:;"});
					$proDel.html("删除");
						$product.append($proDel);
					var $aUl = $("<ul>");
						$product.append($aUl);
					var $lio = $("<li>");
					var $lioA = $("<a>");
					$lioA.attr({href:"javascript:;"});
					$lioA.html($nameCon[1]);
						$lio.append($lioA);
						$aUl.append($lio);
					var $lit = $("<li>");
						$aUl.append($lit);
					var $litr = $("<li>");
					var $spant = $("<span>");
					$spant.html("￥"+price);
						$litr.append($spant);
					var $span = $("<span>");
					$span.text(" x ");
						$litr.prepend($span);
					var $spano = $("<span>");
					$spano.html(count);
						$litr.prepend($spano);
						$aUl.append($litr);

					//创建第二小部分的内容
					var $subTotal = $("<div>");
					$subTotal.addClass("subtotal");
					$subTotal.html("购物袋小计");
					var $subSpan   = $("<span>");
					$subSpan.attr({style:"margin-right:15px;"});
					$subSpan.html("￥"+count * price);
						$subTotal.append($subSpan);
						$inner.append($subTotal);


					//创建第三小部分的内容
					var $proBtn = $("<a>");
					$proBtn.html("结算");
					$proBtn.attr({href:"javascript:;"});
					$proBtn.addClass("my_product_button");
						$inner.append($proBtn);

					$(".nav_shopping_bag").append($inner);

					$(".goodsCount").html(count);
					$(".goodsprice").html("￥"+count * price);

				}
				/********************** 更新页面 ************************/


				/*移除购物袋中的物品*/
				$(".nav_shopping_bag").on("click", ".my_product_delete",function(){
					new CartHelper().Del($(this).parent().attr("data-id"));
					loadCart();
					if($(".nav_shopping_bag").children(".inner_have").size() <= 0){
						$(".inner_have").css({"display":"none"});
						$(".inner_none").css({"display":"block"});
						$(".nav_shopping_bag").css({"height":"auto"});
						$(".goodsCount").html(0);
						$(".goodsprice").html("￥"+"0.00");
						$(".shopslist").css({"display":"none"});
						$(".shopcar_bargin").css({"display":"none"});
						$(".shopbag_pay").css({"display":"none"});
						$(".shop_none").css({"display":"block"});
						setTimeout(function(){
							$(".nav_shopping_bag").slideUp(300);
						},1500);
					}
				});

				$(".p2").on("click",".button_yes",function(){
					new CartHelper().Del($(this).parents(".shopslist").attr("data-id"));
					loadCart();
					if($(".shop_bagcon").children(".shopslist").size() <= 1){
						$(".shopslist").css({"display":"none"});
						$(".shopcar_bargin").css({"display":"none"});
						$(".shopbag_pay").css({"display":"none"});
						$(".shop_none").css({"display":"block"});
						$(".goodsCount").html(0);
						$(".goodsprice").html("￥"+"0.00");

					}
				});




});





























