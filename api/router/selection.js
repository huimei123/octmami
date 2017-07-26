var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = require('../dbhelper');
//每日精选
exports.selection = function(app){
	app.post('/selection',urlencodedParser,function(request, response){
		//res.send('注册post请求！');
		//注册业务逻辑,
		//查询字符
		db.query('products',{}, function(result){
			if(result.length>0){
				response.send({status: true, message:'每日精选获取成功', data:result});
				console.log('每日精选获取成功');
			}else{
				response.send({status: false, message:'每日精选获取失败', data:[]});
				console.log('每日精选获取失败');
			}
		});
	})
}
