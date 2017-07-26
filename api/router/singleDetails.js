var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('../dbhelper');
var ObjectID = require('mongodb').ObjectID;
//详情页
exports.singleDetails=function(app){
	app.post('/singleDetails',urlencodedParser,function(request, response){
		//查询字符
		console.log(request.body);
		var serchGood = {"_id":new ObjectID(String(request.body._id))};
		//console.log(request.body);
		console.log("_id值",serchGood);
		db.query('products',serchGood, function(result){
			//console.log(result);
			if(result.length>0){
				response.send({status: true, message:'商品详情获取成功', data:result});
				console.log('商品详情获取成功');
				return false;
			}else{
				db.query('timeLimit',serchGood, function(result){
					//console.log(serchGood);
					if(result.length>0){
						response.send({status: true, message:'商品详情获取成功', data:result});
						console.log('商品详情获取成功');
						return false;
					}else{		
						db.query('selection',serchGood, function(result){
							//console.log(serchGood);
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
			}
		})
	})
}