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

		//点击搜索框进行搜索
		$('.sousuokuang').on('click',function(e){
			e.preventDefault();
			console.log($('.search').val());
			location.href= './goodsList.html?search=' + $('.search').val();

			// $.ajax({
			// 	url : toggle + 'query/data',
			// 	type : 'post',
			// 	data : {
			// 		key : $('.search').val(),
			// 	},
			// 	success : function(res){
			// 		console.log(res)
			// 	}
			// });
		});



	});
});