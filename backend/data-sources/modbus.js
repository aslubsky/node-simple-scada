var util = require('util');
var exec = require('child_process').exec;


module.exports = ModBus;

function ModBus(pin, time) {
    //this.pin = pin;
    this.time = time;

    this.BIN_PATH = '/';
    //dev/ttyUSB0 -m rtu -a 1 -b 115200 -s 2 -d 8 -o 0.2 -p none -r 2 -1

    this.getName = function() {
        return 'modbus';
    }
    
    this.trim = function(str){
        return str.replace(/^\s+|\s+$/g, '');
    };
    
    this.read = function(cb) {
        var str = '/modpoll /dev/ttyUSB0 -m rtu -a 1 -b 115200 -s 2 -d 8 -o 0.2 -p none -r 2 -1';
        var self = this;
        var val = 0;
        // console.log(__dirname + str);
        exec(__dirname + str, function(err, stdout, stderr) {
            val = self.trim(stdout.split('[2]')[1].substring(1));
            val = parseFloat(val)/10;
            //console.log(self.trim(stdout.split('[2]')[1].substring(1)));
            cb(err, self, val);
        });
    }
}