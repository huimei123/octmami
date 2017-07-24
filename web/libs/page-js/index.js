require(['config'],function(){
	require(['jquery','swiper','hxLimitTime'],function($){
		var mySwiper = new Swiper('.swiper-container',{
		    loop: true,
			autoplay: 3000,
			pagination: '.swiper-pagination',
			paginationClickable :true,
			autoplayDisableOnInteraction : false,
  		});
		$.ajax({
			url:'http://10.3.134.228:8888/timeLimit',
			dataType:'json',
			type:'POST',
			success:function(res){
				//console.log(res.data);
				if(res.status==true){
					$('.limitTime').hxLimitTime({
						data: res.data,
					});
				}
			}
		});
		
	});
});