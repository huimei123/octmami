require(['config'],function(){
	require(['jquery','common'],function($){
		//选择省份
		$('.select_pro').on('click',function(){
			console.log(66);
			$.ajax({
				url : '../api/region.json',
				dataType :　'json',
				success : function(res){
					
					var data = res.regions;
					
					var html = '';
					for(var i = 0 ; i < data.length ;i ++){
						html += `
							<li>${data[i].name}</li>
						`;
					}
					$('.province').html(html);
					
					$('.province').show();
					$('.province').css('left',0.4);
				}
			});
		});
		//把选择的省份写进输入框
		$('.province')[0].addEventListener('click',function(e){
			
			e = e || window.event;
			var target = e.target || e.srcElement;
			if(target.nodeName.toLowerCase() === 'li'){
				$('.select_pro').text(target.innerText);
			}
			if($('.select_pro').length > 0){
				
				$('.province').hide();
				$('.province').css('left',-999);
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
					
					var data = res.regions;
					
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
					$('.city').css('left',1);
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
				$('.city').css('left',-999);
			}
		});

		//选择区县
		$('.select_county').on('click',function(){
			var countyIdx ; 
			var counthHtml = '';
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
					console.log(cityData);
					//匹配当前城市的区县
					for(var i = 0 ; i < cityData.length; i++){
						if(cityData[i].name == $('.select_city').text()){
							countyIdx = i ;
						}
					}
					//当前区县的数据
					var countyData = cityData[countyIdx].regions;
					console.log(countyData);
					counthHtml = countyData.map(function(item){
						return `
							<li>${item.name}</li>
						`;
					});
					$('.county').append(counthHtml);
					$('.county').show();
					$('.county').css('left',1);
				}
			});
			
		});

		//把选择的区县写进输入框
		$('.county')[0].addEventListener('click',function(e){
			e = e || window.event;
			var target = e.target || e.srcElement;
			if(target.nodeName.toLowerCase() === 'li'){
				$('.select_county').text(target.innerText);
			}
			if($('.select_county').length > 0){

				$('.county').hide();
				$('.county').css('left',-999);
			}
		});

	});


});