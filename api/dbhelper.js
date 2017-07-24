//npm install mongodb --save-dev
var  mongodb = require('mongodb');
//联接 mongodb 服务器
var  server  = new mongodb.Server('localhost', 27017);
//指定要操作哪个数据库 => use  1000phone
var productionDB = 'octmamiDB';
var  db = new mongodb.Db(productionDB, server);

module.exports = {
    add: function(collection, data, callback){
        db.open(function(error, db){
            db.collection(collection, function(error, collection){
                collection.insert(data, function(){
                    if(callback && typeof callback == 'function'){
                        callback()
                    }
                })
            })
            db.close();
        })
    },
    //删除
    delete: function(collection, data, callback){
          db.open(function(error, db){
            db.collection(collection, function(error, collection){
                collection.remove(data,function(err, result){
                    if(callback && typeof callback == 'function'){
                        callback(result);
                    }
                })
            });
            db.close();
        });
    },
    //搜索
    query: function(collection, data, callback){
        db.open(function(error, db){
            db.collection(collection, function(error, collection){
                collection.find(data).toArray(function(err, result){
                    if(callback && typeof callback == 'function'){
                        callback(result);
                    }
                })
            });
            db.close();
        });
    },
    update: function(collection, data, callback){
         db.open(function(error, db){
            db.collection(collection, function(error, collection){
                collection.update(data, function(){
                    if(callback && typeof callback == 'function'){
                        callback()
                    }
                })
            })
            db.close();
        })
    }
}