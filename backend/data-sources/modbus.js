var util = require('util');
var exec = require('child_process').exec;


module.exports = ModBus;

function ModBus(pin, time) {
    //this.pin = pin;
    this.time = time;

    this.BIN_PATH = '/modbus-rtu-client';
    //dev/ttyUSB0 -m rtu -a 1 -b 115200 -s 2 -d 8 -o 0.2 -p none -r 2 -1

    this.getName = function() {
        return 'modbus';
    }
    
    this.trim = function(str){
        return str.replace(/^\s+|\s+$/g, '');
    };
    
    this.read = function(cb) {
        var str = this.BIN_PATH;
        var self = this;
        var val = 0;
        // console.log(__dirname + str);
        exec(__dirname + str, function(err, stdout, stderr) {
            val = self.trim(stdout);
            val = parseFloat(val)/10;
            //console.log(self.trim(stdout.split('[2]')[1].substring(1)));
            cb(err, self, val);
        });
    }
}