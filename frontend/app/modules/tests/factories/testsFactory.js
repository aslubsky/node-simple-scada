define([
    'app'
], function(app) {

    app.factory('testsFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var TestsResource = $resource(bzConfig.resource('/tests/:id'), {'id': '@id'}, {
                'save': { method: 'PUT' },
                'create': { method: 'POST'},
                'delete': { method: 'DELETE'},
                'deleteMulti': { method: 'POST', params: { 'action': 'deleteMulti' } }
            });
            return TestsResource;
        }]);

});