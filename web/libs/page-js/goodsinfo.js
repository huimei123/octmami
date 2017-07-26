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
					console.log(res.data[0]);
					var goodObj = res.data[0];
					carousel(res);
					$('.info').html(goodObj.productName);
					$('.price').html(goodObj.currentPrice);
					$('.detailTitle').html(goodObj.productName);

				}
			});
		}
		//生成轮播图结构
		function carousel(res){
			var html='';
			var $div = $('<div/>').addClass('swiper-wrapper');
			for(var i=0;i<res.data[0].productImg.length;i++){
				html += `<div class="swiper-slide"><img class="banner" src="./libs/img/productImg/${res.data[0].productImg[i]}" alt=""></div>`
			}
			console.log(html);
			$div.html(html).appendTo($('.swiper-container'));
			var mySwiper = new Swiper('.swiper-container',{
		    loop: true,
			autoplay: 3000,
			pagination: '.swiper-pagination',
			paginationClickable :true,
			autoplayDisableOnInteraction : false,
  		});
		}
			
	});
});