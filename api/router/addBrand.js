var express = require('express');
var app = express();
var path = require('path');
var mongodb = require('mongodb'); 
//连接数据库服务器
var server = new mongodb.Server('localhost',27017);
var db = new mongodb.Db('octDB',server);
var querystring = require('querystring');

