require(['config'],function(){
	require(['jquery','common'],function($){
		//插入底部
		$('<div/>').load('footer.html',function(){
			$(this).insertAfter('.section');
		});

		//获取URL的参数值
		
		let params = location.search.slice(1).split('=');
		let res = decodeURI(params[1]);
		var html = '';
		//获取URL地址传过来的搜索参数
		$('.header_title').text(res);
		console.log(res)
		var tamp = $('.price').attr('data-tamp',1);
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
<<<<<<< HEAD
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
=======
			if($('.price').attr('data-tamp') == 1){
				$('.price').attr('data-tamp',-1);
			}else{
				$('.price').attr('data-tamp',1);
>>>>>>> 0226c8728ad4c43204bdd6d4476fe4241ed33b58
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
				},
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
<<<<<<< HEAD
								<div class="down">
								<span class="new_icon_promotion">免邮</span>
=======
								<p class="new_icon_promotion">免邮</p>
>>>>>>> 0226c8728ad4c43204bdd6d4476fe4241ed33b58
								<p class="pd_new_list_price">
									<span class="newPrice">￥${item.currentPrice}</span>
									<span class="oldPrice">￥${item.originPrice}</span>
								</p>
<<<<<<< HEAD
								</div>
=======
>>>>>>> 0226c8728ad4c43204bdd6d4476fe4241ed33b58
							</div>
						</a>
					</li>
				`;
			}).join('');
			$('.pdShowList').append(html);
		}
	});
});