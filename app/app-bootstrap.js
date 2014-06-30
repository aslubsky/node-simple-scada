require.config({
    baseUrl: '/app',

    packages: [
        {
        }
    ],

    paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        'lodash': '../bower_components/lodash/dist/lodash',
        'socket-io': './vendors/socket.io.min'
    },

    shim: {
        'socket-io': { exports: 'io', deps: [] },
        'jquery':  { jquery: 'jQuery', deps: [] },
        'lodash':  { exports: '_', deps: [] }
    }
});
require(['app'], function(app){
//    console.log('app cb', app);
});