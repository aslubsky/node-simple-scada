define(['app'], function (app) {
    app.controller('Pages.CreateCtrl', ['$rootScope', '$scope', 'ngTableParams', 'pagesFactory', 'categoriesFactory', 'bzConfig', 'elementsFactory', '$location', '$routeParams',
        function ($rootScope, $scope, ngTableParams, PagesResource, CategoryResource, bzConfig, elementsFactory, $location, $routeParams) {

            $scope.pageId = '';

            $scope.page = {};
            $scope.page.category_id = null;

            if ($rootScope.categoryId && $rootScope.categoryId != 0) {
                $scope.page.category_id = $rootScope.categoryId;
            }

            if ($routeParams.type) {
                if ($routeParams.type === 'All') {
                    $scope.page.type = '';
                } else {
                    $scope.page.type = $routeParams.type;
                }

            } else {
                $scope.page.type = 'page';
            }


            $scope.deleteFile = function (file) {
                angular.forEach($scope.page.images, function (item, i) {
                    if (item.url == file.url) {
                        $scope.page.images.splice(i, 1);
                    }
                });
            };

            $scope.save = function (page, reload) {
                page.id = $scope.pageId;
                page.is_published = true;
                resource = new PagesResource(page);
                resource.$save(function (res) {
                    if (res.id) {
                        $scope.pageId = res.id;
                    }
                    $rootScope.categoryId = null;
                    switch (reload) {
                        case 'close':
                            if ($routeParams.courseId) {
                                $location.path('/courses/' + $routeParams.courseId + '/elements');
                            } else {
                                $location.path('/pages');
                            }
                            break;
                        case 'reload':
                            $scope.notify('Сохраненно', 'success');
                            $('.btn-primary.dropdown-toggle').click();
                            break;
                        case 'needPreview':
                            $location.path('/pages/' + res.id + '/view');
                            break;
                    }
                });

                if ($routeParams.courseId) {
                    $scope.$watch('pageId', function (res) {
                        page.id = res;
                        $scope.addToCourseElements(page);
                    });
                }

            };


            CategoryResource.get(function (data) {
                var items = [];

                function walk(item, level) {
                    // 2 space per level
                    if (level > 0) { // without root item
                        item.prefix = new Array((level - 1) * 2 + 1).join(String.fromCharCode(160));
                        if (level > 1) { // only for childrens
                            item.prefix += '» ';
                        }
                        items.push(item);
                    }
                    for (var i = 0; i < item.children.length; i++) {
                        walk(item.children[i], level + 1);
                    }
                }

                walk(data, 0);
                $scope.categories = items;
            });

            $scope.cancel = function () {
                $rootScope.categoryId = null;
                if ($routeParams.courseId) {
                    $location.path('/courses/' + $routeParams.courseId + '/elements');
                } else {
                    $location.path('/pages');
                }
            }

            $scope.addToCourseElements = function (element) {
                elem = new elementsFactory(element);
                elem.$create({courseId: $routeParams.courseId}, function (res) {
                    $scope.loading = false;
                });
            }

        }]);
});