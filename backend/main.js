//var async = require('async');
var _ = require('lodash');
var config = require('./config').values;
var GPIO = require('./data-sources/gpio.js');
var ModBus = require('./data-sources/modbus.js');
var io = require('socket.io')
    .listen(config.socket_io_port, {
        'log level': 2
    });


var dataSourcesList = [];
dataSourcesList.push(new GPIO(0, 1000));
dataSourcesList.push(new GPIO(3, 1000));
dataSourcesList.push(new GPIO(4, 1000));
dataSourcesList.push(new GPIO(5, 1000));
dataSourcesList.push(new GPIO(6, 1000));
dataSourcesList.push(new ModBus(null, 1000));


var DataSources = {
  runDataSource: function(ds) {
    setTimeout(function(){
        ds.read(DataSources.onDataRead);
    }, ds.time);
  },
  onDataRead: function(err, ds, value) {
    //console.log(ds, value);
    io.sockets.emit('onDataRead', {
        name: ds.getName(),
        value: value
    });
    DataSources.runDataSource(ds);
  }
};

_(dataSourcesList).forEach(function(ds) {
    DataSources.runDataSource(ds);
});
