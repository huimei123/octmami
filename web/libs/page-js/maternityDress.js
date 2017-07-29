require(['config'],function(){
	require(['jquery','common'],function($){
		
		//点击返回上一页
		$('.icon-xiangzuo').click(function(e){
			history.back();
		});
		//点击回滚到顶部
		//大于某个值显示top图标
		var scrolLen;
		$(window).scroll(function(){
			scrolLen = $(this).scrollTop();
			if(scrolLen>=150){
				$('.toTop').css('display','block');
			}else{
				$('.toTop').css('display','none');
			}
		})
		// 点击回滚到顶部
		// 给按钮绑定时间，实现返回顶部效果
		$('.toTop').on('click',function(e){
			//去掉a标签的默认跳转
			// 先获取滚动过的距离
			console.log(999);
			var timer = setInterval(function(){
				var scrollTop = $(window).scrollTop();//10000
				/*console.log(scrollTop);*/
				// 计算一个速度(可变速度)
				var speed = Math.ceil(scrollTop/10);
				scrollTop -= speed;
				// 滚动到顶部后停止定时器
				if(scrollTop <=0 || speed === 0){
					clearInterval(timer);
					scrollTop = 0;
				}
				window.scrollTo(0,scrollTop);
			},20);
			e.preventDefault();
		})
		//引入footer
		$('<section/>').addClass('footNav').load('footer.html',function(){
			$(this).insertAfter('.radiation-content');
		});
		//加载数据，
		$.post(toggle+'query/data',{key:"时尚上衣"},function(res){
			console.log(res);
			radiation(res);
		})
		$('.radiation-lable span').eq(0).addClass('active');
		//点击切换
		$('.radiation-lable').on('click','span',function(e){
			$('.radiation-lable span').removeClass('active');
			//切换高亮
			$(this).addClass('active');
			$('header h3').text($(this).text());
			$.post(toggle+'query/data',{key:$(this).text().slice(0,1)},function(res){
				$('.radiation-content').html('');
				console.log(res);
				radiation(res);
			})
		})
		//点击进入详情页
		$('.radiation-content').on('click','li',function(){
			console.log(999);
			location.href='./goodsinfo.html?id='+ $(this).attr('data-id');
		})
		function radiation(res){
			var $createUl = $('<ul/>');
			var str = '';
			if(res.data.length==0){
				str = '<span class="sustain">敬请期待</span>';
				$createUl.html(str).appendTo($('.radiation-content'));
			}else{
				res.data.forEach(function(item){
					str += `
						<li data-id="${item._id}">
							<div><img src="./libs/img/productImg/${item.productImg[0]}"/></div>
							<p><span class="freeSend">包邮</span></p>
							<p class="textProduct">${item.productName}</p>
							<p class="pricestyle"><span class="rad-price">￥${item.currentPrice}</span><span>￥${item.originPrice}</span></p>
						</li>
					`; 		
				});
				$createUl.html(str).appendTo($('.radiation-content'));
			}
		}
	})
})