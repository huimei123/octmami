var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = require('../dbhelper');

exports.timeLimit = function(app){
	app.post('/timeLimit',function(request, response){
		//res.send('注册post请求！');
		//注册业务逻辑,
		//查询字符
		db.query('timeLimit',{}, function(result){
			if(result.length>0){
				response.send({status: true, message:'获取限时特惠成功', data:result});
				console.log('获取限时特惠成功');
			}else{
				response.send({status: false, message:'获取限时特惠失败', data:[]});
				console.log('获取限时特惠失败');
			}
		});
	})
}