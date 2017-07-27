;(function($){
	$.fn.hxchoice = function(options){
		var defaults = {
			type:1,
		}
		var opt = $.extend({},defaults,options);
		//console.log("choice");
		return this.each(function(){
			if(opt.type== 1){
				$('<div/>').addClass('choiceTitle').append('<img  src = "./libs/img/pic_test_sectionFlashTitle_001.png"/>').appendTo($('.choice'));
				var html = opt.data.map(function(item){
					//console.log(item);
					return`
						<li data-id="${item['_id']}"><img class="choiceImg" src="libs/img/productImg/${item.productImg[0]}" alt="" /><div class="fontKey">${item.brand}</div><div class="fontName">${item.productName}</div><div class="fontPri">¥ ${item.originPrice}</div></li>
					`
				}).join('');
				//console.log(html);
				$('<ul/>').addClass('choiceUl').append(html).appendTo($('.choice'));
			}else{
				$('<div/>').addClass('choiceTitle').append('<img  src = "./libs/img/pic_test_sectionFlashTitle_002.png"/>').appendTo($('.choiceOther'));
				var html = opt.data.map(function(item){
					//console.log(item.time.split('小时')[0]);
					if(parseInt(item.time.split('小时')[0]/24) == 0){
					var hour = "";
					}else{
						var hour = parseInt(item.time.split('小时')[0]/24) +' 天 ';
					}
					return`
						<li id="styleOther"><img class="imgOther" src="libs/img/productImg/${item.img[0]}" alt="" /><div class="nextTime"><span class="clock"></span>${hour}${item.time.split('小时')[0]%24} 时</div></li>
					`
				}).join('');
				//console.log(html);
				$('<ul/>').addClass('choiceUl').append(html).appendTo($('.choiceOther'));
			}
			
		});
	}
})(jQuery);