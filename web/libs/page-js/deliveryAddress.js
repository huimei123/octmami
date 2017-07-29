require(['config'],function(){
	require(['jquery'],function($){
		var myAdress = JSON.parse(localStorage.myAdress);
		
		$('.user').text(myAdress.receiver);
		$('.phone').text(myAdress.phone);

		var address = `${myAdress.province}${myAdress.city}${myAdress.county}${myAdress.addressDetail}`;
		$('.deliver').text(address);
	});
});