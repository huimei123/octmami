require(['config'],function(){
	require(['jquery','common'],function($){
		// 插入底部
		$('<div/>').load('./footer.html',function(){
			$(this).insertAfter('.section');
		});


		// 清空输入框的内容
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
	});
});