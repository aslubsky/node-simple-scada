define([
    'app',
    'modules/users/controllers/LoginCtrl',
    'modules/users/controllers/RegistrationCtrl',
    'modules/users/controllers/RecoveryCtrl',
    'modules/users/controllers/RemindCtrl',
    'modules/users/controllers/ActivationCtrl',
    'modules/users/controllers/ProfileCtrl',
    'modules/users/controllers/ProfileEditCtrl',
    'modules/users/controllers/ListCtrl',
    'modules/users/controllers/CreateCtrl',
    'modules/users/controllers/EditCtrl',
    'modules/users/controllers/ViewCtrl',
    'modules/users/controllers/RolesCtrl',
    'modules/users/controllers/EditRoleCtrl',
    'modules/users/controllers/AddRoleCtrl',
    'modules/users/controllers/UserRolesCtrl',
    'modules/users/controllers/ChangePasswordCtrl',
    'modules/users/controllers/AdministrationsCtrl',
    'modules/users/factories/muUserFactory',
    'modules/users/factories/muRoleFactory'
], function(app) {

    app.config(['$routeSegmentProvider', 'bzConfigProvider', 'bzUserProvider',
        function($routeSegmentProvider, config, bzUser) {
            // если включено, то при старте приложения будет грузить данные про текущею сессию
            config.checkSessionOnStart(true);

            // Регистрация
            $routeSegmentProvider
                .when('/user/registration', 'userRegistration')
                .segment('userRegistration', {
                    templateUrl: '/themes/default/views/user/page-registration.html',
                    resolve: {
                        permissions: bzUser.access()
                    },
                    resolveFailed: config.errorResolver()
                });

            // Востановление пароля
            $routeSegmentProvider
                .when('/user/recovery', 'userRecovery')
                .segment('userRecovery', {
                    controller: 'RecoveryCtrl',
                    templateUrl: '/themes/default/views/user/page-recovery.html',
                    resolve: {
                        permissions: bzUser.access()
                    },
                    resolveFailed: config.errorResolver()
                });

            // Востановление пароля - этап 2
            $routeSegmentProvider
                .when('/user/recovery_pass/:user_id/:key', 'userRecoveryPass')
                .segment('userRecoveryPass', {
                    controller: 'RemindCtrl',
                    templateUrl: '/themes/default/views/user/page-recovery-pass.html',
                    resolve: {
                        permissions: bzUser.access()
                    },
                    resolveFailed: config.errorResolver()
                });


            // Сообщение после регистрации
            $routeSegmentProvider
                .when('/user/activationSent', 'activationSent')
                .segment('activationSent', {
                    templateUrl: '/themes/default/views/user/page-register-success.html',
                    resolve: {
                        permissions: bzUser.access()
                    },
                    resolveFailed: config.errorResolver()
                });

            // Активация
            $routeSegmentProvider
                .when('/user/activate/:user_id/:key', 'activation')
                .segment('activation', {
                    templateUrl: '/themes/default/views/user/page-activation.html',
                    controller: 'ActivationCtrl',
                    resolve: {
                        permissions: bzUser.access()
                    },
                    resolveFailed: config.errorResolver()
                });

            // Создание пользователя
            $routeSegmentProvider
                .when('/users/create', 'createUser')
                .segment('createUser', {
                    templateUrl: '/themes/default/views/modules/user/page-create-user.html',
                    controller: 'Users.CreateCtrl',
                    resolve: {
                        permissions: bzUser.access(["auth.can_edit_users"])
                    },
                    resolveFailed: config.errorResolver()
                });

            // Просмотр своего профиля
            $routeSegmentProvider
                .when('/profile', 'profileView')
                .segment('profileView', {
                    templateUrl: '/themes/default/views/user/page-profile.html',
                    controller: 'ProfileCtrl',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])
                    },
                    resolveFailed: config.errorResolver()
                });


            //Смена пароля
            $routeSegmentProvider
                .when('/profile/change-pass/:id', 'profileView.changePass')
                .within('profileView')
                .segment('changePass', {
                    controller: 'ChangePasswordCtrl',
                    templateUrl: '/themes/default/views/modules/user/page-change-password.html',
                    resolve: {
                        permissions: bzUser.access(["auth.can_edit_roles"])
                    },
                    resolveFailed: config.errorResolver()
                });



            //Смена своего пароля
            $routeSegmentProvider
                .when('/profile/change-pass/', 'profileView.changeSelfPass')
                .within('profileView')
                .segment('changeSelfPass', {
                    controller: 'ChangePasswordCtrl',
                    templateUrl: '/themes/default/views/modules/user/page-change-password.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])
                    },
                    resolveFailed: config.errorResolver()
                });


            // Редактирование своего профиля
            $routeSegmentProvider
                .when('/profile/edit', 'profileView.profileEdit')
                .within('profileView')
                .segment('profileEdit', {
                    templateUrl: '/themes/default/views/user/page-profile-edit.html',
                    controller: 'ProfileEditCtrl',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])
                    },
                    resolveFailed: config.errorResolver()
                });

            // Список пользователей
            $routeSegmentProvider
                .when('/users', 'usersList')
                .segment('usersList', {
                    controller: 'Users.ListCtrl',
                    templateUrl: '/themes/default/views/modules/user/page-list.html',
                    resolve: {
                        permissions: bzUser.access(["auth.can_edit_users"])
                    },
                    resolveFailed: config.errorResolver()
                });


            // Профиль пользователя
            $routeSegmentProvider
                .when('/users/view/:id', 'usersView')
                .segment('usersView', {
                    controller: 'Users.ViewCtrl',
                    templateUrl: '/themes/default/views/modules/user/page-view.html',
                    resolve: {
                        permissions: bzUser.access(["auth.can_edit_users"])
                    },
                    resolveFailed: config.errorResolver()
                });

            // Редактирование пользователя
            $routeSegmentProvider
                .when('/users/edit/:id', 'usersView.userEdit')
                .within('usersView')
                .segment('userEdit', {
                    controller: 'Users.EditCtrl',
                    templateUrl: '/themes/default/views/modules/user/page-edit.html',
                    resolve: {
                        permissions: bzUser.access(["auth.can_edit_users"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Роли
            $routeSegmentProvider
                .when('/roles', 'roles')
                .segment('roles', {
                    controller: 'RolesCtrl',
                    templateUrl: '/themes/default/views/modules/user/page-roles-list.html',
                    resolve: {
                        permissions: bzUser.access(["auth.can_manage_roles"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Редактирование роли
            $routeSegmentProvider
                .when('/roles/edit/:id', 'roleEdit')
                .segment('roleEdit', {
                    controller: 'EditRoleCtrl',
                    templateUrl: '/themes/default/views/modules/user/page-role-edit.html',
                    resolve: {
                        permissions: bzUser.access(["auth.can_manage_roles"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Добаление роли
            $routeSegmentProvider
                .when('/roles/add', 'roleAdd')
                .segment('roleAdd', {
                    controller: 'AddRoleCtrl',
                    templateUrl: '/themes/default/views/modules/user/page-role-add.html',
                    resolve: {
                        permissions: bzUser.access(["auth.can_manage_roles"])
                    },
                    resolveFailed: config.errorResolver()
                });

            //Назначение ролей для пользователя
            $routeSegmentProvider
                .when('/users/change-roles/:id', 'usersView.changeRoles')
                .within('usersView')
                .segment('changeRoles', {
                    controller: 'UserRolesCtrl',
                    templateUrl: '/themes/default/views/modules/user/page-change-roles.html',
                    resolve: {
                        permissions: bzUser.access(["auth.can_edit_roles"])
                    },
                    resolveFailed: config.errorResolver()
                });

            $routeSegmentProvider
                .when('/administration', 'administration')
                .segment('administration', {
                    controller: 'Users.AdministrationsCtrl',
                    templateUrl: '/themes/default/views/modules/user/page-administrations.html',
                    resolve: {
                        permissions: bzUser.access(["auth.user_logged"])
                    },
                    resolveFailed: config.errorResolver()
                });

            $routeSegmentProvider
                .when('/users/change-pass/:id', 'usersView.userChangePass')
                .within('usersView')
                .segment('userChangePass', {
                    controller: 'ChangePasswordCtrl',
                    templateUrl: '/themes/default/views/modules/user/page-change-password.html',
                    resolve: {
                        permissions: bzUser.access(["auth.can_edit_roles"])
                    },
                    resolveFailed: config.errorResolver()
                });



        }]);

});