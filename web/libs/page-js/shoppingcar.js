require(['config'],function(){
	require(['jquery'],function($){
		
		//插入底部
		/*$('<div/>').load('footer.html',function(){
			$(this).insertAfter('.list');
		});*/
		
		$('<section/>').addClass('footNav').load('footer.html',function(){
			$(this).insertAfter('.login_button');
		});
		var goodsArr =[];
		$('.btnClick').click(function(){
			location.href='./index.html';
		});
		if(localStorage.getItem('shoppingcar')==null){
			//console.log(111);
			$('.footNav').show();
		}else{
			//console.log(222);
			goodsArr = JSON.parse(localStorage.getItem('shoppingcar'));
			console.log(goodsArr);
			goodsArr.forEach(function(item){
			});
			$('.footNav').hide();
			$('.goodsNull').hide();
			//console.log(goodsArr);
			var html = goodsArr.map(function(item){
				//console.log(item);
				return`
					<li class="carList" data-id="${item.id}">
					<div class="select "></div>
					<img class="btn_img" src="./libs/img/productImg/${item.img}"/>
					<div class="productName">${item.productName}</div>
					<div class="attr"><span>尺寸:${item.size}</span>&nbsp;&nbsp;&nbsp;<span>颜色:${item.color}</span></div>
					<div class="price">¥${item.price}</div>
					<div class="baoyou">包邮</div>
					<div class="cal"><i class="jian">-</i><input type="text" value='${item.qty}'/><i class="jia">+</i></div>
					<div class="delete"></div>
					</li>
				`
			}).join("");
			$('<ui/>').html(html).appendTo($('.list'));

		}
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
				
				this.$btn_img.on('click',function(e){
					var id = $(e.target).parent().data('id');
					location.href = './goodsinfo.html?_id='+id;
				})
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
				this.$select_all.on('click',function(){

				});
				this.$btn_balance.on('click',function(){

				});

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

				this.$delete.on('click',function(e){
					var total=0;
					var index = $(e.target).parent().index();
					$('.carList').eq(index).remove();
					goodsArr.splice(index,1);
					console.log(goodsArr);
					goodsArr.forEach(function(item,idx){
						if($('.select').eq(idx).hasClass('act')){
							total +=item.qty*1*(item.price.replace('.00',""));
						}						
					});
					this.$pageSpan.text(total+'.00');
					if(goodsArr.length==0){
						$('.foot').hide();
						$('ul').hide();
						//$('.footNav').show();
						$('.goodsNull').show();
						$('<section/>').addClass('footNav').load('footer.html',function(){
							$(this).insertAfter('.login_button');
						});
					}else{
						$('.foot').show();
						$('ul').show();
						$('.footNav').hide();
						$('.goodsNull').hide();
					}
				}.bind(this));
			}
		}
		pageShoppingCar.init()
	});
});