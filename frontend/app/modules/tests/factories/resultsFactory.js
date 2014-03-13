define([
    'app'
], function (app) {

    app.factory('resultsFactory', ['$resource', 'bzConfig', '$sce',
        function ($resource, bzConfig, $sce) {
            var ResultsResource = $resource(bzConfig.resource('/tests/:taskId/results'), {'taskId': '@taskId'}, {
                'save': { method: 'PUT' },
                'finish': { method: 'PUT', params: {action: 'finish'} },
                'updateTime': { method: 'PUT', params: {action: 'updateTime'} },
                'create': { method: 'POST'},
                'getQuestion': { method: 'GET', params: {action: 'random-question'}},
                'getTest': { method: 'GET', params: {'action': 'get-by-task'}}
            });
            ResultsResource.prototype.getBody = function() {
                return $sce.trustAsHtml(this.body);
            }
            return ResultsResource;
        }]);

});