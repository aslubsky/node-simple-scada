define([
    'app',
    'modules/tests/controllers/ListCtrl',
    'modules/tests/controllers/EditCtrl',
    'modules/tests/controllers/CreateCtrl',
    'modules/tests/controllers/ExecuteCtrl',
    'modules/tests/controllers/QuestionsListCtrl',
    'modules/tests/controllers/QuestionCreateCtrl',
    'modules/tests/controllers/QuestionEditCtrl',
    'modules/tests/factories/testsFactory',
    'modules/tests/factories/resultsFactory',
    'modules/tests/factories/answersFactory',
    'modules/tests/factories/questionsFactory',
    'modules/courses/factories/tagsFactory',
    'modules/courses/factories/elementsFactory'
], function (app) {

    app.config(['$routeSegmentProvider', 'bzConfigProvider', 'bzUserProvider',
        function ($routeSegmentProvider, config, bzUser) {
            // если включено, то при старте приложения будет грузить данные про текущею сессию
            config.checkSessionOnStart(true);

            //Список тестов
            $routeSegmentProvider
                .when('/tests', 'testsList')
                .segment('testsList', {
                    controller: 'Tests.ListCtrl',
                    templateUrl: '/themes/default/views/modules/tests/page-list.html',
                    resolve: {
                        permissions: bzUser.access(["tests.can_manage_tests"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Создание теста
            $routeSegmentProvider
                .when('/tests/create', 'testCreate')
                .segment('testCreate', {
                    controller: 'Tests.CreateCtrl',
                    templateUrl: '/themes/default/views/modules/tests/page-create.html',
                    resolve: {
                        permissions: bzUser.access(["tests.can_manage_tests"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Редактирование теста
            $routeSegmentProvider
                .when('/tests/edit/:id', 'testEdit')
                .segment('testEdit', {
                    controller: 'Tests.EditCtrl',
                    dependencies: ['id'],
                    templateUrl: '/themes/default/views/modules/tests/page-edit.html',
                    resolve: {
                        permissions: bzUser.access(["tests.can_manage_tests"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Прохождение теста
            $routeSegmentProvider
                .when('/tests/execute/:taskId', 'testExecute')//this is task id, not test
                .segment('testExecute', {
                    controller: 'Tests.ExecuteCtrl',
                    dependencies: ['taskId'],
                    templateUrl: '/themes/default/views/modules/tests/page-execute.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])//move checks logic in ExecuteCtrl
                    },
                    resolveFailed: config.errorResolver()
                });


            //Вопросы теста
            $routeSegmentProvider
                .when('/tests/:test_id/questions', 'questionsList')
                .segment('questionsList', {
                    controller: 'Tests.QuestionsListCtrl',
                    dependencies: ['test_id'],
                    templateUrl: '/themes/default/views/modules/tests/page-list-questions.html',
                    resolve: {
                        permissions: bzUser.access(["tests.can_manage_tests"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Создать вопрос теста
            $routeSegmentProvider
                .when('/tests/:test_id/questions/create', 'questionCreate')
                .segment('questionCreate', {
                    controller: 'Tests.QuestionCreateCtrl',
                    dependencies: ['test_id'],
                    templateUrl: '/themes/default/views/modules/tests/page-create-question.html',
                    resolve: {
                        permissions: bzUser.access(["tests.can_manage_tests"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Редактирование вопроса теста
            $routeSegmentProvider
                .when('/tests/:test_id/questions/edit/:id', 'questionEdit')
                .segment('questionEdit', {
                    controller: 'Tests.QuestionEditCtrl',
                    dependencies: ['test_id'],
                    templateUrl: '/themes/default/views/modules/tests/page-edit-question.html',
                    resolve: {
                        permissions: bzUser.access(["tests.can_manage_tests"])
                    },
                    resolveFailed: config.errorResolver()
                });
        }]);

});