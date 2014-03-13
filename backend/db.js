var mysql = require('mysql');
var moment = require('moment');

module.exports = DB;

function DB(config, logger) {
    var self = this;
    this.logger = logger;
    this.config = config;
    this.pool  = mysql.createPool(config);

    this.logger.log('info', 'DB connected');

    this.query = function (q, obj, callback, error) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                error(err, q);
            }
            self.logger.log('debug', q, obj);
            var qo = connection.query(q, obj, function(qerr, rows, fields) {
                connection.release();
                if (qerr) {
                    if (qerr.code == 'PROTOCOL_CONNECTION_LOST') {
                        self.query(q, obj, callback, error);
                    } else if (qerr.code == 'ER_USER_LIMIT_REACHED') {
                        connection.terminate();
                        self.logger('erro', qerr);
                        self.query(q, obj, callback, error);
                    } else {
                        error(qerr, q);
                    }
                } else {
                    callback(rows, fields);
                }
            });
            //console.log(qo.sql);
        });
    }

    
    this.escape = function (str) {
        return mysql.escape(str);
    }
}