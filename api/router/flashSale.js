var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = require('../dbhelper');
//限时特惠
exports.flashSale = function(app){
	app.post('/flashSale',urlencodedParser,function(request, response){
		//res.send('注册post请求！');
		//注册业务逻辑,
		//查询字符
		db.query('flashSale',{}, function(result){
			if(result.length>0){
				response.send({status: true, message:'获取成功', data:result});
				console.log('获取成功');
			}else{
				response.send({status: false, message:'获取失败', data:[]});
				console.log('获取失败');
			}
		});
	})
}