require(['config'],function(){
	require(['jquery','swiper'],function($){
		//状态判断是否加载完页面
		document.onreadystatechange = state;
			function state(){
				console.log(document.readyState);
				if(document.readyState == 'complete'){
					$('.loadPage').hide();
				} 
			}
		state();
		//console.log(111);
		var id = location.search.split('=')[1];
		var obj = '';
		var goodsArr =[];
		//console.log(id);
		var number = 0;
		if(localStorage.getItem('shoppingcar')==null){
			//console.log(111);
			$('.foot_car_set span').html(0);
		}else{
			//console.log(222);			
			goodsArr = JSON.parse(localStorage.getItem('shoppingcar'));
			console.log(goodsArr);
			goodsArr.forEach(function(item){
				number += item.qty*1;
				//console.log(item.qty);
			})
			$('.foot_car_set span').html(number);
			//console.log(number);
		}
		
		if(id){
			$.ajax({
				url:toggle+'singleDetails',
				type:'POST',
				dataType:'json',
				data:{
					_id:id+"",
				},
				success:function(res){
					console.log(res);
					var goodObj = res.data[0];
					obj = res.data[0];
					//console.log(obj);
					//console.log(JSON.parse(obj))
					carousel(res);
					$('.info').html(goodObj.productName);
					$('.price').html(goodObj.currentPrice);
					$('.detailTitle').html(goodObj.productName);

				}
			});
		}
		//生成轮播图结构&商品信息
		function carousel(res){
			var html='';
			var mainImg='';
			var argument='';
			var $div = $('<div/>').addClass('swiper-wrapper');
			for(var i=0;i<res.data[0].productImg.length;i++){
				html += `<div class="swiper-slide"><img class="banner" src="./libs/img/productImg/${res.data[0].productImg[i]}" alt=""></div>`
			}
			for(var i=0;i<res.data[0].productInformation.length;i++){
				mainImg +=`<img src="./libs/img/productImg/${res.data[0].productInformation[i]}"/>`
			}
			if(res.data[0].arguments.length>0){
				for(var i=0;i<res.data[0].arguments.length;i++){
	  				console.log(res.data[0].arguments[i]);
	  				argument += `<p class="goodsArguments">${res.data[0].arguments[i]}</p>`
  				}
			}
			//console.log(html);
			$div.html(html).appendTo($('.swiper-container'));			
			var mySwiper = new Swiper('.swiper-container',{
			    loop: true,
				autoplay: 3000,
				pagination: '.swiper-pagination',
				paginationClickable :true,
				autoplayDisableOnInteraction : false,
  			});
  			$('.productInfoMain').html(mainImg);
  			$('.arguments').html(argument);
  			infoPage.init();
		}

		
		
		
	
		var infoPage = {
			$jia: $('.jia'),
			$jian: $('.jian'),
			$btn_buy: $('.btn_buy'),
			$buy_now: $('.buy_now'),
			$toTop: $('.toTop'),
			init : function(){
				this.$jia.on('click',function(){
					$('.qty').val(Number($('.qty').val())+1);
					$('.jian').removeClass('disable');
				});
				this.$jian.on('click',function(){
					if($('.qty').val()==2){
						console.log(111);
						$('.qty').val(Number($('.qty').val())-1);
						$('.jian').addClass('disable');
					}else{
						$('.qty').val(Number($('.qty').val())-1);
					}			
				});
				this.$btn_buy.on('click',function(){			
					if(goodsArr.length<=0){
						obj['qty'] = $('.qty').val()*1;
						goodsArr.push(obj);
					}else{
						goodsArr.forEach(function(item,idx){
						console.log(item);
							if(obj['_id']==item['_id']){
								item.qty = item.qty*1+$('.qty').val()*1;
								//console.log(item.qty);
								//obj['qty'] = goodsArr.push(obj);
								goodsArr[idx]['qty'] = item.qty;
							}else{
								obj['qty'] = $('.qty').val()*1;
								goodsArr.push(obj);
							}						
						})
					}					
					number = number+$('.qty').val()*1;			
					$('.foot_car_set span').html(number);
					//console.log(obj);
					//console.log(goodsArr);
					var stingObj =JSON.stringify(goodsArr); 
					//console.log(JSON.stringify(goodsArr));
					//console.log(JSON.parse(stingObj));
					var storage = window.localStorage;
					storage.setItem('shoppingcar',stingObj);
					//console.log(JSON.parse(localStorage.getItem('shoppingcar')));
				});
				setInterval(function(){
					//console.log($('body').scrollTop());
					if($('body').scrollTop()>=1000){
						this.$toTop.show().click(function(){
							$('body').stop(true).animate({scrollTop:0});
							($(this)).hide();
						});
					}else{
						$('.toTop').hide();
					}
				}.bind(this),1500);
			}

			
		}

		
	});
});