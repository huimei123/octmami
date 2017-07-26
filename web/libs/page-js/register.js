require(['config'],function(){
	require(['jquery','common'],function($){

		// 插入底部
		$('<div/>').load('./footer.html',function(){
			$(this).insertAfter('.section');
		});


		var letter1 = '';
		var letter2 = '';
		//随机生成验证码
		function yzm(){
			var code = ["A","B","C","D","E","F","G","H","I","J","K","L","N","M","O","P","Q","R","S","T","V","W","S","Y","Z","a","b","c","d","e","f",
			"g","h","i","j","k","l","n","m","o","p","q","r","s","t","u","v","w","x","y","z",1,2,3,4,5,6,7,8,9,0];
			for(var i = 0 ; i < 4; i ++){
				var idx = parseInt(Math.random() * code.length); 
				letter1 += code[idx];
				
			}
			$('.regCode1').text(letter1);
		}

		//随机生成手机校验码
		function phoneLetter(){
			var code = [1,2,3,4,5,6,7,8,9,0];
			for(var i = 0 ; i < 4; i ++){
				var idx = parseInt(Math.random() * code.length); 
				letter2 += code[idx];
			}
			$('.regCode2').text(letter2);
		}
		yzm();
		phoneLetter();



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
		
		//判读密码 8-20位
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

		//判断验证码
		$('#yzm').on('blur',function(){
			var _yzm = this.value;
			if(_yzm !== letter1){
				$('.yzm_tips').show();
				setTimeout(function(){
					$('.yzm_tips').hide();
				},1000);
				return false;
			}
		});

		//判断手机验证码
		$('#phone').on('blur',function(){
			var _phone = this.value;
			if(_phone !== letter2){
				$('.phone_tips').show();
				setTimeout(function(){
					$('.phone_tips').hide();
				},1000);
				return false;
			}
		});
		

		// 清除输入框的内容
		$('.close_btn1').on('click',function(){
			$('#username').val("");			
		});
		$('.close_btn2').on('click',function(){
			$('#passwd').val("");		
		});
		
		//显示注册信息错误提交框
		function error(){
			$('.register_tips').show();
			setTimeout(function(){
				$('.register_tips').hide();
			},1000);
		}

		//注册用户
		$('.reg_btn').click('click',function(e){
			e.preventDefault();
			var _username = $('#username').val();
			var _passwd1 = $('#passwd').val();
			var _yzm = $('#yzm').val();
			var _phone = $('#phone').val();
			if(!/^1[34578]\d{9}$/.test(_username)){
				error();
				return false;

			}
			else if(!/^[^\s]{8,20}$/.test(_passwd1)){
				error();
				return false;
			}else if(_yzm !== letter1){
				// error();
				return false;
			}else if(_phone !== letter2){
				// error();
				return false;
			}
			
			$.ajax({
				url: toggle+'regitster',
				type: 'post',
				data: {
					username :　$('#username').val()+"",
					passwd : $('#passwd').val()+"",
				},
				success: function(res){
					console.log(res);
				}
			})
		});
		
		

	});
});