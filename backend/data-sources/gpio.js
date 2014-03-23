var exec = require('child_process').exec;
var moment = require('moment');

module.exports = GPIO;

function GPIO(cfg) {
    var self = this;

    this.BIN_PATH = '/usr/local/bin/gpio';
    
    this.pin = cfg.pin;
    
    this.logger = null;
    
    this.db = null;
    
    this.prevValue = null;
    
    this.cfg = cfg;

    this.getName = function() {
        return this.cfg.name;
    }

    this.getTime = function() {
        return this.cfg.time;
    }

    this.getDataType = function() {
        return this.cfg.data_type;
    }

    this.getId = function() {
        return this.cfg.id;
    }
    
    this.read = function(cb) {
        if(this.cfg.emulate) {
            cb(null, this, !(+new Date()%2));
            return;
        }
        var str = this.BIN_PATH +' read '+this.pin;
        exec(str, function(err, stdout, stderr) {
            cb(err, self, parseInt(stdout, 10) == 0);
        });
    }
    
    this.getPrevValue = function (cb) {
        if(this.prevValue !== null) {
            cb(this.prevValue);
            return;
        }
        self.db.query('SELECT value FROM archive_bool ORDER BY `date` DESC LIMIT 1', {}, function(rows, fields) {
            //console.log(rows);
            self.prevValue = rows.length > 0 ? rows[0].value == '1' : false;
            cb(self.prevValue);
        }, function(qerr, qs) {
            self.logger.log('error', qerr+"\n"+qs);
        });
    }
    
    this.save = function (value) {
        this.getPrevValue(function(prevVal){
            if(value != prevVal) {
                var obj = {
                    'date': moment().format('YYYY-MM-DD HH:mm:ss'),
                    'source_id': self.getId(),
                    'value': value == true ? '1' : '0',
                    'prev_value': self.prevValue == true ? '1' : '0'
                };
                self.prevValue = value;
                self.logger.log('debug', 'INSERT INTO archive_bool SET ?', obj);
                self.db.query('INSERT INTO archive_bool SET ?', obj, function(rows, fields) {
                    self.logger.log('debug', 'INSERT DONE', rows);
                }, function(qerr, qs) {
                    self.logger.log('error', qerr+"\n"+qs);
                });
            }
        });
    }
}
