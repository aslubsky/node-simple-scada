define([
    'app'
], function (app) {

    app.factory('tagsFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var TagsFactory = $resource(bzConfig.resource('/tags'), {});
            return TagsFactory;
        }]);

});
