var http = require('http');
var url = require('url');
var moment = require('moment');
var config = require(__dirname+'/../config').values;
var dbClass = require(__dirname+'/../backend/db.js');
var winston = require('winston');



module.exports = API;

function API(config) {
    this.self = this;
    
    this.logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                level: 'info'
            }),
            new (winston.transports.File)({
                level: 'error',
                filename: __dirname+'/log/api.log',
                maxsize: 1024*1024*10//10MB
            })
        ]
    });
    
    this.db = new dbClass(config.mysql, this.logger);

    this.handler = function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        var queryData = self.getParams(req);
        // console.log(queryData);
        // res.end();
        var q;
        if(queryData.type == 'avg') {
            q = getAvgQuery(queryData);
        } else {
            q = getAllQuery(queryData);
        }
        // console.log(q);
        db.query(q, {}, function(rows, fields) {
            // console.log(rows, fields);
            res.write(queryData.callback+'('+JSON.stringify(rows)+')');
            res.end();
        }, function(qerr, qs) {
            self.onError(qerr, qs, res);
        });
    },
    this.getParams = function(req) {
        var queryData = url.parse(req.url, true).query;
        if(queryData['date-begin'] == undefined) {
            queryData['date-begin'] = moment().format('YYYY-MM-DD');
        }
        if(queryData['date-end'] == undefined) {
            queryData['date-end'] = queryData['date-begin'];
        }
        if(queryData['source-id[]'] == undefined) {
            queryData['source-id[]'] = [];
        } else if(!Array.isArray(queryData['source-id[]'])) {
            queryData['source-id[]'] = [queryData['source-id[]']];
        }
        if(queryData['type'] == undefined) {
            queryData['type'] = 'avg';
        }
        return queryData;
    },
    this.onError = function(qerr, qs, res) {
        this.logger.log('error', qerr, qs);
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(qerr + "\n");
        res.end();
    },
    
    this.getAllQuery = function(queryData) {
        var dateBegin = queryData['date-begin'];
        var dateEnd = queryData['date-end'];
        var sourses = queryData['source-id[]'];
        var q = 'SELECT `date`, value, source_id FROM values_archive WHERE';
        q += ' `date` BETWEEN \''+dateBegin+' 00:00:01\' AND \''+dateEnd+' 23:59:59\' ';
        if(sourses.length > 0) {
        // console.log(sourses);
            q += 'AND source_id IN('+sourses.join(',')+') ';
        }
        return q;
    }
    this.getAvgQuery = function(queryData) {
        var dateBegin = queryData['date-begin'];
        var dateEnd = queryData['date-end'];
        var sourses = queryData['source-id[]'];
        var format;
        var outFormat;
        var period;
        var days;
        if(dateBegin == dateEnd) {
            days = 1;
        } else {
            var mBegin = moment(dateBegin, 'YYYY-MM-DD');
            var mEnd = moment(dateEnd, 'YYYY-MM-DD');
            days = mEnd.diff(mBegin, 'days');
            //console.log(mBegin.format('YYYY-MM-DD'), mEnd.format('YYYY-MM-DD'), days);
        }
        // console.log(days);
        // console.log(dateBegin, dateEnd, sourses);
        // return;
        if(days <= 1) {
            period = 'minute';
        } else if(days > 1 && days <= 7) {
            period = 'hour';
        } else {
            period = 'day';
        }
        
        switch(period) {
            case 'minute':
                format = '%Y-%m-%d %H:%i';
                outFormat = '%Y-%m-%d %H:%i:00';
            break;
            case 'hour':
                format = '%Y-%m-%d %H';
                outFormat = '%Y-%m-%d %H:00:00';
            break;
            case 'day':
                format = '%Y-%m-%d';
                outFormat = '%Y-%m-%d 00:00:00';
            break;
        }
        var q = 'SELECT DATE_FORMAT(`date`, \''+outFormat+'\') as `date`, AVG(value) as `value`, \''+period+'\' as `period`, source_id FROM values_archive WHERE';
        q += ' `date` BETWEEN \''+dateBegin+' 00:00:01\' AND \''+dateEnd+' 23:59:59\' ';
        if(sourses.length > 0) {
        // console.log(sourses);
            q += 'AND source_id IN('+sourses.join(',')+') ';
        }
        q += 'GROUP BY DATE_FORMAT(`date`, \''+format+'\') ';
        return q;
    }
}