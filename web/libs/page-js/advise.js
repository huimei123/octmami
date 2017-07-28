require(['config'],function(){
	require(['jquery'],function($){
		//插入底部
		$('<section/>').addClass('footNav').load('footer.html',function(){
			$(this).insertAfter('.advise');
		});
		//提交信息
		$('.advise .btn').on('touchstart',function(){
		
			if($('.txt').val()==''){
				
				$('.tan').stop(true).slideDown(1000).text('反馈内容不能为空').slideUp(2000);
			}else{
				$('.tan').stop(true).slideDown(1000).text('感谢你的反馈').slideUp(2000);
			}
		})
	});	
});
