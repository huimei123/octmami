require(['config'],function(){
	require(['jquery'],function($){
		$('li a span').on('click',function(e){
			e.preventDefault();
			var url = $(this).text()
			location.href='./goodsList.html?search=' + url;
		})
		$('li a').on('click',function(e){
			e.preventDefault();
			var url = $(this).text()
			location.href='./goodsList.html?search=' + url;
		})
		//引入footer
		$('<section/>').addClass('footNav').load('footer.html',function(){
			$(this).insertAfter('.classify-content');
		});
		//点击返回上一页
		$('.icon-xiangzuo').click(function(e){
			history.back();
		})
	})
})