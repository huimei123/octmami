var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('../dbhelper');

exports.account = function(app){

    app.post('/login', urlencodedParser, function(request, response){
        //请求数据库
        console.log(request.body);
        db.query('users',request.body,function(result){
            if(result.length > 0){
                //登录成功获取用户信息，购物车内容，收藏等
                //getDetails
                db.query('usersDetails',request.body,function(result){
                    response.send({status: true, message:'登录成功', data:result});
                    console.log('登录成功');
                })
            }else{ 
                response.send({status: true, message:'登录失败',data:[]});
                console.log('登录失败');
            }
        })
    })

    app.post('/regitster', urlencodedParser, function(request, response){
       /* 请求数据库
        注册用户
        先判断是否已注册*/
        console.log(request.body);
        db.query('users', request.body,function(result){
            console.log(result);
            if(result.length > 0){
                response.send({status: false, message:'已经注册'});
                console.log('已经注册');
            }else{ 
            //注册
                db.add('users',request.body,function(){
                    db.add('usersDetails',{username:request.body.username});
                    response.send({status: false, message:'注册成功'});
                    console.log('注册成功');
                })

            }
        })
    })
    //找回密码
    app.post('/getPassword',urlencodedParser,function(request, response){
        //搜索用户，找到用户，把之前的密码删除，添加新的，查找userName
        console.log(request.body);
        response.send({status: true, message:'获取密码'});
        db.query('users',{username:request.body.username},function(result){
            if(result.length>0){
                db.delete('users',request.body);
                db.add('users', request.body, function(data){
                    response.send({status: true, message: '密码修改成功'})
                    console.log('密码修改成功');
                })
            }else{ 
               response.send({status: false, message:'用户还没注册'});
                console.log('用户还没注册');
            }
        })
    })

}