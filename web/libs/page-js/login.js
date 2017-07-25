require(['config'],function(){
	require(['jquery','common'],function($){
		$('.close_btn1').on('click',function(){
			$('#username').val("");
						
		});
		$('.close_btn2').on('click',function(){
			$('#passwd').val("");		
			
		});
		$.ajax({
			url : 'http://10.3.134.228:8888/login',
			type: 'POST',
			success: function(res){
				console.log(res);
			}
		});
		$('.getPd').on('click',function(){
			console.log(666);
			$.ajax({
				url : "http://10.3.134.228:8888/getPassword",
				data : {
					username: '18814133672',
					passwd: '123123',
				},
				type: 'POST',
				success: function(res){
					console.log(res);
				}
			});
		})	
	});
});