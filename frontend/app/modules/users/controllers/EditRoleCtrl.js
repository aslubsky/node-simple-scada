define(['app'], function (app) {

    app.controller('EditRoleCtrl', ['$scope', '$location', '$q', 'ngTableParams', 'muUserFactory', 'muRoleFactory', '$routeParams',
        function ($scope, $location, $q, ngTableParams, muUserFactory, muRoleFactory, $routeParams) {

            $scope.loading = true;
            muRoleFactory.get({id: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.role = res;
            });

            $scope.perm_loading = true;
            muRoleFactory.getPermissions(function (data) {
                $scope.perm_loading = false;
                $scope.permissions = data.data
            });

            $scope.saveRole = function (data) {
                role = new muRoleFactory(data);
                $scope.loading = true;
                role.$save(function (res) {
                    $scope.loading = false;
                    $location.path('/roles');
                }, function (res) {
                    $scope.loading = false;
                    if (res.status == 400) {
                        $scope.errors = res.data;
                    }
                    if (res.status == 500) {
                        $scope.notify(res.status, 'danger');
                    }
                });
            }

            $scope.cancel = function () {
                $location.path('/roles');
            }
        }]);

});