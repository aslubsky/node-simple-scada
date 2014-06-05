var connect = require('connect');
var http = require('http');
var url = require('url');
var moment = require('moment');
var config = require(__dirname+'/../config').values;
var API = require(__dirname+'/api.js');


//var app = connect()
//  .use(connect.logger(config.web.logLevel))
//  .use(connect.static(__dirname+'/themes/default'))
//  .use(connect.directory(__dirname+'/themes/default'));
//
//
//http
//    .createServer(app)
//    .listen(config.web.port);


var apiInst = new API(config);
apiInst.run();
//http
//    .createServer(apiInst.handler)
//    .listen(config.api.port);