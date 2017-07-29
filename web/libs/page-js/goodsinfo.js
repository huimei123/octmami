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
		var obj = {};
		var goodsArr =[];
		var size = '';
		var sizeNum = 0;
		var color = '';
		var colorNum = 0;
		console.log(goodsArr);
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
					obj['id'] = res.data[0]['_id'];
					obj['img'] = res.data[0]['productImg'][0];
					//console.log(res.data[0]['currentPrice'].indexOf('.00'));
					obj['price'] = res.data[0]['currentPrice'].indexOf('.00')>=0?res.data[0]['currentPrice']:res.data[0]['currentPrice']+'.00';
					obj['productName'] = res.data[0]['productName'];
					//console.log(obj);
					//console.log(JSON.parse(obj))
					//console.log(obj['price']);
					carousel(res);
					$('.info').html(goodObj.productName);
					if(goodObj.currentPrice.indexOf('.00')==-1){
						//console.log(goodObj.currentPrice.indexOf('.00'));
						$('.price').html(goodObj.currentPrice+'.00');
					}else{
						$('.price').html(goodObj.currentPrice);
					}				
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
			console.log(res.data[0].size);
			if(res.data[0].size){
				sizeNum = res.data[0].size.length*1;
				for(var i=0;i<res.data[0].size.length;i++){
					size += `<i class="sizeType">${res.data[0].size[i]}</i>`
				}
				$('.sizeBg').html('<div class="size">尺码:</div>'+size);
				$('.sizeType').eq(0).addClass('active');
			}else{
				$('.sizeBg').hide();
			}
			if(res.data[0].color){
				colorNum = res.data[0].color.length*1;
				for(var i=0;i<res.data[0].color.length;i++){
					color += `<i class="colorType">${res.data[0].color[i]}</i>`
				}
				$('.colorBg').html('<div class="color">颜色:</div>'+color);
				$('.colorType').eq(0).addClass('active');
			}else{
				$('.colorBg').hide();
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

		
		
		
		//详情页面对象
		var infoPage = {
			$jia: $('.jia'),
			$jian: $('.jian'),
			$btn_buy: $('.btn_buy'),
			$buy_now: $('.buy_now'),
			$toTop: $('.toTop'),
			$sizeBg:$('.sizeBg'),
			$colorBg:$('.colorBg'),
			$info_arrow:$('.info_arrow'),
			init : function(){
				//添加物品事件
				this.$jia.on('click',function(){
					$('.qty').val(Number($('.qty').val())+1);
					$('.jian').removeClass('disable');
				});
				//减少物品事件
				this.$jian.on('click',function(){
					if($('.qty').val()==2){
						//console.log(111);
						$('.qty').val(Number($('.qty').val())-1);
						$('.jian').addClass('disable');
					}else{
						$('.qty').val(Number($('.qty').val())-1);
					}			
				});
				//放入购物车点击事件
				this.$btn_buy.on('click',function(){
					//console.log($('.colorType.active').text());	
					//console.log($('.sizeType.active').text());
					$('.tips').show().animate({opacity:1}).animate({opacity:0});
					//console.log($('body').scrollTop()*1+0.45*$('body').height());
					var times = 0;
					if(goodsArr.length<=0){
						//console.log(111);
						obj['size']= $('.sizeType.active').text()+"";
						obj['color']= $('.colorType.active').text()+"";		
						obj['qty'] = $('.qty').val()*1;
						goodsArr.push(obj);
						//console.log(obj);
						//console.log(obj.size);
						//console.log(obj.color);
					}else{
						//console.log(222);
						goodsArr.forEach(function(item,idx){
						//console.log(item);
						//console.log(item['id']);
						//console.log(obj['id']);
							if(obj['id']==item['id']){
								/*if(item.size==obj.size){
									obj.size == 
								}*/
								item.qty = item.qty*1+$('.qty').val()*1;
								//console.log(item.qty);
								//obj['qty'] = goodsArr.push(obj);
								goodsArr[idx]['qty'] = item.qty;
								goodsArr[idx]['size'] = $('.sizeType.active').text()+"";
								goodsArr[idx]['color'] = $('.colorType.active').text()+"";
								//console.log(obj);
								//console.log($('.sizeType.active').text());
								//console.log($('.colorType.active').text());
							}else{
								times++;
							}						
						})
						if(times==goodsArr.length){
								//console.log(333);
								obj['qty'] = $('.qty').val()*1;
								obj['size']= $('.sizeType.active').text()+"";
								obj['color']= $('.colorType.active').text()+"";
								//console.log(obj);
								//console.log($('.sizeType.active').text());
								//console.log($('.colorType.active').text());		
								goodsArr.push(obj);
						}

					}					
					number = number*1+$('.qty').val()*1;			
					$('.foot_car_set span').html(number);
					//console.log(obj);
					console.log(goodsArr);
					var stingObj =JSON.stringify(goodsArr); 
					//console.log(JSON.stringify(goodsArr));
					//console.log(JSON.parse(stingObj));
					var storage = window.localStorage;
					storage.setItem('shoppingcar',stingObj);
					//console.log(JSON.parse(localStorage.getItem('shoppingcar')));
				});
				//立即购买事件
				this.$buy_now.on('click',function(){
					console.log(111);
				})
				//尺寸点击事件
				this.$sizeBg.on('click','i',function(e){
					//console.log($(e.target).index());
					for(var i=1;i<=sizeNum;i++){
						$('.sizeType').eq(i-1).removeClass('active');
					}
					$('.sizeType').eq($(e.target).index()*1-1).addClass('active');
				});
				//颜色点击事件
				this.$colorBg.on('click','i',function(e){
					//console.log($(e.target).index());
					for(var i=1;i<=sizeNum;i++){
						$('.colorType').eq(i-1).removeClass('active');
					}
					$('.colorType').eq($(e.target).index()*1-1).addClass('active');
				});
				//返回顶部监听
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
				this.$info_arrow.on('click',function(){
					history.back();
				});
			}			
		}		
	});
});