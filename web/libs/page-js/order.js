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
		var buyNow = JSON.parse(localStorage.buyNow);
		console.log(buyNow);
		$('.order_pro_pic img').attr('src',`./libs/img/productImg/${buyNow.img}`);
		$('.order_pro_text').text(buyNow.productName);
		$('.price').text(`¥${buyNow.price}`);
		$('.qty').text(buyNow.qty);


		//订单金额
		var sum = `¥${buyNow.price * buyNow.qty}`;
		$('.orderPrice').text(sum);
		$('.sum .price').text(sum);

		// 确认订单对象
		// var orderPage = {
		// 	var $address = $('.addAddress');
		// 	init : function(){
		// 		// this.$address.
		// 	}

		// 	// 添加地址

		// }
		// orderPage.init();
	});
});