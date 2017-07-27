require(['config'],function(){
	require(['jquery','swiper','hxLimitTime','hxchoice','lazyload'],function($){
		//状态判断是否加载完页面
		document.onreadystatechange = state;
			function state(){
				console.log(document.readyState);
				if(document.readyState == 'complete'){
					$('.loadPage').hide();
				} 
			}
		state();
		//引入header和绑定跳转事件
		$('<section/>').addClass('title').load('search.html',function(){
			$(this).insertBefore('.swiper-container');
			console.log();
			$('.header_search').on('click',function(){
					//var id = $(this).data('id');
					console.log(666);
					location.href = './hotSearch.html';
			});
		});
		//引入footer
		$('<section/>').addClass('footNav').load('footer.html',function(){
			$(this).insertAfter('.foot');
		});
		//swiper轮播图
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
						console.log(res);
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
		//首页对象
		var indexPage = {
			$toTop : $('.toTop'),
			$limitTime : $('.limitTime'),
			$choice: $('.choice'),
			$search:$('.header_search'),
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

				this.$choice.on('click','li',function(){
					var id = $(this).data('id');
					location.href = './goodsinfo.html?_id='+id;
				});
				//console.log($('.header_search'));
			},
		};
		//初始化
		indexPage.init();


	});
});