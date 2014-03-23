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

        'ngTable': '../bower_components/ng-table/ng-table.src',
        'ngTableExport': '../bower_components/ng-table-export/ng-table-export.src',

        'moment-lang': '../bower_components/momentjs/lang',
        'moment': '../bower_components/momentjs/moment',

        'bootstrap-datepicker': '../bower_components/bootstrap-datepicker/js/bootstrap-datepicker',
        'bootstrap-datepicker.ru': '../bower_components/bootstrap-datepicker/js/locales/bootstrap-datepicker.ru',
        'bootstrap-daterangepicker': '../bower_components/bootstrap-daterangepicker/daterangepicker',
        'ng-bs-daterangepicker': '../bower_components/ng-bs-daterangepicker/src/ng-bs-daterangepicker',

        'angular-notify': '../bower_components/angular-notify/angular-notify'
    },

    shim: {
        'angular': { exports: 'angular', deps: ['jquery'] },
        'angular-locale': { deps: ['angular'] },

        'ngTable': { deps: ['angular'] },
        'ngTableExport': { deps: ['ngTable'] },

        'bootstrap': { deps: ['jquery'] },
        'ui-bootstrap': { deps: ['angular', 'bootstrap', 'ui-bootstrap-tpls'] },
        'ui-bootstrap-tpls': { deps: ['angular'] },

        'bootstrap-datepicker': {deps: ['moment-lang/ru', 'bootstrap', 'jquery']},
        'bootstrap-datepicker.ru': {deps: ['bootstrap-datepicker']},
        'bootstrap-daterangepicker': {deps: ['moment-lang/ru', 'bootstrap', 'jquery']},
        'ng-bs-daterangepicker': {deps: ['angular', 'bootstrap-daterangepicker']},

        'angular-notify': { deps: ['angular'] }
    }
});
require(['main']);