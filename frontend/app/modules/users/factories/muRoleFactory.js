define([
    'app'
], function(app) {

    app.factory('muRoleFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var RoleResource = $resource(bzConfig.resource('/auth/roles/:id'), {'id': '@id'}, {
                'query': { method: 'GET' },
                'getPermissions': { method: 'GET', params: { 'action': 'permissions' } },
                'save': { method: 'POST' }
            });
            return RoleResource;
        }]);

});