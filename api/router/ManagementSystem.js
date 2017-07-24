var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = require('../dbhelper');

exports.management = function(app){
	app.post('/management/query',function(request, response){
		//res.send('注册post请求！');
		//注册业务逻辑,
		//查询字符
		db.query('products',{}, function(result){
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
	app.post('/management/delete',function(request, response){
		db.delete('products', request.body, function(result){
			if(result.length>0){
				response.send({status: true, message: '删除成功', data:result});
				console.log('删除成功');
			}else{
				response.send({status: false, message: '删除成功', data:[]});
				console.log('删除失败');
			}
			db.close();
		});
	})
	//添加商品
	app.post('/management/add',function(request, response){
		db.add('products', request.body, function(result){
			if(result.length>0){
				response.send({status: true, message: '添加成功', data:result});
				console.log('添加成功');
			}else{
				response.send({status: false, message: '添加失败', data:[]});
				console.log('添加失败');
			}
			db.close();
		});
	})
	//修改商品
	app.post('/management/update',function(request, response){
		db.update('products', request.body, function(result){
			if(result.length>0){
				response.send({status: true, message: '修改成功', data:result});
				console.log('修改成功');
			}else{
				response.send({status: false, message: '修改失败', data:[]});
				console.log('修改失败');
			}
			db.close();
		});
	})

}