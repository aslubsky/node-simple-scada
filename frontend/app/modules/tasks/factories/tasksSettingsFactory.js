define([
    'app'
], function(app) {

    app.factory('tasksSettingsFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var tasksParamsFactory = $resource(bzConfig.resource('/task-settings/:id'), {'id': '@id'}, {
                'save': { method: 'PUT' },
                'getTests': { method: 'GET', params: {'action': 'getTests'}},
                'getCourses': { method: 'GET', params: {'action': 'getCourses'}},
                'getResources': { method: 'GET', params: {'action': 'getResources'}}
            });
            return tasksParamsFactory;
        }]);

});