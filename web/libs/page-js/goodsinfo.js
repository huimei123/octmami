require(['config'],function(){
	require(['jquery','swiper'],function($){
		//console.log(111);
		var id = location.search.split('=')[1];
		console.log(id);
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
			var $div = $('<div/>').addClass('swiper-wrapper');
			for(var i=0;i<res.data[0].productImg.length;i++){
				html += `<div class="swiper-slide"><img class="banner" src="./libs/img/productImg/${res.data[0].productImg[i]}" alt=""></div>`
			}
			for(var i=0;i<res.data[0].productInformation.length;i++){
				mainImg +=`<img src="./libs/img/productImg/${res.data[0].productInformation[i]}"/>`
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
		}

		$('.jia').on('click',function(){
			$('.qty').val(Number($('.qty').val())+1);
			$('.jian').removeClass('disable');
		})
		$('.jian').on('click',function(){
			if($('.qty').val()==2){
				$('.qty').val(Number($('.qty').val())-1);
				$('.jian').addClass('disable');
			}else{
				$('.qty').val(Number($('.qty').val())-1);
			}
			
		})
		$('.btn_buy').on('click',function(){
			$('.foot_car_set span').html($('.qty').val())
		})

	});
});