require(['config'],function(){
	require(['jquery','common'],function($){
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
		$.post(toggle+'query',function(res){
			showGoods(res);
		})
		//引入footer
		$('<section/>').addClass('footNav').load('footer.html',function(){
			$(this).insertAfter('.pdShow');
		});
		//封装生成列表页结构
		function showGoods(res){
			var data = res.data;
			html = '';
			html = data.map(function(item,idx){
				return `
					<li class="pd_new_list_detail">
						<a href="./goodsinfo.html?id=${item._id}">
							<div class="pd_show_s_img">
								<img src="./libs/img/productImg/${data[idx].productImg[0]}" alt="" />
							</div>
							<div class="pd_new_list_info">
								<p class="pd_show_list_name">
									${item.productName}                            
								</p>
								<div class="down">
								<span class="new_icon_promotion">免邮</span>
								<p class="pd_new_list_price">
									<span class="newPrice">￥${item.currentPrice}</span>
									<span class="oldPrice">￥${item.originPrice}</span>
								</p>
								</div>
							</div>
						</a>
					</li>
				`;
			}).join('');
			$('.pdShowList').append(html);
		}

	})
})