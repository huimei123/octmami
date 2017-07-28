require(['config'],function(){
	require(['jquery','common'],function($){
		//点击返回上一页
		$('.icon-xiangzuo').click(function(e){
			history.back();
		});
	})
})