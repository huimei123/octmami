require(['config'],function(){
	require(['jquery','common'],function($){
		// $('body').load('header.html',function(){
		// 	console.log($('body'));
		// 	console.log($('.header'));
		// 	$('.header').prependTo($(this));
		// });
		var pinyin = ['A','B','C','D','E','F','G']; 
		var spell = [];

		$.ajax({
			url: 'http:localhost:8888/getBrand',
			type: 'POST',
			success: function(res){
				
				var data = res.data;
				
				
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
										<a class="brands_list" href="">
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