define([
    'app'
], function (app) {

    app.factory('planFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var PlanFactory = $resource(bzConfig.resource('/courses/:courseId/plan/:id'), {'courseId': '@courseId'}, {
                'getAllResources': { method: 'GET', params: { 'action': 'AllResources' } },
                'getElementsResource': { method: 'GET', params: { 'action': 'getElementsResource' } },
                'changeStartElement': { method: 'PUT', params: { 'action': 'changeStartElement' } },
                'create': { method: 'POST'},
                'resort': { method: 'PUT', params: {action: 'resort'}},
                '$delete': { method: 'DELETE'}
            });
            return PlanFactory;
        }]);

});