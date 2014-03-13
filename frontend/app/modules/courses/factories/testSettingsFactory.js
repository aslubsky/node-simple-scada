define([
    'app'
], function (app) {

    app.factory('testSettingsFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var TestSettingsFactory = $resource(bzConfig.resource('/courses/:courseId/test/:testId'), {'courseId': '@courseId', 'testId': '@testId'}, {
                'create': { method: 'POST'},
                '$delete': { method: 'DELETE'}
            });
            return TestSettingsFactory;
        }]);

});