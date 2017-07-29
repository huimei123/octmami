require(['config'],function(){
	require(['jquery','common'],function($){
		
		// 信息对象
		var babyInforPage = {
			$sex : $('.sex'),
			init : function(){
				// 切换性别
				this.$sex.on('click',function(){
					$(this).addClass('active').siblings().removeClass('active');
				});
			},
		}
		babyInforPage.init();
		$('.nickName').html(localStorage.username);
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
