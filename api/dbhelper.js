//npm install mongodb --save-dev
var  mongodb = require('mongodb');
//联接 mongodb 服务器
var  server  = new mongodb.Server('10.3.134.228', 27017);
//指定要操作哪个数据库 => use  1000phone
var productionDB = 'octmamiDB';
var  db = new mongodb.Db(productionDB, server);

module.exports = {
    add: function(collection, data, callback){
        db.open(function(error, db){
            db.collection(collection, function(error, collection){
                collection.insert(data, function(err, result){
                    if(callback && typeof callback == 'function'){
                        callback(result)
                    }
                })
                db.close();
            })
            
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
                    db.close();
                })
            });
            
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
                    db.close();
                })
            });
            
        });
    },
    update: function(collection, olddata, newdata, callback){
        db.open(function(error, db){
            db.collection(collection, function(error, collection){
                collection.updateMany( olddata, newdata,function(err, result){
                    if(callback && typeof callback == 'function'){
                        callback(result)
                    }
                    db.close();
                })
            })
            
        })
    },
    sort: function(collection, data, callback){
        db.open(function(err,db){
            db.collection(collection,function(error,collection){
                collection.find({}).sort(data).toArray(function(error,result){
                    if(callback && typeof callback =='function' ){
                        callback(result);
                    }
                    db.close();
                })
            })
        })
    }
}
