define(['app'], function (app) {

    app.controller('Users.ListCtrl', ['$scope', '$location', '$q', 'ngTableParams', 'muUserFactory', 'muRoleFactory', '$filter',
        function ($scope, $location, $q, ngTableParams, muUserFactory, muRoleFactory, $filter) {
            var prms = angular.extend({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    date: 'desc',
                    id: 'desc'
                },
                filter: {}

            }, $location.search());

            $scope.filterRoles = function (column) {
                var def = $q.defer();
                muRoleFactory.query({}, function (data) {
                    def.resolve(data.data);
                });
                return def;
            };

            $scope.tableParams = new ngTableParams(prms, {
                total: 0,           // length of data
                getData: function ($defer, params) {
                    $location.search(params.url()); // put params in url
                    $scope.loading = true;
                    muUserFactory.get(params.url(), function (res) {
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
                del = new muUserFactory({ids: $scope.ids});
                del.$deleteMulti(function () {
                    $scope.ids = [];
                    $scope.tableParams.reload();
                })
            }


            $scope.enable = function (user) {
                var obj = new muUserFactory(user);
                $scope.loading = true;
                obj.$enable({id: user.id}, function (res) {
                    user.is_active = true;
                    $scope.loading = false;
//                notify('Пользователь удален');
                });
                return false;
            }

            $scope.disable = function (user) {
                var obj = new muUserFactory(user);
                $scope.loading = true;
                obj.block_message = 'test';
                obj.$disable({id: user.id}, function (res) {
                    user.is_active = false;
                    $scope.loading = false;
//                notify('Пользователь удален');
                });
                return false;
            }

            $scope.disableChecked = function(res){
                var ids = [];
                angular.forEach(res, function (i, k) {
                    if (i == true) {
                        ids.push(k);
                    }
                });
                if (ids.length == 0) {
                    return;
                }
                assign = new muUserFactory({ids: ids});
                assign.$disableMulti(function () {
                    $scope.ids = [];
                    $scope.tableParams.reload();
                })
            }

            $scope.enableChecked = function(res){
                var ids = [];
                angular.forEach(res, function (i, k) {
                    if (i == true) {
                        ids.push(k);
                    }
                });
                if (ids.length == 0) {
                    return;
                }
                assign = new muUserFactory({ids: ids});
                assign.$enableMulti(function () {
                    $scope.ids = [];
                    $scope.tableParams.reload();
                })
            }

            $scope.remove = function (user) {
                var obj = new muUserFactory(user);
                $scope.loading = true;
                obj.$delete({id: user.id}, function (res) {
                    angular.forEach($scope.users, function (i, n) {
                        if (i == user) {
                            $scope.users.splice(n, 1);
                        }
                    });
                    $scope.loading = false;
//                notify('Пользователь удален');
                });
                return false;
            }
        }]);

});