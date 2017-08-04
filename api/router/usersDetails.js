var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('../dbhelper');
var ObjectID = require('mongodb').ObjectID;
//添加获取用户信息，主要购物车信息，收藏信息
exports.usersDetails = function(app){
	//获取用户信息
	app.post('/getusersDetails', urlencodedParser, function(request, response){
		db.query('usersDetails',{"_id":new ObjectID(String(request.body._id))}, function(result){
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
		console.log('前端信息',request.body);
		var detailStr;
		var carStr;
		var newgoodStr = [];
		if(request.body.detailStr){
			detailStr = JSON.parse(request.body.detailStr);
			console.log('用户信息',detailStr);
		}
		if(request.body.carStr){
			carStr = JSON.parse(request.body.carStr);
			console.log('商品信息',carStr);
		}
		//console.log('_id',str.id);
		var serchGood = {"_id":new ObjectID(String(request.body.id))};
		function updatedata(str){
			db.update('usersDetails',serchGood,{$set:str},function(err, result){
				if(!err){
					db.query('usersDetails',serchGood, function(result){
						response.send({status: true, message:'用户信息更改成功', data:result});
						console.log('用户信息更改成功');
					})	
				}
			});
		}
		db.query('usersDetails',serchGood, function(result){
			//获取信息，判断是否有购物车的信息，用户信息，
			if(result.length>0){
				if(detailStr){
					updatedata({detailStr:detailStr});
				}	
				if(carStr){
					if(result.carStr){
						//判断是否已存在，判断存进来的尺码，颜色是否一样，
						newgoodStr = newgoodStr.push(result.carStr).push(carStr);
						updatedata({carStr:newgoodStr});
					}else{
						updatedata({carStr:[carStr]});
					}
				}	
			}else{
				response.send({status: true, message:'用户信息更改失败', data:result});
				console.log('用户信息更改失败');
			}
		})
	});

}