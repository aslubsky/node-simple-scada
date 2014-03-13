define([
    'app',
    'modules/tasks/controllers/ListCtrl',
    'modules/tasks/controllers/EditCtrl',
    'modules/tasks/controllers/AssignUsersCtrl',
    'modules/tasks/controllers/MyCtrl',
    'modules/tasks/controllers/MyCoursesCtrl',
    'modules/tasks/factories/tasksFactory',
    'modules/tasks/factories/tasksSettingsFactory'
], function (app) {

    app.config(['$routeSegmentProvider', 'bzConfigProvider', 'bzUserProvider',

        function ($routeSegmentProvider, config, bzUser) {
            // если включено, то при старте приложения будет грузить данные про текущею сессию
            config.checkSessionOnStart(true);

            //Список заданий
            $routeSegmentProvider
                .when('/tasks', 'tasks')
                .segment('tasks', {
                    controller: 'Tasks.ListCtrl',
                    templateUrl: '/themes/default/views/modules/tasks/page-list.html',
                    resolve: {
                        permissions: bzUser.access(["tasks.can_manage_tasks"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Создать задание
            $routeSegmentProvider
                .when('/tasks/create', 'taskCreate')
                .segment('taskCreate', {
                    controller: 'Tasks.EditCtrl',
                    templateUrl: '/themes/default/views/modules/tasks/page-create.html',
                    resolve: {
                        permissions: bzUser.access(["tasks.can_manage_tasks"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Редактирование задания
            $routeSegmentProvider
                .when('/tasks/edit/:id', 'taskEdit')
                .segment('taskEdit', {
                    controller: 'Tasks.EditCtrl',
                    templateUrl: '/themes/default/views/modules/tasks/page-edit.html',
                    resolve: {
                        permissions: bzUser.access(["tasks.can_manage_tasks"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Назначение пользователей
            $routeSegmentProvider
                .when('/tasks/:id/assign', 'taskAssign')
                .segment('taskAssign', {
                    controller: 'Tasks.AssignUsersCtrl',
                    templateUrl: '/themes/default/views/modules/tasks/page-assign-users.html',
                    resolve: {
                        permissions: bzUser.access(["tasks.can_manage_tasks"])
                    },
                    resolveFailed: config.errorResolver()
                });


            $routeSegmentProvider
                .when('/tasks/my', 'myTasks')
                .segment('myTasks', {
                    controller: 'Tasks.MyCtrl',
                    templateUrl: '/themes/default/views/modules/tasks/page-my.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])
                    },
                    resolveFailed: config.errorResolver()
                });

            $routeSegmentProvider
                .when('/courses/my', 'myCoursesTasks')
                .segment('myCoursesTasks', {
                    controller: 'Tasks.MyCoursesCtrl',
                    templateUrl: '/themes/default/views/modules/tasks/page-my-courses.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])
                    },
                    resolveFailed: config.errorResolver()
                });
        }]);
});