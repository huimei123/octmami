require(['config'],function(){
	require(['jquery','swiper','hxLimitTime','hxchoice'],function($){
		$('<section/>').addClass('footNav').load('footer.html',function(){
			$(this).insertAfter('.foot');
		});
		var mySwiper = new Swiper('.swiper-container',{
		    loop: true,
			autoplay: 3000,
			pagination: '.swiper-pagination',
			paginationClickable :true,
			autoplayDisableOnInteraction : false,
  		});
  		//限时特惠请求
		$.ajax({
			url:'http://10.3.134.228:8888/timeLimit',
			dataType:'json',
			type:'POST',
			success:function(res){
				console.log(res.data);
				if(res.status==true){
					$('.limitTime').hxLimitTime({
						data: res.data,
					});
				}
				//每日精选请求
				$.ajax({
					url: 'http://10.3.134.228:8888/selection',
					dataType:'json',
					type:'POST',
					success:function(res){
						console.log(res);
						if(res.status==true){
							$('.choice').hxchoice({
								data: res.data,
							});
						}
					}
				});
			}
		});
		setInterval(function(){
			console.log($('body').scrollTop());
			if($('body').scrollTop()>=1000){
				$('.toTop').show().click(function(){
					$('body').stop(true).animate({scrollTop:0});
					$('.toTop').hide();
				});
			}else{
				$('.toTop').hide();
			}
		},1500);
	});
});