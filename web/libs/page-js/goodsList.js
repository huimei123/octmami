require(['config'],function(){
	require(['jquery','common'],function($){
		//插入底部
		// $('<div/>').load('footer.html',function(){
		// 	$(this).insertAfter('.section');
		// });


		//生成列表页结构
		$.ajax({
			url: toggle+'query' ,
			type: 'POST',
			success: function(res){
				
				var data = res.data;
				console.log(data);
				var html = '';
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
									<p class="new_icon_promotion">免邮</p>
									<p class="pd_new_list_price">
										<span class="newPrice">￥${item.currentPrice}</span>
										<span class="oldPrice">￥${item.originPrice}</span>
									</p>
								</div>
							</a>
						</li>
					`;
				}).join('');
				$('.pdShowList').append(html);
			}
		});
		//升序
		$('.price').on('click',function(e){
			e.preventDefault();
			
			$.ajax({
				url: toggle+'sort' ,
				type:'post',
				data :{
					key: 'currentPrice',
					num: 1,
				},
				success : function(res){
					console.log(res);
					var data = res.data;
					$('.pdShowList').hide();
					var html = '';
					html = data.map(function(item,idx){
						return `
							<li class="pd_new_list_detail">
								<a href="">
									<div class="pd_show_s_img">
										<img src="./libs/img/productImg/${data[idx].productImg[0]}" alt="" />
									</div>
									<div class="pd_new_list_info">
										<p class="pd_show_list_name">
											${item.productName}                            
										</p>
										<p class="new_icon_promotion">免邮</p>
										<p class="pd_new_list_price">
											<span class="newPrice">￥${item.currentPrice}</span>
											<span class="oldPrice">￥${item.originPrice}</span>
										</p>
									</div>
								</a>
							</li>
						`;
					}).join('');
					$('.updShowList').append(html);
				},
			});
		});
		

	});
});