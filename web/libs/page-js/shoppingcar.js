require(['config'],function(){
	require(['jquery'],function($){
		
		//插入底部
		/*$('<div/>').load('footer.html',function(){
			$(this).insertAfter('.list');
		});*/
		
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
			console.log(goodsArr);
			goodsArr.forEach(function(item){
			});
			$('.goodsNull').hide();
			//console.log(goodsArr);
			var html = goodsArr.map(function(item){
				//console.log(item);
				return`
					<li class="carList">
					<div class="select act"></div>
					<img src="./libs/img/productImg/${item.img}"/>
					<div class="productName">${item.productName}</div>
					<div class="attr"><span>尺寸:${item.size}</span>&nbsp;&nbsp;&nbsp;<span>颜色:${item.color}</span></div>
					<div class="price">¥${item.price}</div>
					<div class="baoyou">包邮</div>
					<div class="cal"><a class="jian">-</a><input type="text" value='1'/><a class="jia">+</a></div>
					<div class="delete"></div>
					<li>
				`
			}).join("");
			$('<ui/>').html(html).appendTo($('.list'));

		}
	});
});