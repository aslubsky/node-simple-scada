define([
    'app',
    'modules/dashboard/controllers/HomeCtrl',
    'modules/dashboard/controllers/MainCtrl',
    'modules/dashboard/controllers/MyCoursesCtrl',
    'modules/dashboard/controllers/MyTasksCtrl',
    'modules/dashboard/controllers/NewCoursesCtrl',
    'modules/tasks/factories/tasksFactory',
    'modules/courses/factories/requestsFactory'
], function(app) {

    app.config(['$routeSegmentProvider', 'bzConfigProvider', 'bzUserProvider',
        function($routeSegmentProvider, config, bzUser) {
            // если включено, то при старте приложения будет грузить данные про текущею сессию
            config.checkSessionOnStart(true);

            $routeSegmentProvider
                .when('/', 'home')
                .segment('home', {
                    templateUrl: '/themes/default/views/home.html',
                    resolve: {
                        permissions: bzUser.access()
                    },
                    controller: 'Dashboard.HomeCtrl',
                    resolveFailed: config.errorResolver()
                });

            $routeSegmentProvider
                .when('/dashboard', 'dashboard')
                .segment('dashboard', {
                    controller: 'Dashboard.MainCtrl',
                    templateUrl: '/themes/default/views/dashboard.html',
                    resolve: {
                        permissions: bzUser.access(['auth.user_logged'])
                    },
                    resolveFailed: config.errorResolver()
                });

        }]);

});