var db = require('../dbhelper');

exports.getBrand = function(app){
	app.post('/getBrand',function(request, response){
		//res.send('注册post请求！');
		//注册业务逻辑,
		db.query('brand',{}, function(result){
			if(result.length>0){
				response.send({status: true, message:"品牌获取成功", data:result});
				console.log('品牌获取成功');
			}else{
				console.log('品牌获取失败');
			}
		});
		
	})
}