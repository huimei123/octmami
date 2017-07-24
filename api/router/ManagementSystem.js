var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = require('../dbhelper');

exports.management = function(app){
	app.post('/query',urlencodedParser,function(request, response){
		//res.send('注册post请求！');
		//注册业务逻辑,
		//查询字符
		db.query('octmamiProducts',{}, function(result){
			if(result.length>0){
				response.send({status: true, message:'获取成功', data:result});
				console.log('获取成功');
			}else{
				response.send({status: false, message:'获取失败', data:[]});
				console.log('获取失败');
			}
		});
	})
	app.post('/query/data',urlencodedParser,function(request, response){
		//res.send('注册post请求！');
		//注册业务逻辑,
		//查询字符
		db.query('octmamiProducts',request.body, function(result){
			console.log(request.body);
			if(result.length>0){
				response.send({status: true, message:'获取成功', data:result});
				console.log('获取成功');
			}else{
				response.send({status: false, message:'获取失败', data:[]});
				console.log('获取失败');
			}
		});
	})
	//删除商品
	app.post('/delete',urlencodedParser,function(request, response){
		db.delete('octmamiProducts', request.body, function(result){
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
		db.add('octmamiProducts',request.body, function(result){
			if(result.length>0){
				response.send({status: true, message: '添加成功', data:result});
				console.log('添加成功');
			}else{
				response.send({status: false, message: '添加失败', data:[]});
				console.log('添加失败');
			}
		});
	})
	//修改商品
	app.post('/update',urlencodedParser,function(request, response){
		console.log(request.body);
		//response.send({status: true, message: '修改成功'});
		console.log(request.body.brand)
		db.update('octmamiProducts',{id:request.body.id},{$set:request.body.brand}, function(result){
			response.send({status: true, message: '修改成功', data:result});
			console.log('修改成功');
		});
	})

}