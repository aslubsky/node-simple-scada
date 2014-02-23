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
        // console.log(__dirname + str);
        exec(__dirname + str, function(err, stdout, stderr) {
            cb(err, self, stdout === '1');
        });
    }
}