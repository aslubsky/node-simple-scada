define([
    'angular',
    'angular-locale',
    'ngTable',
    'ngTableExport',
    'ui-bootstrap',
    'angular-notify'
], function (angular) {

    var app = angular.module('app', ['ngTable', 'ngTableExport', 'ui.bootstrap', 'cgNotify']);

    app.config(['$routeSegmentProvider', '$locationProvider', 'bzConfigProvider', '$logProvider', 'bzUserProvider', '$httpProvider',
        function ($routeSegmentProvider, $locationProvider, config, $logProvider, bzUser, $httpProvider) {
            $locationProvider
                .html5Mode(true)
                .hashPrefix('!');

            $routeSegmentProvider.options.autoLoadTemplates = true;
            //$logProvider.debugEnabled(false);
        }]);

    app.run(['$rootScope', '$http', 'bzUser', '$location', '$templateCache', 'notify', '$sce', 'bzConfig',
        function ($rootScope, $http, bzUser, $location, $templateCache, notify, $sce, bzConfig) {
            // $http({method: 'GET', url: '/app/menu.json'}).
                // success(function (data, status, headers, config) {
                    // $rootScope.mainMenu = data;
                // }).error(function (data, status, headers, config) {
                // });


            $rootScope.$on('$locationChangeStart', function (event, nextLocation, currentLocation) {
                // close menu on mobile device
                if ($('.navbar-collapse').hasClass('in')) {
                    $('.navbar-toggle').click();
                }
            });

            $rootScope.$on('ajaxError', function () {
                $rootScope.notify(500, 'danger');
            });
            $rootScope.notify = function (msg, type) {
                notify({
                    template: '/themes/default/views/block/angular-notify.html',
                    message: msg == 500 ? 'Ошибка сервера. Пожалуйста, свяжитесь с администратором' : msg,
                    scope: {
                        type: type || 'info'
                    }
                });
            }
        }]);

    return app;

});