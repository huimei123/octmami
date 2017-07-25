require(['config'],function(){
	require(['jquery','common'],function($){
		// 插入底部
		$('<div/>').load('./footer.html',function(){
			$(this).insertAfter('.section');
		});
		
		// 清空输入框的内容
		$('.close_btn1').on('click',function(){
			$('#phone').val("");
						
		});
		$('.close_btn2').on('click',function(){
			$('#phoneYzm').val("");		
			
		});
		$('.close_btn3').on('click',function(){
			$('#passwd').val("");
						
		});
		$('.close_btn4').on('click',function(){
			$('#newPasswd').val("");		
			
		});

		//判断手机号是否正确
		$('#phone').on('blur',function(){
			
			var _username = this.value;
			
			if(!/^1[34578]\d{9}$/.test(_username)){
				$('.usernama_tips').show();
				setTimeout(function(){
					$('.usernama_tips').hide();
				},1000);
				return false;
			}
		});

		// 失去焦点时判断初始密码输入是否符合
		$('#passwd').on('blur',function(){
			
			var _passwd1 = this.value;
			
			if(!/^[^\s]{8,20}$/.test(_passwd1)){
				$('.passwd_tips').show();
				setTimeout(function(){
					$('.passwd_tips').hide();
				},1000);
				return false;
			}
		});



	});
});