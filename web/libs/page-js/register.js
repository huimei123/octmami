require(['config'],function(){
	require(['jquery','common'],function($){

		// 插入底部
		$('<div/>').load('./footer.html',function(){
			$(this).insertAfter('.section');
		});

		//判断注册条件
		var username = document.querySelector('#username');
		var passwd = document.querySelector('#passwd');

		//判断手机号是否正确
		$(username).on('blur',function(){
			
			var _username = this.value;
			
			if(!/^1[34578]\d{9}$/.test(_username)){
				$('.usernama_tips').show();
				setTimeout(function(){
					$('.usernama_tips').hide();
				},1000);
				return false;
			}
		});

		// 清除输入框的内容
		console.log($('.close_btn1'));
		$('.close_btn1').on('click',function(){
			console.log(666)
			$('#username').val("");
						
		});
		$('.close_btn2').on('click',function(){
			$('#passwd').val("");		
			
		});
		
		$.ajax({
			url : 'http://10.3.134.228:8888/regitster',
			type: 'POST',
			success: function(res){
				console.log(res);
			}
		});

	});
});