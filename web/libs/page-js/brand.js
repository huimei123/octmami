require(['config'],function(){
	require(['jquery','common'],function($){
		// $('body').load('header.html',function(){
		// 	console.log($('body'));
		// 	console.log($('.header'));
		// 	$('.header').prependTo($(this));
		// });
		console.log($('body'));
		$.ajax({
			url: 'http:127.0.0.1:8888/getBrand',
			type: 'post',
			success: function(res){
				console.log(res);
				var data = res.data;
				consoel.log(data);
			}
		});

	});
});