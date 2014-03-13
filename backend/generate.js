var moment = require('moment');
var config = require('../config').values;
var dbClass = require('./db');
var db = new dbClass(config.mysql);


var from = '2014-02-01';
// var to = '2014-02-01';
var to = '2014-02-28';

var fromM = moment(from+' 00:00:01');
var toM = moment(to+' 23:59:59');
var t = fromM.valueOf();
var e = toM.valueOf();
var obj;
var value;
var i=0;

function run() {
    setTimeout(function(){
        if(t >= e) {
            return;
        }
        value = parseFloat((Math.random() * (40 - 30) + 30).toFixed(2));
        obj = {
            'date': moment(t).format('YYYY-MM-DD HH:mm:ss'),
            'source_id': 6,
            'value': value+''
        };
        // console.log('INSERT INTO values_archive SET ?', obj);
        console.log(obj.date);
        db.query('INSERT INTO values_archive SET ?', obj, function(rows, fields) {
            // console.log(rows, fields);
        }, function(qerr, qs) {
            console.log(qerr, qs);
        });
        t+=1000;
        i++;
        run();
    }, 1);
}

db.query('TRUNCATE `values_archive`', {}, function(rows, fields) {
    // console.log(rows, fields);
    run();
}, function(qerr, qs) {
    console.log(qerr, qs);
});
