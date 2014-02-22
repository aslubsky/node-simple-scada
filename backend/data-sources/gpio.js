module.exports = GPIO;

function GPIO(pin, time) {
    this.pin = pin;
    this.time = time;

    this.BIN_PATH = '/';

    this.getName = function() {
        return 'gpio'+this.pin;
    }
    
    this.read = function(cb) {
        cb(null, this, 1);
    }
}