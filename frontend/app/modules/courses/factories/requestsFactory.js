define([
    'app'
], function(app) {

    app.factory('requestsFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var CoursesResource = $resource(bzConfig.resource('/courses-requests'), {'id': '@id'}, {
                'getAvailableCourses': { method: 'GET', params: {'action': 'available-courses'} },
                'save': { method: 'PUT' },
                'create': { method: 'POST'},
                '$delete': { method: 'DELETE'}
            });
            return CoursesResource;
        }]);

});