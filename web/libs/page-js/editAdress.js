require(['config'],function(){
	require(['jquery','common'],function($){
		//选择省份
		$('.select_pro').on('click',function(){
			console.log(66);
			$.ajax({
				url : '../api/region.json',
				dataType :　'json',
				success : function(res){
					console.log(res.regions);
					var data = res.regions;
					console.log(data[21].name);
					var html = '';
					for(var i = 0 ; i < data.length ;i ++){
						html += `
							<li>${data[i].name}</li>
						`;
					}
					$('.province').html(html);
					$('.province').show();
				}
			});
		});
		//把选择的省份写进输入框
		$('.province')[0].addEventListener('click',function(e){
			console.log(55)
			e = e || window.event;
			var target = e.target || e.srcElement;
			if(target.nodeName.toLowerCase() === 'li'){
				$('.select_pro').text(target.innerText);
			}
			if($('.select_pro').length > 0){
				$('.province').hide();
			}
		});
		
		// 选择城市
		$('.select_city').on('click',function(){
			var cityIdx ; 
			var cityHtml = '';
			console.log($('.select_pro').text());
			// if($('.select_pro').length == 1) {
			// 	alert('请选择省份');
			// 	return;
			// }
			$.ajax({
				url : '../api/region.json',
				dataType :　'json',
				success : function(res){
					console.log(res);
					var data = res.regions;
					console.log(data);
					//匹配当前的省份，找到省份的索引值，找到该索引值的第二层regions
					for(var i = 0 ; i < data.length; i ++){
						if(data[i].name == $('.select_pro').text()){
							cityIdx =i;
						}
					}
					//当前省份的城市数据
					var cityData = data[cityIdx].regions;
					// 生成城市列表
					cityHtml = cityData.map(function(item){
						return `
							<li>${item.name}</li>
						`;
					});
					$('.city').append(cityHtml);
					$('.city').show();
				}
			});

		});
		//把选择的城市写进输入框
		$('.city')[0].addEventListener('click',function(e){
			e = e || window.event;
			var target = e.target || e.srcElement;
			if(target.nodeName.toLowerCase() === 'li'){
				$('.select_city').text(target.innerText);
			}
			if($('.select_city').length > 0){
				$('.city').hide();
			}
		});

		//选择区县
		

	});


});