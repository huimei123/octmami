var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = require('../dbhelper');

exports.account = function(app){

    app.post('/login', urlencodedParser, function(request, response){
        //请求数据库
         db.query('users',request.body,function(result){
           if(result.length>0){
                response.send({status: true, message:'登录成功', data:result});
                console.log('登录成功');
            }else{ 
                response.send({status: true, message:'登录失败', data:result});
                console.log('登录失败');
            }
        })
        
    })

    app.post('/regitster', urlencodedParser, function(request, response){
        //请求数据库
        //注册用户
        //先判断是否已注册
        db.query('users',request.body,function(result){
           if(result.length>0){
                response.send({status: false, message:'已经注册', data:result});
                console.log('已经注册');
            }else{ 
            //注册
                db.add('users', request.body, function(data){
                    if(data.status){
                        response.send({status: true, message: '注册成功'})
                        console.log('注册成功');
                    } else {
                        response.send({status: false, message: '注册失败'})
                    }
                })
            }
        })
    })
    //获取用户信息，购物车内容，收藏等
    app.get('/getAccounts', function(request, response){
        //请求数据库
        response.send({status: true, message: null, data: [{name: 'sam', age: 18}, {}]})
    })

}