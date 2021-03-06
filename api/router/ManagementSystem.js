var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = require('../dbhelper');

exports.management = function(app){
	app.post('/query',urlencodedParser,function(request, response){
		//res.send('注册post请求！');
		//注册业务逻辑,
		//查询字符
		db.query('products',{}, function(result){
			if(result.length>0){
				response.send({status: true, message:'获取商品成功', data:result});
				console.log('获取商品成功');
			}else{
				response.send({status: false, message:'获取商品失败', data:[]});
				console.log('获取商品失败');
			}
		});
	})
	app.post('/query/data',urlencodedParser,function(request, response){
		//res.send('注册post请求！');
		//注册业务逻辑,
		//查询字符
		search(request,response);
	})
	function search(request,response){
		db.query('products',{}, function(result){
			var str = request.body.key;
			console.log(str);
			var newArr = [];
			//遍历结果放回数组
			//console.log(result);
			result.forEach(function(item,idx){
				//console.log(item);
				if(item.productName.indexOf(String(str))>=0){
					newArr.push(result[idx]);
				}
				if(item.type.indexOf(str)>=0){
					newArr.push(result[idx]);
				}
			})
			//console.log(newArr);
			//console.log(request.body);
			if(newArr.length>0){
				response.send({status: true, message:'根据条件获取成功', data:newArr});
				console.log('根据条件获取成功');
			}else{
				response.send({status: false, message:'根据条件获取失败', data:[]});
				console.log('根据条件获取失败');
			}
		})
	}
	//删除商品
	app.post('/delete',urlencodedParser,function(request, response){
		console.log(request.body);
		db.delete('products', request.body,function(result){
			if(result.length>0){
				response.send({status: true, message: '删除成功', data:result});
				console.log('删除成功');
			}else{
				response.send({status: false, message: '删除失败', data:[]});
				console.log('删除失败');
			}
		});
	})
	//删除多个商品
	app.post('/deleteNum',urlencodedParser,function(request, response){
		
		var str=JSON.parse(request.body.id)._arr;
		db.delete('products',{id:{ $in:str} },function(result){
			if(result.length>0){
				response.send({status: true, message: '删除成功', data:result});
				console.log('删除成功');
			}else{
				response.send({status: false, message: '删除失败', data:[]});
				console.log('删除失败');
			}
		});
	})
	//添加商品
	app.post('/add',urlencodedParser,function(request, response){
		//console.log(request.body)
		console.log(request.body);
		var str = JSON.parse(request.body.key);
		db.add('products',str, function(result){
			response.send({status: true, message: '添加成功', data:result});
			console.log('添加成功');
			
		});
	})
	//修改商品
	app.post('/update',urlencodedParser,function(request,response){
		console.log(request.body.updateStr);
		var str = JSON.parse(request.body.updateStr);
		//console.log(str);
	     db.update('products',{id:request.body.id},{$set:str},function(err,result){
	     	if(request.length>1){
	     		response.send({status:true,message:'更新成功',data:result})
	     	}else{
	     		response.send({status:false,message:'更新失败',data:[]})
	     	}
	     })
	})

	//排序
	app.post('/sort', urlencodedParser, function(request,response){
		console.log(request.body);
		db.sort('products',{[request.body.key]:Number(request.body.num)}, function(result){
			if(result.length>0){
				//获取相应的商品	
				var sortArr = [];
				//遍历结果放回数组
				//console.log(result);
				var str = request.body.val;
				result.forEach(function(item,idx){		
					if(item.productName.indexOf(String(str))>=0){
						sortArr.push(result[idx]);
					}
					if(item.type.indexOf(str)>=0){
						sortArr.push(result[idx]);
					}
				})
				response.send({status: true, message: '排序成功', data:sortArr});
				console.log('排序成功');
			}else{
				response.send({status: true, message: '排序失败', data:[]});
				console.log('排序失败');
			}
		})
	})
	//懒加载
	app.post('/lazy', urlencodedParser, function(request, response){
		console.log(request.body);
	    db.lazy('products',Number(request.body.limit),Number(request.body.skip),function(result){
	        if(result.length>0){
	            response.send({staus:true, message:'加载成功',data:result});
	            console.log("加载成功")
	        }else{
	            response.send({staus:true,message:'加载失败'});
	            console.log("加载失败")
	        }
	    })
	})
	//筛选
	app.post('/filtrate', urlencodedParser, function(request, response){
		console.log(request.body);
		var filterBrand = request.body.brand;
		var filterPrice = request.body.price;
		var brandArr = [];
		
		//判断信息为全部的
		if(filterBrand == '全部' || filterBrand == ''){
			db.query('products',{}, function(result){
				classPrice(result);
			})	
		}else{
			db.query('products',{}, function(result){
				var str = request.body.brand;
				console.log(str);
				var newArr = [];
				//遍历结果放回数组
				//console.log(result);
				result.forEach(function(item,idx){
					//console.log(item);
					if(item.productName.indexOf(String(str))>=0){
						newArr.push(result[idx]);
					}
					if(item.type.indexOf(str)>=0){
						newArr.push(result[idx]);
					}
				})
				//console.log(newArr);
				//console.log(request.body);
				if(newArr.length>0){
					classPrice(newArr);
					console.log('筛选成功');
				}else{
					response.send({staus:false, message:'筛选失败',data:lastArr});
					console.log('筛选失败');
				}
			})
		}
		//封装价格各种情况
		function classPrice(result){
			var lastprice = price(filterPrice);
			console.log(lastprice);
			var lastArr = [];
			//判断价格是否为全部
			if(!lastprice){
				response.send({staus:true, message:'筛选成功',data:result});
				console.log('价格全部')
			}else{
				console.log('价格')
				result.forEach(function(item, idx){
					//console.log(item);
					if(item.currentPrice > lastprice[0] && item.currentPrice<lastprice[1]){
						lastArr.push(item);
					}
					
				})
				console.log(lastArr.length);
				if(!lastArr.length==0){
					response.send({staus:true, message:'筛选成功',data:lastArr});
				}else{
					response.send({staus:false, message:'筛选失败',data:[]});
				}	
					
			}
		}
		//封装判断价格
		function price(filterPrice){
			var newArr = [];
			if(filterPrice == '全部' || filterPrice == ''){
				return false;
			}else{
				var arr = filterPrice.split('-');
				arr.forEach(function(item){
					if(item.indexOf('元') >=0 ){
						newArr.push(item.slice(0,item.length-1));
					}else{
						newArr.push(item);
					}
				})
				return newArr;
			}

		}
	})
	
}