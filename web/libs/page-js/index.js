require(['config'],function(){
	require(['jquery','swiper','hxLimitTime','hxchoice'],function($){
		$('<section/>').addClass('title').load('search.html',function(){
			$(this).insertBefore('.swiper-container');
		});
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
			url:toggle+'timeLimit',
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
					url: toggle+'selection',
					dataType:'json',
					type:'POST',
					success:function(res){
						//console.log(res);
						if(res.status==true){
							$('.choice').hxchoice({
								data: res.data,
							});
						}
						$.ajax({
							url: toggle+'flashSale',
							dataType:'json',
							type:'POST',
							success: function(res){
								console.log(res);
								if(res.status==true){
									$('.choiceOther').hxchoice({
										data: res.data,
										type:0,
									});
								}
							}
						});
					}
				});
			}
		});
		

		/*$('.limitTime').on('click','li',function(e){
			console.log(this);
			console.log(e.target);
		});*/
		var indexPage = {
			$toTop : $('.toTop'),
			$limitTime : $('.limitTime'),
			init : function(){
				//返回顶部
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

				this.$limitTime.on('click','li',function(e){
					//console.log(this);
					//console.log(e.target);
					var id = $(this).data('id');
					location.href = './goodsinfo.html?_id='+id;
				});
			},
		};

		indexPage.init();
	});
});