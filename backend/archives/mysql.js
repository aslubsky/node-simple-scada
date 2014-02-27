var mysql = require('mysql');
var moment = require('moment');

module.exports = MysqlArchive;

function MysqlArchive(config) {
    var self = this;
    this.config = config;
    this.pool  = mysql.createPool(config);

    this.log = function (msg) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), msg, config);
    }
    this.log('create DB connection');

    this.query = function (q, obj, callback, error) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                error(err, q);
            }
            var qo = connection.query(q, obj, function(qerr, rows, fields) {
                connection.release();
                if (qerr) {
                    if (qerr.code == 'PROTOCOL_CONNECTION_LOST') {
                        self.query(q, obj, callback, error);
                    } else if (qerr.code == 'ER_USER_LIMIT_REACHED') {
                        connection.terminate();
                        self.log('ER_USER_LIMIT_REACHED');
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
    
    this.save = function (ds, value) {
        if(ds.getDataType() == "bool" && value == false) {//save only true state in to DB
            return;
        }
        if(ds.getDataType() == "bool") {
            value = 1;
        }
        var obj = {
            'date': moment().format('YYYY-MM-DD HH:mm:ss'),
            'source_id': ds.getId(),
            'value': value+''
        };
        // console.log(obj);
        this.query('INSERT INTO values_archive SET ?', obj, function(rows, fields) {
            // console.log(rows, fields);
        }, function(qerr, qs) {
            console.log(qerr, qs);
        });
    }
}