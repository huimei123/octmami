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
		db.query('products',request.body, function(result){
			console.log(request.body);
			if(result.length>0){
				response.send({status: true, message:'根据条件获取成功', data:result});
				console.log('根据条件获取成功');
			}else{
				response.send({status: false, message:'根据条件获取失败', data:[]});
				console.log('根据条件获取失败');
			}

		})
	})
	//删除商品
	app.post('/delete',urlencodedParser,function(request, response){
		db.delete('products', request.body, function(result){
			if(result.length>0){
				response.send({status: true, message: '删除成功', data:result});
				console.log('删除成功');
			}else{
				response.send({status: false, message: '删除成功', data:[]});
				console.log('删除失败');
			}
		});
	})
	//添加商品
	app.post('/add',urlencodedParser,function(request, response){
		//console.log(request.body)
		console.log(request.body);
		var str = JSON.parse(request.body.datainsert);
		db.add('products',str, function(result){
			response.send({status: true, message: '添加成功', data:result});
			console.log('添加成功');
			
		});
	})
	//修改商品
	app.post('/update',urlencodedParser,function(request,response){
		console.log(request.body);
		var str = JSON.parse(request.body.updateStr);
		console.log("转码",str);
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
				response.send({status: true, message: '排序成功', data:result});
				console.log('排序成功');
			}else{
				response.send({status: true, message: '排序失败', data:[]});
				console.log('排序失败');
			}
		})
	})
}