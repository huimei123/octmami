require(['config'],function(){
	require(['jquery'],function(){
		var baseurl = 'http://10.3.134.218:8888/';
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
			$.post(toggle+'query/data',{key:$(".prenant").text()},function(res){
				console.log(res);
				load(res);
			});
		});
		//搜索框搜索商品
		$('._search_left input').keydown(function(event){
			$('.show_table tr').eq(0).siblings().html('');
			//回车搜索
			if(event.keyCode == 13){
				$.post(toggle+'query/data',{key:$(".serchInput").val()},function(res){
					console.log(res);
					load(res);
				});
			}
		});
		//搜索框为空
		$('.serchInput').on('input',function(){
			if($(this).val()==''){
				$('.show_table tr').eq(0).siblings().html('');
				$.post();
			}
		})
		//商品内部删除
		$('.show_table').on('click','.clear', function(){
			var clear=$(this).parent().parent().find('td').eq(1).text();
			$.post(toggle+'delete',{id:clear},function(){
				console.log('删除成功')
				$('.show_table tr').eq(0).siblings().html('');
				$.post();
			});
			
			
		});
		
		//全选
		$('.show_table th').eq(0).on('click','input',function(){
			$('.show_table tr input').prop('checked',$(this).prop('checked'))
		})
		//取消全选
		$('.show_table ').on('click','.select' ,function(){
			if($(this).prop('checked')==false){
				console.log(123)
				$('.show_table .all').prop('checked',false);
			}
			var all=true;
			for(var i=0;i<$('.show_table tr').length-1;i++){
				if($('.show_table .select').eq(i).prop('checked')==false){
					console.log(23213)
					all=false
				}else if(all==true){
					$('.show_table .all').prop('checked',true);
				       }
			}
		})
		//商品外部删除
		 $('._search_right_table .remove').on('click',function(){
		 	var arr=[];
		 	for(var i=0;i<$('.show_table tr').length-1;i++){
				if($('.show_table .select').eq(i).prop('checked')==true){
				   arr.push($('.show_table .select').eq(i).parent().parent().find('td').eq(1).text());
			        
				}
			}
		 	var _arr={_arr:arr};
		 	$.post(toggle+'deleteNum',{id:JSON.stringify(_arr)},function(){
				    console.log('删除成功')
				    $('.show_table tr').eq(0).siblings().html('');
				    $.post();
			 });
		 	
		 })
		//商品修改
		
		var index=1;
		var _updata='';
		
		$('.show_table').on('click','.xiu', function(){
			_updata=$(this).parent().parent().find('td').eq(1).text();
			index=$(this).parent().parent().index();
			for(var i=1;i<12;i++){
				var message= $(this).parent().parent().find('td').eq(i+1).text();
				$(this).parent().parent().find('td').eq(i+1).html($("<input type='text' />").val(message));
				
			}
			//return index;
		});
		
		//保存修改信息
		$('._search_right_table .update').on('click',function(){
			saveData(index,_updata);
		});
		//添加商品
		$('._search_right_table .add').on('click',function(){
            $('.show_table tr').eq(0).siblings().html('');
            $('.show_table').append($('<tr/>'));
            $('.show_table tr').eq(1).append($('<h3/>').text('填写商品属性'));
            $('.show_table tr').eq(1).append($("<label>id:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>品牌:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>产品名:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>产品描述:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>当前价格:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>原始价格:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>商品图片:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>类别:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>尺码:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>颜色:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>参数:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>商品信息:</label><input class='ipt' type='text'/>"));
			$('.show_table tr').eq(1).append($("<label>上传图片:</label><input class='ipt' type='file'/>"));
		});
		//确认添加商品
		$('._search_right_table .save').on("click",function(){
			dataInsert();
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
			    $('.show_table tr').eq(idx+1).find('td').eq(0).html($("<input type='checkbox' class='select'>"));
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
function dataInsert(){
	//颜色字符转数组保存
	var color=$('.show_table .ipt').eq(9).val();
	var _color=color.split(',');
	//尺寸字符转数组保存
	var size=$('.show_table .ipt').eq(8).val();
	var _size=size.split(',');
	//商品图片字符转数组保存
	var productImg = $('.show_table .ipt').eq(6).val();
	var  _productImg = productImg.split(',');
	//商品信息字符转数组保存
	var productInformation= $('.show_table .ipt').eq(11).val();
	var _productInformation = productInformation.split(',');
	//参数字符转数组保存
	var arg=$('.show_table .ipt').eq(10).val();
	var _arguments=arg.split(',');
	var datainsert={
		id:$('.show_table .ipt').eq(0).val(),
		brand:$('.show_table .ipt').eq(1).val(),
		productName:$('.show_table .ipt').eq(2).val(),
		productDescription:$('.show_table .ipt').eq(3).val(),
		currentPrice:$('.show_table .ipt').eq(4).val(),
		originPrice:$('.show_table .ipt').eq(5).val(),
		productImg:_productImg,
		type:$('.show_table .ipt').eq(7).val(),
		size:_size,
		color:_color,
		arguments:_arguments,
		productInformation:_productInformation
	}
	
	console.log(datainsert)
	if(datainsert.id==''){
		alert('id不能为空')
	}else{
	$.post(toggle+'add',{key:JSON.stringify(datainsert)},function(){
		console.log('成功插入')
		$('.show_table tr').eq(0).siblings().html('');
		$.post();
	});
	}
}
//修改指定数据数据
function saveData(index,_updata){
	console.log(index);
	if(_updata!=''){
	//console.log($('.show_table tr').eq(index).find('td').eq(10).find('input').val())
	//颜色字符转数组保存
	var color=$('.show_table tr').eq(index).find('td').eq(10).find('input').val();
	var _color=color.split(',');
	//尺寸字符转数组保存
	var size=$('.show_table tr').eq(index).find('td').eq(9).find('input').val();
	var _size=size.split(',');
	//商品图片字符转数组保存
	var productImg = $('.show_table tr').eq(index).find('td').eq(7).find('input').val();
	var  _productImg = productImg.split(',');
	//商品信息字符转数组保存
	var productInformation= $('.show_table tr').eq(index).find('td').eq(12).find('input').val();
	var _productInformation = productInformation.split(',');
	//参数字符转数组保存
	var arg=$('.show_table tr').eq(index).find('td').eq(11).find('input').val();
	var _arguments=arg.split(',');
	var newdata=$('.show_table tr').eq(index).find('td').eq(2).find('input').val();
	//判断是否点击修改
	
		var updateStr={
			brand:$('.show_table tr').eq(index).find('td').eq(2).find('input').val(),
			productName:$('.show_table tr').eq(index).find('td').eq(3).find('input').val(),
			productDescription:$('.show_table tr').eq(index).find('td').eq(4).find('input').val(),
			currentPrice:$('.show_table tr').eq(index).find('td').eq(5).find('input').val(),
			originPrice:$('.show_table tr').eq(index).find('td').eq(6).find('input').val(),
			productImg:_productImg,
			type:$('.show_table tr').eq(index).find('td').eq(8).find('input').val(),
			size:_size,
			color:_color,
			arguments:_arguments,
			productInformation:_productInformation
			
		};
		console.log(updateStr)
		
		$.post(toggle+'update',{id:_updata,updateStr:JSON.stringify(updateStr)},function(){
			console.log('123')
			$('.show_table tr').eq(0).siblings().html('');
			$.post();
			
		});
	}else{
		alert('你没修改任何商品')
	}
}






});
	
});