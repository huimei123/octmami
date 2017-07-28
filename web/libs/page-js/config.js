require.config({
	paths : {
		jquery :　'../jquery/jquery-3.1.1',
		swiper : '../swiper/swiper-3.4.2.jquery.min',
		hxLimitTime : '../hxLimitTime/hx-limitTime',
		common : '../common/common',
		hxchoice : '../hxchoice/hxchoice',
		bootstrap : '../bootstrap/bootstrap.min',
		lazyload : '../tuupola-jquery_lazyload/jquery.lazyload.min',
		textual : '../textual/clamp'
	},
	shim : {
		swiper : ['jquery'],
		hxLimitTime : ['jquery'],
		hxchoice : ['jquery'],
		bootstrap : ['jquery'],
		lazyload : ['jquery'],
		common: ['jquery'],
	}
});