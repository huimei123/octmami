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
	})
})