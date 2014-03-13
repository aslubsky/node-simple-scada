define(['app'], function (app) {

    app.controller('Tasks.AssignUsersCtrl', ['$scope', '$location', '$q', 'ngTableParams', 'tasksFactory', '$filter', '$routeParams',
        function ($scope, $location, $q, ngTableParams, tasksFactory, $filter, $routeParams) {

            tasksFactory.get({id: $routeParams.id, is_edit: true}, function (res) {
                $scope.loading = false;
                $scope.taskTitle = res.title;
            });

            var prms = angular.extend({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    email: 'desc'
                },
                filter: {}

            }, $location.search());

            $scope.tableParams = new ngTableParams(prms, {
                total: 0,           // length of data
                getData: function ($defer, params) {
                    $location.search(params.url()); // put params in url
                    $scope.loading = true;
                    params.$params.id = $routeParams.id;
                    tasksFactory.getUsers(params.url(), function (res) {
                        $scope.loading = false;
                        $defer.resolve($scope.users = res.data);
                        $scope.tableParams.total(res.pager.total);
                        $scope.tableParams.page(res.pager.current);

                    });
                }

            });
            $scope.checkboxes = { 'checkedAll': false, 'checkedAny': false, items: {} };

            $scope.$watch('checkboxes.checkedAll', function (value) {
                angular.forEach($scope.users, function (item) {
                    if (angular.isDefined(item.id)) {
                        $scope.checkboxes.items[item.id] = value;
                    }
                });
            });

            $scope.$watch('checkboxes.items', function (values) {

                if (!$scope.users) {
                    return;
                }
                var checked = 0, unchecked = 0,
                    total = $scope.users.length;
                angular.forEach($scope.users, function (item) {
                    checked += ($scope.checkboxes.items[item.id]) || 0;
                    unchecked += (!$scope.checkboxes.items[item.id]) || 0;

                });
                if ((unchecked == 0) || (checked == 0)) {
                    $scope.checkboxes.checkedAll = (checked == total);
                }
                $scope.checkboxes.checkedAny = (checked > 0);

                angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
            }, true);


            $scope.assign = function (res) {
                if (res.checked) {
                    res.checked = null;
                } else {
                    res.checked = true
                }
                task = new tasksFactory(res);
                $scope.loading = true;
                task.$assign({id: $routeParams.id}, function (res) {
                    $scope.loading = false;
                }, function (res) {
                    $scope.loading = false;
                    if (res.status == 400) {
                        $scope.errors = res.data;
                    }
                });
            }

            $scope.assignChecked = function (res) {

                var ids = [];
                angular.forEach(res, function (i, k) {
                    if (i == true) {
                        ids.push(k);
                    }
                });
                if (ids.length == 0) {
                    return;
                }
                assign = new tasksFactory({ids: ids, type: 'assign'});
                assign.$assignMulti({id: $routeParams.id}, function () {
                    $scope.ids = [];
                    $scope.tableParams.reload();
                })
            }

            $scope.unassignChecked = function (res) {
                var ids = [];
                angular.forEach(res, function (i, k) {
                    if (i == true) {
                        ids.push(k);
                    }
                });
                if (ids.length == 0) {
                    return;
                }
                unassign = new tasksFactory({ids: ids, type: 'unassign'});
                unassign.$assignMulti({id: $routeParams.id}, function () {
                    $scope.ids = [];
                    $scope.tableParams.reload();
                })
            }


        }
    ])
    ;

});