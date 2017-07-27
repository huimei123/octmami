require(['config'],function(){
	require(['jquery','common'],function($){
		//切换性别
		

		// $('.girl')[0].onclick = function(){
		// 	this.classList.toggle('active');
		// }
		// $('.boy')[0].onclick = function(){
		// 	this.classList.toggle('active');
		// }

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
		$('.icon1').on('click',function(){
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
		$('.icon2').on('click',function(){
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
				console.log(666);
				$('.select_month').hide();
			}
		});
	});
});
