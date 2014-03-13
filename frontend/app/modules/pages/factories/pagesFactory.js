define([
    'app'
], function(app) {

    app.factory('pagesFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var PagesResource = $resource(bzConfig.resource('/pages/:id'), {'id': '@id'}, {
                'save': { method: 'PUT' },
                'create': { method: 'POST'},
                'delete': { method: 'DELETE'},
                'deleteMulti': { method: 'POST', params: { 'action': 'deleteMulti' } },
                'getStartFiles': { method: 'GET', params: { 'action': 'getStartFiles' } }
            });
            return PagesResource;
        }]);

});