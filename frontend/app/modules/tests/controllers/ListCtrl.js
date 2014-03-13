define(['app'], function(app) {

    app.controller('Tests.ListCtrl', ['$scope', '$location', '$q', 'ngTableParams', 'testsFactory', '$filter',
        function($scope, $location, $q, ngTableParams, testsFactory, $filter) {

            var prms = angular.extend({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    date: 'desc',
                    id: 'desc'
                },
                filter: {}

            }, $location.search());

            $scope.tableParams = new ngTableParams(prms, {
                total: 0,           // length of data
                getData: function ($defer, params) {

                    $location.search(params.url()); // put params in url
                    $scope.loading = true;
                    testsFactory.get(params.url(), function (res) {
                        $scope.loading = false;
                        $defer.resolve($scope.tests = res.data);
                        $scope.tableParams.total(res.pager.total);
                        $scope.tableParams.page(res.pager.current);
                    });
                }

            });

            $scope.remove = function(test) {
                var obj = new testsFactory(test);
                $scope.loading = true;
                obj.$delete({id: test.id}, function(res) {
                    angular.forEach($scope.tests, function(i, n){
                        if (i == test) {
                            $scope.tests.splice(n, 1);
                        }
                    });
                    $scope.loading = false;
                });
                return false;
            }

            $scope.checkboxes = { 'checkedAll': false, 'checkedAny': false, items: {} };

            $scope.$watch('checkboxes.checkedAll', function (value) {
                angular.forEach($scope.tests, function (item) {
                    if (angular.isDefined(item.id)) {
                        $scope.checkboxes.items[item.id] = value;
                    }
                });
            });

            $scope.$watch('checkboxes.items', function (values) {
                if (!$scope.tests) {
                    return;
                }
                var checked = 0, unchecked = 0,
                    total = $scope.tests.length;
                angular.forEach($scope.tests, function (item) {
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
                if($scope.ids.length == 0) {
                    return;
                }
                del = new testsFactory({ids: $scope.ids});
                del.$deleteMulti(function () {
                    $scope.ids = [];
                    $scope.tableParams.reload();
                })
            }

        }]);

});