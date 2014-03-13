define(['app'], function (app) {

    app.controller('AddRoleCtrl', ['$scope', '$location', '$q', 'ngTableParams', 'muUserFactory', 'muRoleFactory',
        function ($scope, $location, $q, ngTableParams, muUserFactory, muRoleFactory) {

            $scope.loading = true;
            muRoleFactory.getPermissions(function (data) {
                $scope.loading = false;
                $scope.permissions = data.data
            });

            $scope.role = {};
            $scope.role.permissions = [];

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