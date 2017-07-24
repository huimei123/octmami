require(['config'],function(){
	require(['jquery'],function(){
	
		$.post('http://localhost:8888/query',function(result){
			console.log(result);
		});
		//时间
		var newdate=new Date();
		var year=newdate.getFullYear()+'年';
		var month=newdate.getMonth()+1+'月';
		var day=newdate.getDate()+'日';
		var week=newdate.getDay();//星期
		var weekArr=['星期天','星期一','星期二','星期三','星期四','星期五','星期六',];
	
		$('.main_right_title_ul2 .time').text(year+month+day+weekArr[week]);
		//title当前位置
		$('.main_left_second li').on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.position').text($(this).text());
		})
		
	})
	
})