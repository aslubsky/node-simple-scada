define(['app'], function (app) {

    app.controller('Tasks.ListCtrl', ['$scope', '$location', '$q', 'ngTableParams', 'tasksFactory', '$filter',
        function ($scope, $location, $q, ngTableParams, tasksFactory, $filter) {

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
                    tasksFactory.get(params.url(), function (res) {
                        $scope.loading = false;
                        $defer.resolve($scope.tasks = res.data);
                        $scope.tableParams.total(res.pager.total);
                        $scope.tableParams.page(res.pager.current);
                    });
                }

            });


            $scope.remove = function (task) {
                var obj = new tasksFactory(task);
                $scope.loading = true;
                obj.$delete({id: task.id}, function (res) {
                    angular.forEach($scope.tasks, function (i, n) {
                        if (i == task) {
                            $scope.tasks.splice(n, 1);
                        }
                    });
                    $scope.loading = false;
                });
                return false;
            }


            $scope.checkboxes = { 'checkedAll': false, 'checkedAny': false, items: {} };

            $scope.$watch('checkboxes.checkedAll', function (value) {
                angular.forEach($scope.tasks, function (item) {
                    if (angular.isDefined(item.id)) {
                        $scope.checkboxes.items[item.id] = value;
                    }
                });
            });

            $scope.$watch('checkboxes.items', function (values) {
                if (!$scope.tasks) {
                    return;
                }
                var checked = 0, unchecked = 0,
                    total = $scope.tasks.length;
                angular.forEach($scope.tasks, function (item) {
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
                del = new tasksFactory({ids: $scope.ids});
                del.$deleteMulti(function () {
                    $scope.ids = [];
                    $scope.tableParams.reload();
                })
            }

            $scope.filterTypes = function ($column) {
                var def = $q.defer(),
                    names = [
                        {
                            'id': 'test',
                            'title': 'Тест'
                        },
                        {
                            'id': 'resource',
                            'title': 'Ресурс'
                        },
                        {
                            'id': 'course',
                            'title': 'Курс'
                        }
                    ];
                def.resolve(names);
                return def;
            };

        }]);

});