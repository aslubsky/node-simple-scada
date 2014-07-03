require.config({
    baseUrl: '/app',

    packages: [
        {
        }
    ],

    paths: {
//        'cordova.android': '../bower_components/cordova/cordova.android',
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
    $(document).on("pageinit", function(){
        app.run();
        $('#log').append('pageinit'+'<br/>');
    });
    $(function(){
        app.run();
        $('#log').append('ready'+'<br/>');
    });
    $('#log').append('app cb'+'<br/>');
    console.log('app cb', app);

    $(function () {
        $('#log').append('pageinit'+'<br/>');
        document.addEventListener("deviceready", function(){
            app.run();
            $('#log').append('ready'+'<br/>');
        }, false);
    });
    $('#log').append('app cb'+'<br/>');

    var initialize = function(){
        ('#log').append('initialize cb'+'<br/>');
        console.log('initialize add');
    }
    return {
        initialize: initialize
    };
});
$(function () {
    console.log('$$$$ require add');
    $('#log').append('require'+'<br/>');
});
alert('require add');