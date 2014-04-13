require.config({
    baseUrl: '/app',

    packages: [
        {
            name: 'bz',
            location: '../bower_components/bazalt/build',
            main: 'bz'
        }
    ],

    paths: {
        'jquery': '../bower_components/jquery/jquery',

        'angular': '../bower_components/angular/angular',

        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'ui-bootstrap': '../bower_components/angular-ui-bootstrap3/ui-bootstrap',
        'ui-bootstrap-tpls': '../bower_components/angular-ui-bootstrap3/ui-bootstrap-tpls',

        'moment-lang': '../bower_components/momentjs/lang',
        'moment': '../bower_components/momentjs/moment',
        'socket-io': './vendors/socket.io.min',

        'angular-notify': '../bower_components/angular-notify/angular-notify'
    },

    shim: {
        'socket-io': { exports: 'io', deps: [] },
        'angular': { exports: 'angular', deps: ['jquery'] },
        'angular-locale': { deps: ['angular'] },

        'bootstrap': { deps: ['jquery'] },
        'ui-bootstrap': { deps: ['angular', 'bootstrap', 'ui-bootstrap-tpls'] },
        'ui-bootstrap-tpls': { deps: ['angular'] },

        'angular-notify': { deps: ['angular'] }
    }
});
require(['main']);