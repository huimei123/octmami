require(['config'],function(){
	require(['jquery','common'],function($){
		//切换性别
		

		// $('.girl')[0].onclick = function(){
		// 	this.classList.toggle('active');
		// }
		// $('.boy')[0].onclick = function(){
		// 	this.classList.toggle('active');
		// }

		// 信息对象
		var myInforPage = {
			$sex : $('.sex'),
			$saveBtn : $('.save_btn'),
			init : function(){
				// 切换性别
				this.$sex.on('click',function(){
					$(this).addClass('active').siblings().removeClass('active');
				});
				//保存个人信息,把个人信息保存在localstorage里
				this.$saveBtn.on('click',function(){
					
					var id = localStorage.id;
					console.log(id);
					var username = localStorage.username;
					//个人信息对象
					var infor = {
						id : id,
						username : username,
						nickname : $('.nickName').val(),
						gender : $('.active').text(),
						born : { 'year' : '1999', 'month' :'3'},
					};
					// 先用JSON.stringify()方法将json对象转换成字符串形式
					infor = JSON.stringify(infor);
					localStorage.setItem('myInfor',infor);

					infor = JSON.parse(localStorage.getItem('myInfor'));
					console.log(infor.born.year);

					$.ajax({

						url :  toggle+'updateusersDetails',
						type : 'post',						
						data : {
							data:JSON.stringify({
								id : infor.id,
								username : infor.username,
								nickname : infor.nickname,
								gender : infor.gender,
								born : { 'year' : infor.born.year, 'month' :infor.born.month},
							}),
						},
						success : function(res){
							console.log(res);
						}
					});
				});
			},
		}
		myInforPage.init();
		$('.nickName').attr('value',localStorage.username);
		//生成出生年份
		var now = new Date();
		var year = now.getFullYear();
		var html = '';
		for(var i = 1970; i <= year; i ++){
			html += `
				<li>${i}</li>
			`;
		}
		$('.select_year').html(html);

		
		//选择年份
		$('#b_year').on('click',function(e){
			e.stopPropagation();
			$('.select_year').show();
			
		});
		//把选择的年份写进输入框
		$('.select_year')[0].addEventListener('click',function(e){
			e = e || window.event;
			var target = e.target || e.srcElement;
			if(target.nodeName.toLowerCase() === 'li'){
				$('#b_year').val(target.innerText);
				console.log($('#b_year').val().length);
			}
			if($('#b_year').val().length > 0){
				console.log(666);
				$('.select_year').hide();
			}
		});

		// 生成月份
		var monthHtml = '';
		for(var i = 1; i <= 12; i ++){
			monthHtml += `
				<li>${i}</li>
			`;
		}
		$('.select_month').html(monthHtml);

		
		//选择年份
		$('#b_month').on('click',function(e){
			e.stopPropagation();
			$('.select_month').show();
			
		});
		
		//把选择的年份写进输入框
		$('.select_month')[0].addEventListener('click',function(e){
			e = e || window.event;
			var target = e.target || e.srcElement;
			if(target.nodeName.toLowerCase() === 'li'){
				$('#b_month').val(target.innerText);
				console.log($('#b_month').val().length);
			}
			if($('#b_month').val().length > 0){
				
				$('.select_month').hide();
			}
		});

		$(document).on('click',function(){
			console.log(666)
			$('.select_year').hide();
			$('.select_month').hide();
		})
	});
});
