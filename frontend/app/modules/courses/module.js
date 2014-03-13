define([
    'app',
    'modules/courses/controllers/ListCtrl',
    'modules/courses/controllers/EditCtrl',
    'modules/courses/controllers/ViewCtrl',
    'modules/courses/controllers/ViewElementsCtrl',
    'modules/courses/controllers/ViewElementCtrl',
    'modules/courses/controllers/ViewFinishCtrl',
    'modules/courses/controllers/CreateCtrl',
    'modules/courses/controllers/ElementsCtrl',
    'modules/courses/controllers/ReportCtrl',
    'modules/courses/controllers/TestReportCtrl',
    'modules/courses/controllers/TestResultCtrl',
    'modules/courses/controllers/PlanCtrl',
    'modules/courses/controllers/UsersCtrl',
    'modules/courses/controllers/TestSettingsCtrl',
    'modules/courses/controllers/ExecuteCtrl',
    'modules/courses/controllers/RequestsCtrl',
    'modules/courses/factories/elementsFactory',
    'modules/courses/factories/coursesFactory',
    'modules/courses/factories/usersFactory',
    'modules/courses/factories/planFactory',
    'modules/courses/factories/requestsFactory',
    'modules/courses/factories/testSettingsFactory',
    'modules/courses/factories/tagsFactory',
    'modules/tasks/factories/tasksFactory',
    'modules/pages/factories/categoriesFactory',
    'modules/courses/directives/courseDetail'
], function (app) {

    app.config(['$routeSegmentProvider', 'bzConfigProvider', 'bzUserProvider',
        function ($routeSegmentProvider, config, bzUser) {
            // если включено, то при старте приложения будет грузить данные про текущею сессию
            config.checkSessionOnStart(true);

            //Список курсов
            $routeSegmentProvider
                .when('/courses', 'coursesList')
                .segment('coursesList', {
                    controller: 'Courses.ListCtrl',
                    templateUrl: '/themes/default/views/modules/courses/page-list.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Создание курса
            $routeSegmentProvider
                .when('/courses/create', 'courseCreate')
                .segment('courseCreate', {
                    controller: 'Course.CreateCtrl',
                    templateUrl: '/themes/default/views/modules/courses/page-create.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Редактирование курса
            $routeSegmentProvider
                .when('/courses/:id/edit', 'courseEdit')
                .segment('courseEdit', {
                    controller: 'Course.EditCtrl',
                    dependencies: ['id'],
                    templateUrl: '/themes/default/views/modules/courses/page-edit.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Просмотр курса
            $routeSegmentProvider
                .when('/courses/:id/view', 'courseView')
                .segment('courseView', {
                    controller: 'Course.ViewCtrl',
                    dependencies: ['id'],
                    templateUrl: '/themes/default/views/modules/courses/page-view.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Елементы курса
            $routeSegmentProvider
                .when('/courses/:id/elements', 'courseElements')
                .segment('courseElements', {
                    controller: 'Course.ElementsCtrl',
                    dependencies: ['id'],
                    templateUrl: '/themes/default/views/modules/courses/page-elements.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //План курса
            $routeSegmentProvider
                .when('/courses/:id/plan', 'coursePlan')
                .segment('coursePlan', {
                    controller: 'Course.PlanCtrl',
                    dependencies: ['id'],
                    templateUrl: '/themes/default/views/modules/courses/page-plan.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Настройки теста курса
            $routeSegmentProvider
                .when('/courses/:id/test/:testId/settings', 'courseTestSettings')
                .segment('courseTestSettings', {
                    controller: 'Course.TestSettingsCtrl',
                    dependencies: ['id', 'testId'],
                    templateUrl: '/themes/default/views/modules/courses/page-test-settings.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Отчет по курсу
            $routeSegmentProvider
                .when('/courses/:id/report', 'courseReport')
                .segment('courseReport', {
                    controller: 'Course.ReportCtrl',
                    dependencies: ['id'],
                    templateUrl: '/themes/default/views/modules/courses/page-report.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Отчет по тесту(тестам) курса
            $routeSegmentProvider
                .when('/courses/tests-report', 'courseTestsReport')
                .segment('courseTestsReport', {
                    controller: 'Course.TestReportCtrl',
                    templateUrl: '/themes/default/views/modules/courses/page-test-report.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Отчет по тесту(тестам) курса
            $routeSegmentProvider
                .when('/courses/:id/test-report/:taskId', 'courseTestReport')
                .segment('courseTestReport', {
                    controller: 'Course.TestReportCtrl',
                    dependencies: ['id', 'taskId'],
                    templateUrl: '/themes/default/views/modules/courses/page-test-report.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Результаты теста
            $routeSegmentProvider
                .when('/tests/result/:resultId', 'courseTestResult')
                .segment('courseTestResult', {
                    controller: 'Course.TestResultCtrl',
                    dependencies: ['id', 'taskId', 'resultId'],
                    templateUrl: '/themes/default/views/modules/courses/page-test-result.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Слушатели курса
            $routeSegmentProvider
                .when('/courses/:id/users', 'courseUsers')
                .segment('courseUsers', {
                    controller: 'Course.UsersCtrl',
                    dependencies: ['id'],
                    templateUrl: '/themes/default/views/modules/courses/page-users.html',
                    resolve: {
                        permissions: bzUser.access(["courses.can_manage_courses"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Заявки на курсы
            $routeSegmentProvider
                .when('/courses/requests', 'coursesRequests')
                .segment('coursesRequests', {
                    controller: 'Course.RequestsCtrl',
                    templateUrl: '/themes/default/views/modules/courses/page-requests.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Прохождение курса
            $routeSegmentProvider
                .when('/courses/execute/:taskId', 'courseExecute')//this is task id, not course
                .segment('courseExecute', {
                    controller: 'Course.ExecuteCtrl',
                    dependencies: ['taskId'],
                    templateUrl: '/themes/default/views/modules/courses/page-execute.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])//move checks logic in ExecuteCtrl
                    },
                    resolveFailed: config.errorResolver()
                });

            //Материалы курса
            $routeSegmentProvider
                .when('/courses/materials/:taskId', 'courseViewElements')//this is task id, not course
                .segment('courseViewElements', {
                    controller: 'Course.ViewElementsCtrl',
                    dependencies: ['taskId'],
                    templateUrl: '/themes/default/views/modules/courses/page-view-elements.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])//move checks logic in ViewElementsCtrl
                    },
                    resolveFailed: config.errorResolver()
                });

            //Просмотр материала курса
            $routeSegmentProvider
                .when('/courses/material/:elementId/task/:taskId', 'courseViewElement')//this is task id, not course
                .segment('courseViewElement', {
                    controller: 'Course.ViewElementCtrl',
                    dependencies: ['elementId'],
                    templateUrl: '/themes/default/views/modules/courses/page-view-element.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])//move checks logic in ViewElementsCtrl
                    },
                    resolveFailed: config.errorResolver()
                });


            //Материалы курса
            $routeSegmentProvider
                .when('/courses/finish/:taskId', 'courseViewFinish')//this is task id, not course
                .segment('courseViewFinish', {
                    controller: 'Course.ViewFinishCtrl',
                    dependencies: ['taskId'],
                    templateUrl: '/themes/default/views/modules/courses/page-view-finish.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])//move checks logic in ViewFinishCtrl
                    },
                    resolveFailed: config.errorResolver()
                });

        }]);

});