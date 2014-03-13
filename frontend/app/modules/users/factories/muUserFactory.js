define([
    'app'
], function (app) {

    app.factory('muUserFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var UserResource = $resource(bzConfig.resource('/auth/users/:id'), { 'id': '@id' }, {
                'checkEmail': { method: 'GET', params: { 'action': 'checkEmail' } },
                'delete': { method: 'DELETE' },
                'changePassword': { method: 'PUT', params: { 'action': 'changePassword' } },
                'activate': { method: 'PUT', params: { 'action': 'activate', 'key': '@key' } },
                'enable': { method: 'PUT', params: { 'action': 'enable' } },
                'disable': { method: 'PUT', params: { 'action': 'disable' } },
                'register': { method: 'POST' },
                'create': { method: 'POST', params: {'action': 'create'} },
                'saveUserRoles': { method: 'PUT', params: { 'action': 'save-roles' } },
                'recovery': { method: 'PUT', params: { 'action': 'recovery' } },
                'recoveryPassword': { method: 'PUT', params: { 'action': 'recoveryPassword' } },
                'deleteMulti': { method: 'POST', params: { 'action': 'deleteMulti' } },
                'enableMulti': { method: 'POST', params: {'action': 'enableMulti'}},
                'disableMulti': { method: 'POST', params: {'action': 'disableMulti'}}
            });
            return UserResource;
        }]);

});