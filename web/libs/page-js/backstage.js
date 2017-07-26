require(['config'],function(){
	require(['jquery'],function(){
		var baseurl = 'http://10.3.134.228:8888/';
		var local = 'http://localhost:8888/';
		var toggle = baseurl;

		//打开页面请求加载数据库内容
		$.ajaxSetup({
			type:"post",
			url:toggle + "query",
			async:true,
			success:function(res){
				load(res);
			}

			
//		$.post('http://localhost:8888/query',function(result){
//			console.log(result);
//
//		});
});
		$.post();
		//导航二级菜单
		$('.main_left_second .yunfu').hide();
		$('.main_left_second ._yunfu').on('click',function(){
			$('.main_left_second .yunfu').toggle();
		})
		//导航二级切换商品信息
		$('.main_left_second .yunfu').eq(0).on('click',function(){
			$('.show_table tr').eq(0).siblings().html('');
			$.post(toggle+'query/data', {type:'下装'});
		});
		//搜索框搜索商品
		$('._search_left input').on('keydown',function(event){
			$('.show_table tr').eq(0).siblings().html('');
			//回车搜索
			if(event.keyCode==13){
				$.post(toggle+'query',function(res){
					
					$.each(res.data,function(idx,goods){
						if(goods.productName.indexOf($('._search_left input').val())>0){
							var  name=goods.productName;
							console.log(name);
							$.post(toggle+'query/data',{productName:name},function(res){
								load(res);
							});
						}
						
					})
				});
			}
		});
		//商品删除
		$('.show_table').on('click','.clear', function(){
			var clear=$(this).parent().parent().find('td').eq(1).text();
			$.post(toggle+'delete',{id:clear},function(){
				console.log('删除成功')
				$('.show_table tr').eq(0).siblings().html('');
				$.post();
			});
			
			
		});
		//商品修改
		
		var index=0;
		$('.show_table').on('click','.xiu', function(){
			_updata=$(this).parent().parent().find('td').eq(1).text();
			index=$(this).parent().parent().index();
			for(var i=0;i<12;i++){
				var message= $(this).parent().parent().find('td').eq(i+1).text();
				$(this).parent().parent().find('td').eq(i+1).html($("<input type='text' />").val(message));
				
			}
			
		});
		//保存修改信息
		$('._search_right_table .update').on('click',function(){
			saveData();
		});
		//添加商品
		$('._search_right_table .add').on('click',function(){
			console.log(123);
			$('.show_table tr').eq(1).before($('<tr/>'));
			for(var i=0;i<=13;i++){
				$('.show_table tr').eq(1).append($('<td/>').html("<input type='text'/>"));
			}
			$('.show_table tr').eq(1).find('td').eq(0).html("<input type='checkbox' />");
			$('.show_table tr').eq(1).find('td').eq(13).html($("<button class='xiu'>修改</button><button class='clear'>删除</button>"));
			
		});
		//确认添加商品
		$('._search_right_table .save').on("click",function(){
			dataInsert(index);
		})
		//数据id升降排序
		var num=-1;
		$('.show_table th').eq(1).on('click',function(){
			console.log(num);
			num*=-1;
			_id={id:num};
			$.post(toggle+'sort',{key:'id',num:num},function(res){
				console.log('id降序');
				$('.show_table tr').eq(0).siblings().html('');
				load(res);
				return num;
			});
		})
		
		
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
		});
		
		
		
	})
	
})
//加载页面数据
function load(res){
	$.each(res.data, function(idx,goods){
				//console.log(goods);
				//对象长度
				var count=0
				for(var key in goods){
					count++;
				}
	            //console.log(count);
	            //对象转成数组
	            var shop=[];
	            for(var key in goods){
	            	shop.push(goods[key]);
	            }
			    //插入tr,td
			    $('.show_table').append($('<tr/>'));
			    for(var i=0;i<=13;i++){
			    	$('.show_table tr').eq(idx+1).append($('<td/>'));
			    }
			    for(var j=0;j<=13;j++){
			    	$('.show_table tr').eq(idx+1).find('td').eq(j+1).text(shop[j+1]); 
			    }
			    $('.show_table tr').eq(idx+1).find('td').eq(0).html($("<input type='checkbox'>"));
			    $('.show_table tr').eq(idx+1).find('td').eq(9).text(goods.size);
			    var arr=[]
			    for(var key in goods.arguments){
			    	arr.push(goods.arguments[key]);
			    }
                  //console.log(arr);
                  $('.show_table tr').eq(idx+1).find('td').eq(11).text(arr);
                  $('.show_table tr').eq(idx+1).find('td').eq(12).text(goods.productInformation);
                  $('.show_table tr').eq(idx+1).find('td').eq(13).html($("<button class='xiu'>修改</button><button class='clear'>删除</button>"));
                  
              });	      	
	
	
}
//获取页面数据并插入
function dataInsert(index){
	//颜色字符转数组保存
	var color=$('.show_table tr').eq(1).find('td').eq(10).find('input').val();
	var _color=color.split(',');
	//尺寸
	var size=$('.show_table tr').eq(1).find('td').eq(9).find('input').val();
	var _size=size.split(',');
	var productImg = $('.show_table tr').eq(1).find('td').eq(7).find('input').val(),
	_productImg = productImg.split(',');
	//参数
	var arg=$('.show_table tr').eq(1).find('td').eq(11).find('input').val();
	var _arguments=arg.split(',');
	var datainsert={
		id:$('.show_table tr').eq(1).find('td').eq(1).find('input').val(),
		brand:$('.show_table tr').eq(1).find('td').eq(2).find('input').val(),
		productName:$('.show_table tr').eq(1).find('td').eq(3).find('input').val(),
		productDescription:$('.show_table tr').eq(1).find('td').eq(4).find('input').val(),
		currentPrice:$('.show_table tr').eq(1).find('td').eq(5).find('input').val(),
		originPrice:$('.show_table tr').eq(1).find('td').eq(6).find('input').val(),
		productImg:_productImg,
		type:$('.show_table tr').eq(1).find('td').eq(8).find('input').val(),
		size:_size,
		color:_color,
		arguments:_arguments,
		productInformation:$('.show_table tr').eq(1).find('td').eq(12).find('input').val()
	}
	console.log(datainsert)
	$.post(toggle+'add',JSON.stringify(datainsert),function(){
		console.log('成功插入')
		$('.show_table tr').eq(0).siblings().html('');
		$.post();
	});
	
}
//修改指定数据数据
function saveData(index){
	var _updata='';
	console.log(index);
	console.log($('.show_table tr').eq(index).find('td').eq(2).find('input').val());
	var newdata=$('.show_table tr').eq(index).find('td').eq(2).find('input').val();
	if(_updata!=''){
		var updateStr={
			brand:$('.show_table tr').eq(index).find('td').eq(2).find('input').val(),
			productName:$('.show_table tr').eq(index).find('td').eq(3).find('input').val(),
			productDescription:$('.show_table tr').eq(index).find('td').eq(4).find('input').val(),
			currentPrice:$('.show_table tr').eq(index).find('td').eq(5).find('input').val(),
			originPrice:$('.show_table tr').eq(index).find('td').eq(6).find('input').val(),
			productImg:$('.show_table tr').eq(index).find('td').eq(7).find('input').val(),
			type:$('.show_table tr').eq(index).find('td').eq(8).find('input').val(),
			size:$('.show_table tr').eq(index).find('td').eq(9).find('input').val(),
			color:$('.show_table tr').eq(index).find('td').eq(10).find('input').val(),
			arguments:$('.show_table tr').eq(index).find('td').eq(11).find('input').val(),
			productInformation:$('.show_table tr').eq(index).find('td').eq(12).find('input').val()
			
		};
		console.log(updateStr)
		$.post(toggle+'update',{id:_updata,brand:updateStr},function(){
			console.log('123')
			$('.show_table tr').eq(0).siblings().html('');
			$.post();
			
		});
	}else{
		alert('你没修改任何商品')
	}
}
