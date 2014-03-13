define([
    'app'
], function(app) {

    app.factory('tasksFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var TasksResource = $resource(bzConfig.resource('/tasks/:id'), {'id': '@id'}, {
                'save': { method: 'PUT' },
                'markAsComplete': { method: 'PUT', params: {'action': 'mark-as-complete'} },
                'create': { method: 'POST'},
                'delete': { method: 'DELETE'},
                'getMy': { method: 'GET', params: {'action': 'my'}},
                'getUsers': { method: 'GET', params: {'action': 'getUsers'}},
                'assign': { method: 'POST', params: {'action': 'assign'}},
                'assignMulti': { method: 'POST', params: {'action': 'assignMulti'}},
                'deleteMulti': { method: 'POST', params: { 'action': 'deleteMulti' } }
            });
            return TasksResource;
        }]);

});