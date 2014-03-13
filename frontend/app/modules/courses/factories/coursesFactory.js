define([
    'app'
], function(app) {

    app.factory('coursesFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var CoursesResource = $resource(bzConfig.resource('/courses/:id'), {'id': '@id'}, {
                'getReport': { method: 'GET', params: {'action': 'get-report'} },
                'getTests': { method: 'GET', params: {'action': 'get-tests'} },
                'getTestReport': { method: 'GET', params: {'action': 'get-test-report'} },
                'getAssignUsers': { method: 'GET', params: {'action': 'getAssignUsers'} },
                'save': { method: 'PUT' },
                'create': { method: 'POST'},
                '$delete': { method: 'DELETE'},
                'deleteMulti': { method: 'POST', params: { 'action': 'deleteMulti' } }
            });
            return CoursesResource;
        }]);

});