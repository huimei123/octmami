var mongodb = require('mongodb'); 
//连接数据库服务器
var server = new mongodb.Server('localhost',27017);
var db = new mongodb.Db('octmami',server);
var querystring = require('querystring');

exports.getBrand = function(app){
	app.post('/getBrand',function(request, response){
		//res.send('注册post请求！');
		//注册业务逻辑,
		db.open(function(err,db){
			if(!err){
				db.collection('brand',function(error,collection){
					if(!error){
						collection.find().toArray(function(err, result){
							//console.log(err);
							//console.log(result);
							if(result.length>0){
								response.send({status: true, message: null, data:result});
								console.log('获取成功');
							}else{
								console.log('获取失败');
							}
							db.close();
						});	
					}
				})
			}else{
				console.log('获取失败');
			}
		})
		
	})
}