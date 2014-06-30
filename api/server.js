var config = require(__dirname + '/config').values;
var API = require(__dirname + '/api');


var apiInst = new API(config);
apiInst.run();