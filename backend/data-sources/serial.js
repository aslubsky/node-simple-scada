var sp = require("serialport");
var moment = require('moment');


module.exports = ScadaSerial;

function ScadaSerial(cfg) {
    var self = this;
    
    this.cfg = cfg;

    this.onDataRead = function(err, ds, value) {

    }

    this.read_count = 0;
    this.values = [];
    this.avgValue = 0;
    
    this.logger = null;
    
    this.db = null;

    this.getName = function() {
        return this.cfg.name;
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

    this.isAsync = function() {
        return true;
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

    this.serialConn = new sp.SerialPort(this.cfg.path, {
        parser: sp.parsers.readline("\r"),
        baudrate: this.cfg.baudrate
    });


    var val = 0;
    this.serialConn.on("open", function () {
//        console.log('open');
        self.logger.log('debug', 'Open '+self.cfg.path);
        self.serialConn.on('data', function(data) {
            self.read_count++;
            val = parseFloat(data);
            self.values.push(val);

            self.logger.log('debug', self.cfg.path + ' data received: '+val);

            self.onDataRead(null, self, val);
        });
    });
}