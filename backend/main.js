//var async = require('async');
var _ = require('lodash');
var moment = require('moment');
var config = require('./../config').values;
var GPIO = require('./data-sources/gpio.js');
var ModBus = require('./data-sources/modbus.js');
var dbClass = require('./db');

var io = require('socket.io')
    .listen(config.socketio.port, {
        'log level': config.socketio.logLevel
    });
var stdio = require('stdio');
var winston = require('winston');

(function() {
    var self = this;
    this.logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                level: 'info'
            }),
            new (winston.transports.File)({
                level: 'error',
                filename: __dirname+'/log/main.log',
                maxsize: 1024*1024*10//10MB
            })
        ]
    });
    this.opts = stdio.getopt({
        'emulate': {args: 1, key: 'e', description: 'Emulate data source'},
        'archive': {args: 1, key: 'a', mandatory: true, description: 'Archive all data in to DB'}
    });
    
    this.db = new dbClass(config.mysql, this.logger);
    
    this.dataSourcesList = [];
    
    this.runDataSource = function (ds) {
        setTimeout(function () {
            ds.read(self.onDataRead);
        }, ds.getTime());
    }
    this.onDataRead = function (err, ds, value) {
        //console.log(ds.getName(), value);
        if(err === null) {
            io.sockets.emit('onDataRead', {
                name: ds.getName(),
                time: (new Date()).valueOf(),
                value: value
            });
            if(opts['archive'] && opts['archive'] == 1) {
                ds.save(value);
            }
        } else {
            self.logger.error(err);
        }
        self.runDataSource(ds);
    }
    
    _(config.dataSources).forEach(function (dsCfg) {
        dsCfg.emulate = opts['emulate'] == undefined ? false : true;
        var dso = null;
        switch(dsCfg.type) {
            case 'GPIO':
                dso = new GPIO(dsCfg);
            break;
            case 'ModBus':
                dso = new ModBus(dsCfg);
            break;
        }
        dso.logger = self.logger;
        dso.db = self.db;
        self.dataSourcesList.push(dso);
    });
    
    _(this.dataSourcesList).forEach(function (ds) {
        self.runDataSource(ds);
    });

})();