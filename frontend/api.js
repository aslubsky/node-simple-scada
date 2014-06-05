var http = require('http');
var url = require('url');
var _ = require('lodash');
var moment = require('moment');
var config = require(__dirname+'/../config').values;
var dbClass = require(__dirname+'/../backend/db.js');
var winston = require('winston');

var io = require('socket.io');



module.exports = API;

function API(config) {
    var self = this;
    this.timer = null;
    
    this.logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                level: config.main.logLevel
            }),
            new (winston.transports.File)({
                level: 'error',
                filename: __dirname+'/log/api.log',
                maxsize: 1024*1024*10//10MB
            })
        ]
    });
    
    this.db = new dbClass(config.mysql, this.logger);

    this.io = io.listen(config.socketio.port, {
        'log level': config.socketio.logLevel
    });

    this.run = function() {
        _.each(config.dataSources, function(ds){
            self.db.query('SELECT `date`, source_id, value FROM archive_numeric WHERE source_id = ? ORDER BY `date` DESC LIMIT 1', [ds.id], function(rows, fields) {
//                console.log(rows);
                if(rows.length > 0) {
                    rows[0].name = ds.name;
                    self.io.sockets.emit('onDataRead', rows[0]);
                }
                self.timer = setTimeout(self.run, 1000);
            }, function(qerr, qs) {
                self.onError(qerr, qs);
                self.timer = setTimeout(self.run, 1000);
            });
        });
    }

    this.onError = function(qerr, qs) {
        this.logger.log('error', qerr, qs);
    }
}