var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('../dbhelper');
var ObjectID = require('mongodb').ObjectID;
//添加获取用户信息，主要购物车信息，收藏信息
exports.usersDetails = function(app){
	//获取用户信息
	app.post('/getusersDetails', urlencodedParser, function(request, response){
		db.query('usersDetails',request.body, function(result){
			if(result.length>0){
				response.send({status: true, message:'获取用户信息成功', data:result});
				console.log('获取用户信息成功');
			}else{
				response.send({status: true, message:'获取用户信息失败', data:result});
				console.log('获取用户信息失败');
			}
		})
	});
	//更新修改用户信息,购物车，收藏等
	app.post('/updateusersDetails', urlencodedParser, function(request, response){

		console.log('修改个人信息',request.body);
		var serchGood = {"_id":new ObjectID(String(request.body._id))};
		db.query('usersDetails',{username:request.body.username}, function(result){

			if(result.length>0){
				db.update('usersDetails',serchGood,str,function(err, result){
					if(!err){
						db.query('usersDetails',serchGood, function(result){
							response.send({status: true, message:'用户信息更改成功', data:result});
							console.log('返回',result);
						})	
					}
				});
			}else{
				response.send({status: true, message:'用户信息更改失败', data:result});
				console.log('用户信息更改失败');
			}
		})
	});

}