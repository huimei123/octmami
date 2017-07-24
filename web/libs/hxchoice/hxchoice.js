;(function($){
	$.fn.hxchoice = function(options){
		var defaults = {

		}
		var opt = $.extend({},defaults,options);
		console.log("choice");
		return this.each(function(){
			$('<div/>').addClass('choiceTitle').append('<img  src = "./libs/img/pic_test_sectionFlashTitle_001.png"/>').appendTo($('.choice'));
			var html = opt.data.map(function(item){
				console.log(item);
				return`
					<li><img class="choiceImg" src="libs/img/productImg/${item.productImg[0]}" alt="" /><div class="fontKey">${item.brand}</div><div class="fontName">${item.productName}</div><div class="fontPri">¥:${item.originPrice}</div></li>
				`
			}).join('');
			console.log(html);
			$('<ul/>').addClass('choiceUl').append(html).appendTo($('.choice'));
		});
	}
})(jQuery);