define([
    'app'
], function (app) {

    app.factory('elementsFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var ElementsFactory = $resource(bzConfig.resource('/courses/:courseId/elements/:elementId'), {'courseId': '@courseId', 'elementId': '@elementId'}, {
                'getAllResources': { method: 'GET', params: { 'action': 'AllResources' } },
                'create': { method: 'POST'},
                'resort': { method: 'PUT', params: {action: 'resort'}},
                '$delete': { method: 'DELETE'}
            });
            return ElementsFactory;
        }]);

});