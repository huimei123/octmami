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
		/*$.ajax({
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
		});*/
		
		//首页对象
		var indexPage = {
			$toTop : $('.toTop'),
			$limitTime : $('.limitTime'),
			$choice: $('.choice'),
			$search:$('.header_search'),
			times:0,
			arrObj:[{url:toggle+'timeLimit',
						fn:function(res){
							$('.limitTime').hxLimitTime({
								data: res.data,
							});
						}},
					{url: toggle+'selection',
						fn:function(res){
							$('.choice').hxchoice({
								data: res.data,
							});
						}},
					{url: toggle+'flashSale',
						fn:function(res){
							$('.choiceOther').hxchoice({
								data: res.data,
								type:0,
							});
						}}
					],
			init : function(){
				this.fnAjax();
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
			fnAjax:function(){
				console.log(this.arrObj);
				//while(i<this.arrObj.length){
					$.ajax({
						url: this.arrObj[this.times].url,
						dataType:'json',
						type:'POST',
						success: function(res){
							console.log(res);
							if(res.status==true){
								this.arrObj[this.times].fn(res);
								//console.log(this.arrObj[i].fn);
								this.times++;
								if(this.times>=this.arrObj.length){
									//break;
								}else{
									this.fnAjax();
								}
								
							}
						}.bind(this)
					});
				//}
				
			},

		};
		//初始化
		indexPage.init();


	});
});