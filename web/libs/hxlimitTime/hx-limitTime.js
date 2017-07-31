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
			$('<span/>').addClass('limHour').appendTo($limTime).html('00');
			$('<span/>').appendTo($limTime).html(':').addClass('point');
			$('<span/>').addClass('limMinu').appendTo($limTime).html('00');
			$('<span/>').appendTo($limTime).html(':').addClass('point');
			$('<span/>').addClass('limSec').appendTo($limTime).html('00');
			$('<a/>').addClass('limMore').appendTo($div).html('更多>');
			//var endTime = '2017-8-1 15:00:00';
			//var end = Date.parse(endTime);
			var now = Date.now();
			var end = Number(now)+3734000;
			
			//console.log(now);
			calTime();
			setInterval(calTime,1000);
			function calTime (){
				var now = Date.now();
				var offsetTime = Math.floor((end-now)/1000);
				var secound = offsetTime%60>=10?offsetTime%60:"0"+offsetTime%60;
				var minute = Math.floor((offsetTime/60)%60)>=10?Math.floor((offsetTime/60)%60):"0"+Math.floor((offsetTime/60)%60);
				var hour = Math.floor((offsetTime)/60/60%24)>=10?Math.floor((offsetTime)/60/60%24):"0"+Math.floor((offsetTime)/60/60%24);
				$('.limSec').html(`${secound}`);
				$('.limMinu').html(`${minute}`);
				$('.limHour').html(`${hour}`);
			}
			var $litContent = $('<div/>').addClass('limContent').appendTo($('.limitTime'));
			
			var html = opt.data.map(function(item){
				//console.log(item);
				return`
					<li class="proLi" data-id="${item['_id']}"><img class="proImg" src = 'libs/img/productImg/${item.productImg[0]}'/><p class='proPrice'>¥ ${item.currentPrice}</p><p class='proName'>${item.productDescription}</p></li>
				`
			}).join('');
			//console.log(html);
			$('<ul/>').addClass('proUl').html(html).appendTo($litContent).attr('style',`width:${$('.proLi').outerWidth()*5}px`);
			console.log($('.proLi').outerWidth());
		})
	}
})(jQuery);