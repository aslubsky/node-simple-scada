//var async = require('async');
var _ = require('lodash');
var config = require('./config').values;
var GPIO = require('./data-sources/gpio.js');
var ModBus = require('./data-sources/modbus.js');
var io = require('socket.io')
    .listen(config.socketio.port, {
        'log level': config.socketio.logLevel
    });
var stdio = require('stdio')
    
var opts = stdio.getopt({
    'emulate': {args: 1, key: 'emulate', description: 'Emulate data source'}
});
    
var MysqlArchive = require('./archives/mysql.js');
var archive = new MysqlArchive(config.mysql);

var DataSources = {
    runDataSource: function (ds) {
        setTimeout(function () {
            ds.read(DataSources.onDataRead);
        }, ds.getTime());
    },
    onDataRead: function (err, ds, value) {
        //console.log(ds.getName(), value);
        if(err === null) {
            io.sockets.emit('onDataRead', {
                name: ds.getName(),
                value: value
            });
            if(ds.cfg.wrtite_ratio == undefined) {
                archive.save(ds, value);
            } else if(ds.canWrite() === true) {
                archive.save(ds, ds.getAvgValue());
            }
        } else {
        }
        DataSources.runDataSource(ds);
    }
};


var dataSourcesList = [];
_(config.dataSources).forEach(function (dsCfg) {
    dsCfg.emulate = opts['emulate'] == undefined ? false : true;
    switch(dsCfg.type) {
        case 'GPIO':
            dataSourcesList.push(new GPIO(dsCfg));
        break;
        case 'ModBus':
            dataSourcesList.push(new ModBus(dsCfg));
        break;
    }
});

_(dataSourcesList).forEach(function (ds) {
    DataSources.runDataSource(ds);
});
