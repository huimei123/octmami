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

		//显示登录信息错误提交框
		function error(){
			$('.tips').show();
			setTimeout(function(){
				$('.tips').hide();
			},1000);
		}


		//登录
		$('.login_btn').on('click',function(e){
			e.preventDefault();
			var timer = setInterval(function(){
				$('.loadPage').show();
			},200);

			$.ajax({
				url : toggle+'login',
				type: 'POST',
				data:{
					username:$('#username').val() + '',
					passwd:$('#passwd').val() + '',
				},
				success: function(res){
					console.log(res);
					var status = res.status;
					
					var data = res.data;
					if(status == true){
						localStorage.id = res.data[0]._id;
						localStorage.username = $('#username').val();
						clearInterval(timer);
						location.href = './myIndex.html?id=' + data[0]._id + '&username=' + data[0].username;
					}
					else{
						error();
					}
				}
			});
			
		})
		
	});
});