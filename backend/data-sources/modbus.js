var util = require('util');
var exec = require('child_process').exec;


module.exports = ModBus;

function ModBus(cfg) {
    this.cfg = cfg;
    
    this.read_count = 0;
    this.values = [];
    this.avgValue = 0;

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
    
    this.read = function(cb) {
        this.read_count++;
        
        if(this.cfg.emulate) {
            var val = parseFloat((Math.random() * (40 - 30) + 30).toFixed(2));
            this.values.push(val);
            cb(null, this, val);
            return;
        }

        var str = __dirname + this.BIN_PATH +' -r '+this.cfg.register;
        var self = this;
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