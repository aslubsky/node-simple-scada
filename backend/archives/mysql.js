var dbClass = require('../db');
var moment = require('moment');

module.exports = MysqlArchive;

function MysqlArchive(config, logger) {
    var self = this;
    this.config = config;
    this.db = new dbClass(config, logger);
    
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
        logger.log('debug', 'INSERT INTO values_archive SET ?', obj);
        self.db.query('INSERT INTO values_archive SET ?', obj, function(rows, fields) {
            // console.log(rows, fields);
            logger.log('debug', 'INSERT DONE', rows);
        }, function(qerr, qs) {
            logger.log('error', qerr+"\n"+qs);
        });
    }
}