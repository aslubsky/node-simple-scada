define([
    'app'
], function(app) {

    app.factory('answersFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var QuestionsResource = $resource(bzConfig.resource('/tests/:question_id/answers/:id'), {'question_id': '@question_id', 'id': '@id'}, {
                'save': { method: 'PUT' },
                'create': { method: 'POST' },
                'setIsRight': { method: 'POST', params: {'action': 'set-is-right'} },
                'delete': { method: 'DELETE'}
            });
            return QuestionsResource;
        }]);

});