var util = require('util');
var exec = require('child_process').exec;
var moment = require('moment');


module.exports = ModBus;

function ModBus(cfg) {
    var self = this;
    
    this.cfg = cfg;
    
    this.read_count = 0;
    this.values = [];
    this.avgValue = 0;
    
    this.logger = null;
    
    this.db = null;

    this.BIN_PATH = '/usr/local/bin/modbus-rtu-client';

    this.getName = function() {
        return this.cfg.name;
    }

    this.getTime = function() {
        return this.cfg.time;
    }

    this.getId = function() {
        return this.cfg.id;
    }

    this.getAvgValue = function() {
        return this.avgValue;
    }
    
    this.getDataType = function() {
        return this.cfg.data_type;
    }
    
    this.trim = function(str){
        return str.replace(/^\s+|\s+$/g, '');
    };
    
    this.canWrite = function(cb) {
        // console.log(this.read_count, this.cfg.wrtite_ratio);
        if(this.read_count >= this.cfg.wrtite_ratio) {
            this.read_count = 0;
            var sum = this.values.reduce(function(a, b) { return a + b });
            this.avgValue = sum / this.values.length;
            // console.log(this.values, this.avgValue);
            this.values = [];
            return true;
        }
        return false;
    }
    
    this.save = function (value) {
        if(this.cfg.wrtite_ratio == undefined) {
            this._save(value);
        } else if(this.canWrite() === true) {
            this._save(this.getAvgValue());
        }
    }
    
    this._save = function (value) {
        var obj = {
            'date': moment().format('YYYY-MM-DD HH:mm:ss'),
            'source_id': this.getId(),
            'value': value+''
        };
        // console.log(obj);
        this.logger.log('debug', 'INSERT INTO archive_numeric SET ?', obj);
        this.db.query('INSERT INTO archive_numeric SET ?', obj, function(rows, fields) {
            // console.log(rows, fields);
            self.logger.log('debug', 'INSERT DONE', rows);
        }, function(qerr, qs) {
            self.logger.log('error', qerr+"\n"+qs);
        });
    }
    
    this.read = function(cb) {
        this.read_count++;
        
        if(this.cfg.emulate) {
            var val = parseFloat((Math.random() * (40 - 30) + 30).toFixed(2));
            this.values.push(val);
            cb(null, this, val);
            return;
        }

        var str = __dirname + this.BIN_PATH +' -r '+this.cfg.register;
        var val = 0;
        // console.log(str);
        exec(str, function(err, stdout, stderr) {
            val = self.trim(stdout);
            val = parseFloat(val)/10;
            self.values.push(val);
            //console.log(self.trim(stdout.split('[2]')[1].substring(1)));
            cb(err, self, val);
        });
    }
}