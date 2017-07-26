require(['config'],function(){
	require(['jquery'],function($){
		$('<section/>').addClass('footNav').load('footer.html',function(){
			$(this).insertAfter('.login_button');
		});
		var goodsArr =[];
		$('.btnClick').click(function(){
			location.href='./index.html';
		});
		if(localStorage.getItem('shoppingcar')==null){
			console.log(111);
		}else{
			console.log(222);
			goodsArr = JSON.parse(localStorage.getItem('shoppingcar'));
			goodsArr.forEach(function(item){
			});
			$('.goodsNull').hide();
			//console.log(goodsArr);
			var html = goodsArr.map(function(item){
				//console.log(item);
				return`
					<li class="carList"><img src="./libs/img/productImg/${item.productImg[0]}"/><div>${item.productName}</div><div class="price">¥:${item.currentPrice}</div><li>
				`
			}).join("");
			$('<ui/>').html(html).appendTo($('.list'));

		}
	});
});