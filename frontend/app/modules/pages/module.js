define([
    'app',
    'modules/pages/controllers/ListCtrl',
    'modules/pages/controllers/EditCtrl',
    'modules/pages/controllers/CreateCtrl',
    'modules/pages/controllers/ViewCtrl',
    'modules/pages/controllers/ExecuteCtrl',
    'modules/pages/controllers/CategoryTreeCtrl',
    'modules/pages/controllers/CategoriesCtrl',
    'modules/pages/controllers/StudyResourcesCtrl',
    'modules/pages/factories/pagesFactory',
    'modules/pages/factories/categoriesFactory',
    'modules/tasks/factories/tasksFactory',
    'modules/courses/factories/planFactory',
    'modules/courses/factories/tagsFactory',
    'modules/courses/factories/elementsFactory'
], function (app) {

    app.config(['$routeSegmentProvider', 'bzConfigProvider', 'bzUserProvider',
        function ($routeSegmentProvider, config, bzUser) {
            // если включено, то при старте приложения будет грузить данные про текущею сессию
            config.checkSessionOnStart(true);

            //Список страниц
            $routeSegmentProvider
                .when('/pages', 'pagesList')
                .segment('pagesList', {
                    controller: 'Pages.ListCtrl',
                    templateUrl: '/themes/default/views/modules/pages/page-list.html',
                    resolve: {
                        permissions: bzUser.access(["pages.can_manage_pages"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Создание страницы
            $routeSegmentProvider
                .when('/pages/create', 'pageCreate')
                .segment('pageCreate', {
                    controller: 'Pages.CreateCtrl',
                    templateUrl: '/themes/default/views/modules/pages/page-create.html',
                    resolve: {
                        permissions: bzUser.access(["pages.can_manage_pages"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Редактирование страницы
            $routeSegmentProvider
                .when('/pages/:id/edit', 'pageEdit')
                .segment('pageEdit', {
                    controller: 'Pages.EditCtrl',
                    dependencies: ['id'],
                    templateUrl: '/themes/default/views/modules/pages/page-edit.html',
                    resolve: {
                        permissions: bzUser.access(["pages.can_manage_pages"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Категории
            $routeSegmentProvider
                .when('/pages/categories', 'categories')
                .segment('categories', {
                    controller: 'Pages.CategoriesCtrl',
                    templateUrl: '/themes/default/views/modules/pages/page-category-edit.html',
                    resolve: {
                        permissions: bzUser.access(["pages.can_manage_pages"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Просмотр
            $routeSegmentProvider
                .when('/pages/:id/view', 'view')
                .segment('view', {
                    controller: 'Pages.ViewCtrl',
                    dependencies: ['id'],
                    templateUrl: '/themes/default/views/modules/pages/page-view.html',
                    resolve: {
                        permissions: bzUser.access(["pages.can_manage_pages"])
                    },
                    resolveFailed: config.errorResolver()
                });



            //Прохождение
            $routeSegmentProvider
                .when('/pages/execute/:taskId', 'pageExecute')//this is task id, not page
                .segment('pageExecute', {
                    controller: 'Pages.ExecuteCtrl',
                    dependencies: ['taskId'],
                    templateUrl: '/themes/default/views/modules/pages/page-execute.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])//move checks logic in ExecuteCtrl
                    },
                    resolveFailed: config.errorResolver()
                });


            //Учебные ресурсы
            $routeSegmentProvider
                .when('/study-resources', 'studyResources')
                .segment('studyResources', {
                    controller: 'Pages.StudyResourcesCtrl',
                    templateUrl: '/themes/default/views/modules/pages/page-study-resources.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])
                    },
                    resolveFailed: config.errorResolver()
                });

        }]);

});