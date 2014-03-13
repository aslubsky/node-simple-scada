define([
    'app'
], function(app) {

    app.factory('questionsFactory', ['$resource', 'bzConfig', '$sce',
        function ($resource, bzConfig, $sce) {
            var QuestionsResource = $resource(bzConfig.resource('/tests/:testId/questions/:id'), {'testId': '@testId', 'id': '@id'}, {
                'save': { method: 'PUT' },
                'create': { method: 'POST' },
                'delete': { method: 'DELETE'},
                'deleteMulti': { method: 'POST', params: { 'action': 'deleteMulti' } },
                'checkAnswer': { method: 'PUT', params: { 'action': 'checkAnswer' } }
            });
            return QuestionsResource;
        }]);

});