var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('../dbhelper');
var ObjectID = require('mongodb').ObjectID;
//详情页
exports.singleDetails=function(app){
	app.post('/singleDetails',urlencodedParser,function(request, response){
		
		//查询字符
		var serchGood = {"_id":new ObjectID(String(request.body._id))};
		//console.log(request.body);
		db.query('timeLimit',serchGood, function(result){
			console.log(result);
			if(result.length>0){
				response.send({status: true, message:'商品详情获取成功', data:result});
				console.log('商品详情获取成功');
				return false;
			}else{
				db.query('octmamiProducts',serchGood, function(result){
					if(result.length>0){
						response.send({status: true, message:'商品详情获取成功', data:result});
						console.log('商品详情获取成功');
						return false;
					}else{		
						response.send({status: false, message:'商品详情获取失败', data:[]});
						console.log('商品详情获取失败');	
					}
				})
			}
		})
	})
}