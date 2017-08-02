require(['config'],function(){
	require(['jquery',],function($){
		$('.header_left .icon').on('click',function(){
			history.back();
		});
	});
});