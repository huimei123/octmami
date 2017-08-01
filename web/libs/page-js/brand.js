require(['config'],function(){
	require(['jquery','common'],function($){
		
		//插入底部
		$('<div/>').load('./footer.html',function(){
			$(this).insertAfter('.brands_main');
		});

		var pinyin = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','S','Y','Z']; 
		var spell = [];

		$.ajax({
			url: toggle + 'getBrand',
			type: 'POST',
			success: function(res){
				
				var data = res.data;
				console.log(data);
				
				//获取品牌首字母
				for(var i = 0 ; i < data.length ; i ++){
					spell.push(data[i].spell.toUpperCase().slice(0,1));
				}
				
				// 生成品牌分类结构
				for(var i = 0 ; i < pinyin.length ; i++){
					if(spell.indexOf(pinyin[i]) == -1){
						//如果当前首字母没有符合的品牌首字母，跳出当前循环
						 continue;
					}
					var html =`<p class="brands_title" id="${pinyin[i]}">${pinyin[i]}</p>`;
					//获取的数据
					for(var j = 0 ; j < spell.length; j++){
						if(pinyin[i] == spell[j]){
							html += `
								<ul class="new_brands">
									<li class="brands_list_set">
										<a class="brands_list" href="./goodsList.html?search= ${data[j].name}">
											<span>
												<img src="./libs/img/brandImg/${data[j].img}" />
											</span>
											<i>${data[j].name}</i>
										</a>
									</li>
								</ul>`;
						}
					}
					$('.brands_main').append(html);
				}

			}
		});
	});
});