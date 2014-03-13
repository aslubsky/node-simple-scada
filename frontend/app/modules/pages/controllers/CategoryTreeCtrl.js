define(['app'], function (app) {

    app.controller('Pages.CategoryTreeCtrl',
        [ '$rootScope', '$scope', '$routeParams', 'categoriesFactory',
            function ($rootScope, $scope, $routeParams, categoriesFactory) {
                // get categories
                categoriesFactory.getTree(function (res) {
                    var parents = [];
                    $scope.category = res;

//                    select active category
                    $scope.activeCategory = categoriesFactory.find(res, function (item) {

                        return item.id == $routeParams.category_id;

                    }, parents);

                    // open all nodes to active category
                    if ($scope.activeCategory) {
                        angular.forEach(parents, function (node) {
                            node.$expanded = true;
                        });
                    }

                    $scope.$watch('category_id', function (res) {
                        if (res) {
                            $rootScope.categoryId = res;
                        }
                    });
                });
            }]);

});