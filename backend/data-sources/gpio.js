var exec = require('child_process').exec;

module.exports = GPIO;

function GPIO(cfg) {
    this.BIN_PATH = '/usr/local/bin/gpio';
    
    this.pin = cfg.pin;
    
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
        var self = this;
        exec(str, function(err, stdout, stderr) {
            cb(err, self, parseInt(stdout, 10) == 0);
        });
    }
}
