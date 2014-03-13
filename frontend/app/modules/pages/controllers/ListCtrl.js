define(['app'], function (app) {
    app.controller('Pages.ListCtrl',
        ['$rootScope', '$scope', '$routeSegment', 'pagesFactory', 'ngTableParams', '$filter', '$q', '$location',
            function ($rootScope, $scope, $routeSegment, pagesFactory, ngTableParams, $filter, $q, $location) {

                $rootScope.categoryId = null; // чистить id категорії (використовується у CreateCtrl)
                $scope.$routeSegment = $routeSegment;

                var prms = angular.extend({
                    page: 1,            // show first page
                    count: 10,          // count per page
                    sorting: {
                        created_at: 'desc'
                    },
                    filter: {}

                }, $location.search());
                $scope.tableParams = new ngTableParams(prms, {
                    total: 0,           // length of data
                    getData: function ($defer, params) {
                        params.$params.admin = true;
                        $location.search(params.url()); // put params in url
                        $scope.loading = true;
                        pagesFactory.get(params.url(), function (res) {
                            $scope.loading = false;
                            $scope.title = res.title;
                            $defer.resolve($scope.data = res.data);
                            $scope.tableParams.total(res.pager.total);
                            $scope.tableParams.page(res.pager.current);
                        });
                    }

                });
                $scope.filterTypes = function ($column) {
                    var def = $q.defer(),
                        names = [
                            {
                                'id': 'page',
                                'title': 'Страница'
                            },
                            {
                                'id': 'file',
                                'title': 'Файл'
                            },
                            {
                                'id': 'url',
                                'title': 'Ссылка'
                            },
                            {
                                'id': 'html',
                                'title': 'HTML-сайт'
                            }
                        ];
                    def.resolve(names);
                    return def;
                };

                $scope.isPublished = function ($column) {
                    var def = $q.defer(),
                        data = [
                            {
                                'id': 'published',
                                'title': 'опубликованный'
                            },
                            {
                                'id': 'notPublished',
                                'title': 'не опубликованный'
                            }
                        ];
                    def.resolve(data);
                    return def;
                }

                $scope.checkboxes = { 'checkedAll': false, 'checkedAny': false, items: {} };

                $scope.$watch('checkboxes.checkedAll', function (value) {
                    angular.forEach($scope.data, function (item) {
                        if (angular.isDefined(item.id)) {
                            $scope.checkboxes.items[item.id] = value;
                        }
                    });
                });

                $scope.$watch('checkboxes.items', function (values) {
                    if (!$scope.data) {
                        return;
                    }
                    var checked = 0, unchecked = 0,
                        total = $scope.data.length;
                    angular.forEach($scope.data, function (item) {
                        checked += ($scope.checkboxes.items[item.id]) || 0;
                        unchecked += (!$scope.checkboxes.items[item.id]) || 0;
                    });
                    if ((unchecked == 0) || (checked == 0)) {
                        $scope.checkboxes.checkedAll = (checked == total);
                    }
                    $scope.checkboxes.checkedAny = (checked > 0);
                    // grayed checkbox
                    angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
                }, true);

                $scope.deleteChecked = function (res) {
                    $scope.ids = [];
                    angular.forEach(res, function (i, n) {
                        if (i == true) {
                            $scope.ids.push(n);
                        }

                    });
                    if ($scope.ids.length == 0) {
                        return;
                    }
                    del = new pagesFactory({ids: $scope.ids});
                    del.$deleteMulti(function () {
                        $scope.ids = [];
                        $scope.tableParams.reload();
                    })
                }


                $scope.filterByCategory = function (category) {
                    $scope.category_id = (category) ? category.id : null;
                    $scope.tableParams.parameters({'category_id': $scope.category_id});
                };

                $scope.togglePublished = function (item) {
                    $scope.loading = true;
                    var updatedObj = new pagesFactory(item);
                    updatedObj.$save(function () {
                        $scope.loading = false;
                    });
                };

                $scope.remove = function (item) {
                    $scope.loading = true;
                    var page = new pagesFactory(item);
                    page.$delete(function () {
                        $scope.tableParams.reload();
                        $scope.loading = false;
                    });
                };
            }]);
});