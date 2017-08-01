require(['config'],function(){
	require(['jquery',],function($){

		//后退
		$('.header_left .icon').on('click',function(){
			history.back();
			
		});

		//获取localStorage的收件人信息
		var myAdress = JSON.parse(localStorage.myAdress);
		
		$('.receiver').text(myAdress.receiver);
		$('.phone').text(myAdress.phone);

		var address = `${myAdress.province}${myAdress.city}${myAdress.county}${myAdress.addressDetail}`;
		$('.addDetail').text(address);

		//获取订单信息
		var shoppingcar = JSON.parse(localStorage.shoppingcar);
		console.log(shoppingcar);
		// $('.order_pro_pic img').attr('src',`./libs/img/productImg/${buyNow.img}`);
		// $('.order_pro_text').text(buyNow.productName);
		// $('.price').text(`¥${buyNow.price}`);
		// $('.qty').text(buyNow.qty);


		//订单金额
		// var sum = `¥${buyNow.price * buyNow.qty}`;
		// $('.orderPrice').text(sum);
		// $('.sum .price').text(sum);

		// 确认订单对象
		var orderPage = {
			
			init : function(){
				var html ;
				html = shoppingcar.map(function(item,idx){
					return `
						<div class="order_pro_con">
							<div class="order_pro_pic">
								<img src="./libs/img/productImg/${item.img}">
							</div>
							<div class="order_pro_text">
								${item.productName}
							</div>
							<div class="order_pro_digital">
								<span class="price">${item.price}</span>
								X<span class="qty">${item.qty}</span>
							</div>
							
						</div> 
					`;
				});
				$('.feedback_main').before(html);

				//合计
				var sum;
				shoppingcar.forEach(function(item){
					sum = `¥${item.price * item.qty}`;
				});
				$('.sum .price').text(sum);
			}

			// 添加地址

		}
		orderPage.init();
	});
});