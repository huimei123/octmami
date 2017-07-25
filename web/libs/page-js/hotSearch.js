require(['config'],function(){
	require(['jquery','common'],function($){
		$('.abolish').on('click',function(){
			$('.search').val("");
		});
	});
});