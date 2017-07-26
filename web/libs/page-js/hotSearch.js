require(['config'],function(){
	require(['jquery','common'],function($){
		//取消
		$('.abolish').on('click',function(){
			$('.search').val("");
		});
		//插入底部
		$('<div/>').load('./footer.html',function(){
			$(this).insertAfter('.section');
		});

		$('.sousuokuang').on('click',function(e){
			e.preventDefault();
			console.log($('.search').val());
			location.href= './goodsList.html?search=' + $('.search').val();
		});
	});
});