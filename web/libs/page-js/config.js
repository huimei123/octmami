require.config({
	paths : {
		jquery :　'../jquery/jquery-3.1.1',
		swiper : '../swiper/swiper-3.4.2.jquery.min',
		hxLimitTime : '../hxLimitTime/hx-limitTime',
		common : '../common/common',

	},
	shim : {
		swiper : ['jquery'],
		hxLimitTime : ['jquery'],
	}
});