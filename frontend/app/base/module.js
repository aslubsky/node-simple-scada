define([
    'app',
    'base/canvas/figure',
    'base/canvas/arrows',
    'base/canvas/h2obarrel',
    'base/canvas/phbarrel',
    'base/canvas/clbarrel',
    'base/canvas/watercounter',
    'base/canvas/other',
    'base/controllers/MainCtrl',
    /*'base/directives/dropdownMenu',
    'base/directives/bzHelp',
    'base/directives/elsMenu',
    'base/directives/bzDatepicker',
    'base/directives/bzPieTimer',
    'base/directives/checkList',
    'base/directives/dateRangePicker',
    'base/directives/bzConfirm',
    'base/directives/timer',
    'base/directives/breadcrumbs',
    'base/directives/carousel',
    'base/directives/perspective',
    'base/directives/fullscreen',
    'base/directives/viewer',
    'base/directives/customValidatorInt',
    'base/directives/jme',
    'base/directives/swfObject',
    'base/directives/videojs',
    'base/directives/viewFile',
    'base/directives/getFileIcon',
    'base/filters/translate',
    'base/ckeditor-plugins/select-images',
    'base/interceptors/ajaxStatusInterceptor'*/
], function(app) {

    app.config(['$routeSegmentProvider', 'bzConfigProvider',
        function($routeSegmentProvider, config) {

            $routeSegmentProvider
                .when('/', 'main')
                .segment('main', {
                    templateUrl: '/themes/default/views/main.html',
                    resolve: {
                    },
                    controller: 'Dashboard.MainCtrl',
                    resolveFailed: config.errorResolver()
                });

        }]);

});