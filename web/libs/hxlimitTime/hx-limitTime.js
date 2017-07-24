;(function($){
	$.fn.hxLimitTime = function(options){
		var defaults = {

		}

		var opt = $.extend({},defaults,options);
		//console.log(opt.data);
		return this.each(function(){
			var $div = $('<div/>').addClass('limitTitle');
			$div.appendTo($('.limitTime'));
			$('<i/>').addClass('imgClock').appendTo($div);
			$('<span/>').html('限时特惠').appendTo($div);
			var $limTime = $('<div/>').addClass('limTime').appendTo($div);
			$('<span/>').addClass('limHour').appendTo($limTime).html('60');
			$('<span/>').appendTo($limTime).html(':');
			$('<span/>').addClass('limMinu').appendTo($limTime).html('60');
			$('<span/>').appendTo($limTime).html(':');
			$('<span/>').addClass('limSec').appendTo($limTime).html('60');
			$('<a/>').addClass('limMore').appendTo($div).html('更多>');
			var THour = '01';
			var TMinu = '25';
			var TSec = '60'; 
			setInterval(function(){
				TSec--;
				if(TSec < 10 && TSec != 0){
					TSec = '0'+TSec;
				}else if(TSec == 0){
					TMinu--;
					TSec = '60';
				}
				$('.limSec').html(`${TSec}`);
				if(TMinu < 10 && TMinu != 0){
					TMinu ='0'+TMinu;
				}else if(TMinu == 0){
					THour--;
				}
				$('.limMinu').html(`${TMinu}`);
				$('.limHour').html(`${THour}`);
			},1000);
			var $litContent = $('<div/>').addClass('limContent').appendTo($('.limitTime'));
			
			var html = opt.data.map(function(item){
				//console.log(item);
				return`
					<li class="proLi"><img class="proImg" src = 'libs/img/productImg/${item.productImg[0]}'/><p class='proPrice'>¥:${item.currentPrice}</p><p class='proName'>${item.productDescription}</p></li>
				`
			}).join('');
			//console.log(html);
			$('<ul/>').addClass('proUl').html(html).appendTo($litContent);
		})
	}
})(jQuery);