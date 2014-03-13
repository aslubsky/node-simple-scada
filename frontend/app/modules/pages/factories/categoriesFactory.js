define([
    'app'
], function(app) {

    app.factory('categoriesFactory', ['ngNestedResource', 'bzConfig',
        function (ngNestedResource, bzConfig) {
            var CategoriesResource = ngNestedResource(bzConfig.resource('/pages-categories/:category_id'), {'category_id': '@id'}, {
                '$delete': { method: 'DELETE'}
            });
            return CategoriesResource;
        }]);

});
