;(function($){
	$.fn.hxchoice = function(options){
		var defaults = {

		}
		var opt = $.extend({},defaults,options);
		console.log("choice");
		return this.each(function(){
			$('<div/>').addClass('choiceTitle').append('<img  src = "./libs/img/pic_test_sectionFlashTitle_001.png"/>').appendTo($('.choice'));
		});
	}
})(jQuery);