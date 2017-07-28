require(['config'],function(){
	require(['jquery','common'],function($){
		//获取URL的参数值
		// function　getURLParams(key){
		// 	let params = location.search.slice(1).split('&');
		// 	let res = '';
		// 	params.forEach(function(item){
		// 		let arr = item.split('=');
		// 		if(arr[0] == key){
		// 			res = arr[1];
		// 		}
		// 	});
		// 	return res;
		// }

		// var id = getURLParams('id');
		// var username = getURLParams('username');
		$('.username').html(localStorage.username);

		var myIndex = {
			$loginOut :$('.login_out'),
			init : function(){
				this.$loginOut.on('click',function(){
					localStorage.username = '';
					localStorage.passwd = '';
				});
			}
		}
		myIndex.init();
	});
});
