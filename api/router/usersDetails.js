var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('../dbhelper');
//添加获取用户信息，主要购物车信息，收藏信息
exports.usersDetails = function(app){
	//获取用户信息
	app.post('/getusersDetails', urlencodedParser, function(request, response){
		
	});
	//更新修改用户信息
	app.post('/updateusersDetails', urlencodedParser, function(request, response){

	});

}