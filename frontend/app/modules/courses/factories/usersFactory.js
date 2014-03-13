define([
    'app'
], function (app) {

    app.factory('usersFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var UsersFactory = $resource(bzConfig.resource('/courses/:courseId/users/:id'), {'courseId': '@courseId'}, {
                'create': { method: 'POST'},
                '$delete': { method: 'DELETE'}
            });
            return UsersFactory;
        }]);

});