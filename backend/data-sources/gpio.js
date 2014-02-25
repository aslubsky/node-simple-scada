var exec = require('child_process').exec;

module.exports = GPIO;

function GPIO(pin, time) {
    this.pin = pin;
    this.time = time;

    this.BIN_PATH = '/usr/local/bin/gpio';

    this.getName = function() {
        return 'gpio'+this.pin;
    }
    
    this.read = function(cb) {
        var str = this.BIN_PATH +' read '+this.pin;
        var self = this;
//        console.log(str);
        exec(str, function(err, stdout, stderr) {
//console.log(str, parseInt(stdout, 10) == 0);
            cb(err, self, parseInt(stdout, 10) == 0);
        });
    }
}
