require(['config'],function(){
	require(['jquery'],function($){
		
		//插入底部
		/*$('<div/>').load('footer.html',function(){
			$(this).insertAfter('.list');
		});*/
		//状态判断是否加载完页面
		document.onreadystatechange = state;
			function state(){
				console.log(document.readyState);
				if(document.readyState == 'complete'){
					$('.loadPage').hide();
				} 
			}
		state();
		//引入footer
		$('<section/>').addClass('footNav').load('footer.html',function(){
			$(this).insertAfter('.login_button');
		});
		var goodsArr =[];
		var event;
		//var clickType;
		//返回主页
		$('.btnClick').click(function(){
			location.href='./index.html';
		});
		$('.footNav').show();
		goodsArr = JSON.parse(localStorage.getItem('shoppingcar'));
		console.log(goodsArr);
		//判断是否有商品，进行显示
		if(goodsArr==null){
			$('.footNav').hide();
			$('.foot').hide();
		}else{
			$('.goodsNull').hide();
			$('.foot').show();
			var html = goodsArr.map(function(item){
			//console.log(item);
			return`
				<li class="carList" data-id="${item.id}">
				<div class="select "></div>
				<img class="btn_img" src="./libs/img/productImg/${item.img}"/>
				<div class="productName">${item.productName}</div>
				<div class="attr"><span style="display:${item.size==""?"none":""}">尺寸:${item.size}</span>&nbsp;&nbsp;&nbsp;<span style="display:${item.color==""?"none":""}">颜色:${item.color}</span></div>
				<div class="price">¥${item.price}</div>
				<div class="baoyou">包邮</div>
				<div class="cal"><i class="jian">-</i><input type="text" value='${item.qty}'/><i class="jia">+</i></div>
				<div class="delete"></div>
				</li>
			`
			}).join("");
			$('<ui/>').html(html).appendTo($('.list'));
		}
			//console.log(goodsArr);
		//shoppingcar对象
		var pageShoppingCar ={
			$jia : $('.jia'),
			$jian : $('.jian'),
			$pageSpan : $('.total_price span'),
			$select_all : $('.select_all'),
			$btn_balance : $('.btn_balance'),
			$btn_img : $('.btn_img'),
			$list : $('.list'),
			$select_all : $('.select_all'),
			$delete :$('.delete'),
			init:function(){
				//点击跳转到详情页
				this.$btn_img.on('click',function(e){
					var id = $(e.target).parent().data('id');
					location.href = './goodsinfo.html?_id='+id;
				})
				//点击加商品
				this.$jia.on('click',function(e){
					//console.log($(this).index());
					var total=0;
					var num = $(e.target).parent().parent().find('input').val()*1;
					num++;
					var index = $(e.target).parent().parent().index();
					console.log( $(e.target).parent().parent().index());
					$(e.target).parent().parent().find('input').val(num);
					//console.log(goodsArr);
					goodsArr[index].qty = num;
					//console.log(goodsArr[index]['qty']);
					goodsArr.forEach(function(item,idx){
						if($('.select').eq(idx).hasClass('act')){
							total +=item.qty*1*(item.price.replace('.00',""));
						}
					})
					this.$pageSpan.text(total+'.00');
					
				}.bind(this));
				//点击减商品
				this.$jian.on('click',function(e){
					var total=0;
					var num = $(e.target).parent().parent().find('input').val()*1;
					if(num==1){
						num=1;
					}else{
						num--;
					}
					$(e.target).parent().parent().find('input').val(num);
					var index = $(e.target).parent().parent().index();
					console.log(index)
					$(e.target).parent().parent().find('input').val(num);
					//console.log(goodsArr);
					goodsArr[index].qty = num;
					//console.log(goodsArr[index]['qty']);
					goodsArr.forEach(function(item,idx){
						if($('.select').eq(idx).hasClass('act')){
							total +=item.qty*1*(item.price.replace('.00',""));
						}
						
					})
					this.$pageSpan.text(total+'.00');

				}.bind(this));
				//list选择
				this.$list.on('click','.select',function(e){
					var total=0;
					var times = 0;
					this.$select_all.addClass('act');
					$(e.target).hasClass('act')?$(e.target).removeClass('act'):$(e.target).addClass('act');
					goodsArr.forEach(function(item,idx){
						if($('.select').eq(idx).hasClass('act')){
							total +=item.qty*1*(item.price.replace('.00',""));
						}else{
							times++;
						}
					});
					if(times==goodsArr.length){
							this.$select_all.removeClass('act');
						}
					this.$pageSpan.text(total+'.00');
				}.bind(this));
				//全选
				this.$select_all.on('click',function(e){
					var total=0;
					$(e.target).hasClass('act')?selectAllNone():selectAll();
					function selectAll(){
						$(e.target).addClass('act')
						for(var i=0;i<goodsArr.length;i++){
							$('.select').eq(i).addClass('act');
						}
					}
					function selectAllNone(){
						$(e.target).removeClass('act');
						for(var i=0;i<goodsArr.length;i++){
							$('.select').eq(i).removeClass('act');
						}
					}
					
					goodsArr.forEach(function(item,idx){
						if($('.select').eq(idx).hasClass('act')){
							total +=item.qty*1*(item.price.replace('.00',""));
						}
						
					});
					this.$pageSpan.text(total+'.00');
				}.bind(this));
				//删除
				this.$delete.on('click',function(e){
					$('.tips').show();
					event = e;
						
				}.bind(this));
				//返回
				$('.head_arrow').on('click',function(){
					history.back();
				})
				//取消删除
				$('.btn_cancle').on('click',function(){
					clickType = false;
					$('.tips').hide();
				})
				//确定删除
				$('.btn_sure').on('click',function(){
					clickType = true;
					$('.tips').hide();
					var total=0;
					var index = $(event.target).parent().index();
					$('.carList').eq(index).remove();
					goodsArr.splice(index,1);
					console.log(goodsArr);
					goodsArr.forEach(function(item,idx){
						if($('.select').eq(idx).hasClass('act')){
							total +=item.qty*1*(item.price.replace('.00',""));
						}						
					});
					$('.total_price span').text(total+'.00');
					var stingObj =JSON.stringify(goodsArr); 
					//console.log(JSON.stringify(goodsArr));
					//console.log(JSON.parse(stingObj));
					var storage = window.localStorage;
					storage.setItem('shoppingcar',stingObj);
					if(goodsArr.length==0){
						$('.foot').hide();
						$('ul').show();
						//$('.footNav').show();
						$('.goodsNull').show();
						$('<section/>').addClass('footNav').load('footer.html',function(){
							$(this).insertAfter('.login_button');
						});
						storage.removeItem('shoppingcar');
					}else{
						$('.foot').show();
						$('ul').show();
						$('.footNav').hide();
						$('.goodsNull').hide();
					}
				})
			}
		}
		//初始化对象
		pageShoppingCar.init()
	});
});