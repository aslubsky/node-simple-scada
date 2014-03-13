define(['app'], function(app) {
    app.controller('Pages.CategoriesCtrl',
        ['$scope', '$rootScope', '$filter', '$routeSegment', 'categoriesFactory',
            function ($scope, $rootScope, $filter, $routeSegment, categoriesFactory) {

                categoriesFactory.getTree(function (res) {
                    var parents = [];
                    // get categories
                    $scope.category = res;

                   // select active category
                    $scope.activeCategory = categoriesFactory.find(res, function (item) {
                        return item.id == $routeSegment.$routeParams.category_id;
                    }, parents);

                    // open all nodes to active category
                    if ($scope.activeCategory) {
                        angular.forEach(parents, function (node) {
                            node.$expanded = true;
                        });
                    }
                });

                $scope.addCategory = function (child) {
                    child.$insertItem(function (item) {
                        item.focus = true;
                        item.$settings = true;
                    });
                };

                $scope.move = function (item, before, index) {
                    item.$moveItem(before, index);
                };

                $scope.saveCategory = function (item) {
                    var category = new categoriesFactory(item);
                    item.$loading = true;
                    category.$save(function (data) {
                        item.$loading = false;
                        item.url = data.url;
                        item.$settings = false;
                    });
                };

                $scope.remove = function (child) {
                    function walk(target) {
                        var children = target.children,
                            i;
                        if (children) {
                            i = children.length;
                            while (i--) {
                                if (children[i].id == child.id) {
                                    return children.splice(i, 1);
                                } else {
                                    walk(children[i]);
                                }
                            }
                        }
                    }

                    $scope.loading = true;
                    categoriesFactory.$delete({ 'category_id': child.id }, function () {
                        $scope.loading = false;
                        walk($scope.category);
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    });
                };
            }]);

});