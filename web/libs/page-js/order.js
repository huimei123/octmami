require(['config'],function(){
	require(['jquery',],function($){

		//获取localStorage的收件人信息
		var myAdress = JSON.parse(localStorage.myAdress);
		
		$('.receiver').text(myAdress.receiver);
		$('.phone').text(myAdress.phone);

		var address = `${myAdress.province}${myAdress.city}${myAdress.county}${myAdress.addressDetail}`;
		$('.addDetail').text(address);

		//获取订单信息
		
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