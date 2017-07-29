require(['config'],function(){
	require(['jquery','common'],function($){
		
		//插入底部
		$('<div/>').load('footer.html',function(){
			$(this).insertAfter('.section');
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

		//获取URL的参数值
		let params = location.search.slice(1).split('=');
		let res = decodeURI(params[1]);
		var html = '';
		//获取URL地址传过来的搜索参数
		$('.header_title').text(res);
		//console.log(res)
		var tamp = $('.price').attr('data-tamp',1);
		//点击返回上一页
		$('.header_left a').click(function(e){
			history.back();
		})
		//请求匹配的数据
		$.ajax({
			url: toggle+'query/data' ,
			type: 'POST',
			data : {
				key : res,
			},
			success: function(res){
				showGoods(res);					
			}
		});
		//按价格排序
		$('.price').on('click',function(e){
			e.preventDefault();
			//点击切换排序方式
			console.log(999)
			//$('.price').addClass('priceActive');
			$('strong').addClass('priceActive');
			if($('.price').attr('data-tamp') == 1){
				$('.price').attr('data-tamp',-1);
				$('.icon-xiangshang').removeClass('priceActive');
				$('.icon-xiangxia').addClass('priceActive');
			}else{
				$('.price').attr('data-tamp',1);
				$('.icon-xiangxia').removeClass('priceActive');
				$('.icon-xiangshang').addClass('priceActive');

			}
			//请求数据
			$.ajax({
				url: toggle+'sort' ,
				type:'post',
				data :{
					key: 'currentPrice',
					num:$('.price').attr('data-tamp'),
				},
				success : function(res){
					//console.log(res);
					$('.pdShowList').html('');
					showGoods(res);	
				}
			});
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
	});

});